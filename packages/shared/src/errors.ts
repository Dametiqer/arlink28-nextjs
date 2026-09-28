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
  // Quote failures (catalogue/pricing.ts QUOTE_ERROR_CODES), all 422.
  "CHECK_IN_IN_PAST",
  "BELOW_MIN_NIGHTS",
  "EXTRA_NIGHTS_NOT_SOLD",
  "NO_RATE_FOR_DATE",
  "CURRENCY_NOT_AVAILABLE",
  "UNKNOWN_ADD_ON",
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
    // Same value as the X-Request-Id response header; quote it in support tickets.
    requestId: z.string().optional(),
  }),
});
export type ErrorEnvelope = z.infer<typeof ErrorEnvelope>;
