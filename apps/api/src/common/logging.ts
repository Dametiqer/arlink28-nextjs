import type { Params } from "nestjs-pino";
import type { AppConfig } from "../config";

/** nestjs-pino options: JSON logs (pretty only in development), request id from requestIdMiddleware. */
export function loggerParams(config: AppConfig): Params {
  return {
    pinoHttp: {
      level: config.logLevel,
      // requestIdMiddleware has already set req.id; the fallback only matters if it is ever bypassed.
      genReqId: (req) => req.id ?? "unknown",
      // Never write credentials or session cookies into log storage.
      redact: { paths: ["req.headers.authorization", "req.headers.cookie"], censor: "[redacted]" },
      transport:
        config.nodeEnv === "development"
          ? { target: "pino-pretty", options: { singleLine: true, translateTime: "SYS:HH:MM:ss.l" } }
          : undefined,
    },
  };
}
