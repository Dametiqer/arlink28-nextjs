import { z } from "zod";

// Every non-2xx API response has this body. Clients switch on `code`, never
// on `message` (which is for humans and may change).
export const ErrorCode = z.enum([
  "BAD_REQUEST",
  "VALIDATION_FAILED",
  "NOT_FOUND",
  "CONFLICT",
  "STALE_VERSION",
  "UNAUTHENTICATED",
  "FORBIDDEN",
  "RATE_LIMITED",
  "INTERNAL",
]);
export type ErrorCode = z.infer<typeof ErrorCode>;

export const ErrorDetail = z.object({
  path: z.string(),
  message: z.string(),
});
export type ErrorDetail = z.infer<typeof ErrorDetail>;

export const ErrorEnvelope = z.object({
  error: z.object({
    code: z.union([ErrorCode, z.string()]),
    message: z.string(),
    details: z.array(ErrorDetail).optional(),
  }),
});
export type ErrorEnvelope = z.infer<typeof ErrorEnvelope>;
