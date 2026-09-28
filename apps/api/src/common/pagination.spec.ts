import { z } from "zod";
import { AppError } from "./app-error";
import { decodeCursor, encodeCursor } from "./pagination";

const Key = z.tuple([z.number().int(), z.string()]);

describe("cursor pagination", () => {
  it("round-trips a sort key", () => {
    const cursor = encodeCursor([10, "0192a0b2-0000-7000-8000-000000000000"]);
    expect(decodeCursor(cursor, Key)).toEqual([10, "0192a0b2-0000-7000-8000-000000000000"]);
  });

  it.each(["not-base64-json", encodeCursor(["wrong", "shape"]), ""])(
    "rejects a malformed cursor (%s) as a 422",
    (cursor) => {
      try {
        decodeCursor(cursor, Key);
        throw new Error("expected decodeCursor to throw");
      } catch (e) {
        expect(e).toBeInstanceOf(AppError);
        expect((e as AppError).code).toBe("VALIDATION_FAILED");
      }
    },
  );
});
