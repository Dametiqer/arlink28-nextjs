import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from "@nestjs/common";
import { Prisma } from "@arlink28/db";
import type { ErrorCode, ErrorDetail, ErrorEnvelope } from "@arlink28/shared";
import type { Response } from "express";
import { ZodError } from "zod";
import { AppError } from "./app-error";

const CODE_BY_STATUS: Record<number, ErrorCode> = {
  400: "BAD_REQUEST",
  401: "UNAUTHENTICATED",
  403: "FORBIDDEN",
  404: "NOT_FOUND",
  409: "CONFLICT",
  422: "VALIDATION_FAILED",
  429: "RATE_LIMITED",
};

export function toErrorResponse(exception: unknown): { status: number; body: ErrorEnvelope } {
  if (exception instanceof AppError) {
    return envelope(exception.status, exception.code, exception.message, exception.details);
  }
  if (isZodError(exception)) {
    const details = exception.issues.map((i) => ({ path: i.path.join("."), message: i.message }));
    return envelope(422, "VALIDATION_FAILED", "Request validation failed", details);
  }
  if (exception instanceof Prisma.PrismaClientKnownRequestError) {
    if (exception.code === "P2002") return envelope(409, "CONFLICT", "A record with these unique values already exists");
    if (exception.code === "P2025") return envelope(404, "NOT_FOUND", "Record not found");
  }
  if (exception instanceof HttpException) {
    const status = exception.getStatus();
    if (status >= 500) return envelope(status, "INTERNAL", "Internal server error");
    return envelope(status, CODE_BY_STATUS[status] ?? "BAD_REQUEST", exception.message);
  }
  return envelope(500, "INTERNAL", "Internal server error");
}

/**
 * `instanceof ZodError` alone silently fails if a second zod copy is ever
 * installed (e.g. shared and api resolving different versions), turning a 422
 * into a misleading 500 — so also accept anything ZodError-shaped.
 */
function isZodError(e: unknown): e is Pick<ZodError, "issues"> {
  if (e instanceof ZodError) return true;
  if (typeof e !== "object" || e === null) return false;
  const { name, issues } = e as { name?: unknown; issues?: unknown };
  return name === "ZodError" && Array.isArray(issues);
}

function envelope(status: number, code: ErrorCode, message: string, details?: ErrorDetail[]) {
  const error: ErrorEnvelope["error"] = details ? { code, message, details } : { code, message };
  return { status, body: { error } };
}

/** Renders every exception as the shared ErrorEnvelope; never leaks internals on 5xx. */
@Catch()
export class ErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger("ErrorFilter");

  catch(exception: unknown, host: ArgumentsHost): void {
    const { status, body } = toErrorResponse(exception);
    if (status >= 500) this.logger.error(exception instanceof Error ? exception.stack : String(exception));
    host.switchToHttp().getResponse<Response>().status(status).json(body);
  }
}
