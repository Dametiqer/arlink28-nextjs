import type { INestApplication } from "@nestjs/common";
import helmet from "helmet";
import { Logger } from "nestjs-pino";
import { ErrorFilter } from "./common/error.filter";
import { REQUEST_ID_HEADER, requestIdMiddleware } from "./common/request-id";
import type { AppConfig } from "./config";

/** Shared by main.ts and the e2e tests so tests exercise the real HTTP pipeline. */
export function configureApp(app: INestApplication, config: AppConfig): void {
  // First, so every response (including 404s and /docs) carries X-Request-Id.
  app.use(requestIdMiddleware);
  app.useLogger(app.get(Logger));
  app.setGlobalPrefix("v1");
  app.use(helmet());
  app.enableCors({ origin: config.corsOrigins, credentials: true, exposedHeaders: [REQUEST_ID_HEADER] });
  app.useGlobalFilters(new ErrorFilter());
  app.enableShutdownHooks();
}
