import { BadRequestException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Prisma } from "@arlink28/db";
import { ErrorEnvelope } from "@arlink28/shared";
import { z } from "zod";
import { AppError } from "./app-error";
import { toErrorResponse } from "./error.filter";

function prismaError(code: string) {
  return new Prisma.PrismaClientKnownRequestError("boom", { code, clientVersion: "test" });
}

describe("toErrorResponse", () => {
  it("renders AppError as-is", () => {
    const { status, body } = toErrorResponse(AppError.staleVersion());
    expect(status).toBe(409);
    expect(body.error.code).toBe("STALE_VERSION");
  });

  it("turns a ZodError into a 422 with per-field details", () => {
    const result = z.object({ nights: z.number().int().min(1) }).safeParse({ nights: 0 });
    const { status, body } = toErrorResponse(result.error);
    expect(status).toBe(422);
    expect(body.error.code).toBe("VALIDATION_FAILED");
    expect(body.error.details).toEqual([expect.objectContaining({ path: "nights" })]);
  });

  it("recognises a ZodError from another zod copy by shape, not instanceof", () => {
    const foreign = Object.assign(new Error("invalid"), {
      name: "ZodError",
      issues: [{ path: ["adults"], message: "Required" }],
    });
    const { status, body } = toErrorResponse(foreign);
    expect(status).toBe(422);
    expect(body.error.details).toEqual([{ path: "adults", message: "Required" }]);
  });

  it("maps Prisma unique and not-found errors", () => {
    expect(toErrorResponse(prismaError("P2002")).status).toBe(409);
    expect(toErrorResponse(prismaError("P2025")).status).toBe(404);
  });

  it("maps Nest HTTP exceptions by status", () => {
    expect(toErrorResponse(new NotFoundException()).body.error.code).toBe("NOT_FOUND");
    expect(toErrorResponse(new BadRequestException("bad json")).body.error.code).toBe("BAD_REQUEST");
  });

  it("never leaks internals on 5xx", () => {
    for (const e of [
      new Error("password=hunter2"),
      new InternalServerErrorException("stack trace here"),
      prismaError("P1001"),
    ]) {
      const { status, body } = toErrorResponse(e);
      expect(status).toBeGreaterThanOrEqual(500);
      expect(body.error).toEqual({ code: "INTERNAL", message: "Internal server error" });
    }
  });

  it("always produces a body that satisfies the shared contract", () => {
    for (const e of [AppError.notFound("Package"), new NotFoundException(), new Error("x")]) {
      expect(() => ErrorEnvelope.parse(toErrorResponse(e).body)).not.toThrow();
    }
  });
});
