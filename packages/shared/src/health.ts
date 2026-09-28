import { z } from "zod";

// GET /v1/health body: 200 with status "ok", or 503 "degraded" when MySQL is down.
export const HealthResponse = z.object({
  status: z.enum(["ok", "degraded"]),
  db: z.enum(["ok", "down"]),
});
export type HealthResponse = z.infer<typeof HealthResponse>;
