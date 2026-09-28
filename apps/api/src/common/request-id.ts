import { randomUUID } from "node:crypto";
import type { NextFunction, Request, Response } from "express";

export const REQUEST_ID_HEADER = "X-Request-Id";

// A caller-supplied id is echoed into logs and responses, so only accept short
// plain tokens — anything else could inject log lines or bloat headers.
const SAFE_ID = /^[A-Za-z0-9._-]{1,64}$/;

export function isSafeRequestId(value: unknown): value is string {
  return typeof value === "string" && SAFE_ID.test(value);
}

/**
 * Runs first on every request (registered via app.use, so it also covers
 * unmatched routes and /docs): reuses a safe incoming X-Request-Id or mints a
 * UUID, stores it on `req.id` (where pino-http and ErrorFilter read it) and
 * echoes it back so a customer's error report can be traced in the logs.
 */
export function requestIdMiddleware(req: Request, res: Response, next: NextFunction): void {
  const incoming = req.get(REQUEST_ID_HEADER);
  const id = isSafeRequestId(incoming) ? incoming : randomUUID();
  req.id = id;
  res.setHeader(REQUEST_ID_HEADER, id);
  next();
}
