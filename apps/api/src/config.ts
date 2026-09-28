import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { z } from "zod";

export const LOG_LEVELS = ["fatal", "error", "warn", "info", "debug", "trace", "silent"] as const;
export type LogLevel = (typeof LOG_LEVELS)[number];

const Env = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3001),
  DATABASE_URL: z.string().startsWith("mysql://", "DATABASE_URL must be a mysql:// URL"),
  CORS_ORIGINS: z
    .string()
    .default("http://localhost:3000,http://localhost:3002")
    .transform((s) => s.split(",").map((o) => o.trim()).filter(Boolean)),
  LOG_LEVEL: z.enum(LOG_LEVELS).default("info"),
  // Unset → Swagger on everywhere except production.
  SWAGGER_ENABLED: z.enum(["true", "false"]).optional(),
  RATE_LIMIT_TTL_MS: z.coerce.number().int().positive().default(60_000),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(120),
  // Express "trust proxy": false locally; production behind Apache/Passenger sets 1
  // so req.ip (the rate-limit key) is the real client, not the proxy.
  TRUST_PROXY: z
    .string()
    .default("false")
    .transform((s, ctx) => {
      const v = s.trim().toLowerCase();
      if (v === "true") return true;
      if (v === "false") return false;
      if (/^\d+$/.test(v)) return Number(v);
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'TRUST_PROXY must be "true", "false" or a hop count' });
      return z.NEVER;
    }),
});

export type AppConfig = {
  nodeEnv: "development" | "test" | "production";
  port: number;
  databaseUrl: string;
  corsOrigins: string[];
  logLevel: LogLevel;
  rateLimit: { ttlMs: number; max: number };
  trustProxy: boolean | number;
  swaggerEnabled: boolean;
};

export const APP_CONFIG = Symbol("APP_CONFIG");

/** Loads apps/api/.env if present (local dev only; production sets real env vars). */
export function loadDotEnv(): void {
  const file = resolve(__dirname, "..", ".env");
  if (existsSync(file)) process.loadEnvFile(file);
}

/** Validates the environment once at boot so a bad deploy fails fast, not on first request. */
export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  const parsed = Env.safeParse(env);
  if (!parsed.success) {
    const problems = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ");
    throw new Error(`Invalid environment: ${problems}`);
  }
  const e = parsed.data;
  return {
    nodeEnv: e.NODE_ENV,
    port: e.PORT,
    databaseUrl: e.DATABASE_URL,
    corsOrigins: e.CORS_ORIGINS,
    logLevel: e.LOG_LEVEL,
    rateLimit: { ttlMs: e.RATE_LIMIT_TTL_MS, max: e.RATE_LIMIT_MAX },
    trustProxy: e.TRUST_PROXY,
    swaggerEnabled: e.SWAGGER_ENABLED ? e.SWAGGER_ENABLED === "true" : e.NODE_ENV !== "production",
  };
}
