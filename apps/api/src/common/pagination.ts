import type { ZodTypeAny, z } from "zod";
import { AppError } from "./app-error";

// Cursors are base64url(JSON) of the last row's sort key, e.g. [sortOrder, id].
// Clients treat them as opaque; only the API encodes and decodes them.

export function encodeCursor(key: unknown[]): string {
  return Buffer.from(JSON.stringify(key)).toString("base64url");
}

export function decodeCursor<T extends ZodTypeAny>(cursor: string, shape: T): z.infer<T> {
  try {
    return shape.parse(JSON.parse(Buffer.from(cursor, "base64url").toString("utf8"))) as z.infer<T>;
  } catch {
    throw AppError.validation("Invalid cursor", [{ path: "cursor", message: "Malformed cursor" }]);
  }
}
