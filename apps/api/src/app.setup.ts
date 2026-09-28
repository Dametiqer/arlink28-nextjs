import type { INestApplication } from "@nestjs/common";
import helmet from "helmet";
import { ErrorFilter } from "./common/error.filter";
import type { AppConfig } from "./config";

/** Shared by main.ts and the e2e tests so tests exercise the real HTTP pipeline. */
export function configureApp(app: INestApplication, config: AppConfig): void {
  app.setGlobalPrefix("v1");
  app.use(helmet());
  app.enableCors({ origin: config.corsOrigins, credentials: true });
  app.useGlobalFilters(new ErrorFilter());
  app.enableShutdownHooks();
}
