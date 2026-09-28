import type { INestApplication } from "@nestjs/common";
import type { Express, NextFunction, Request, Response } from "express";
import helmet from "helmet";
import { Logger } from "nestjs-pino";
import { ErrorFilter } from "./common/error.filter";
import { REQUEST_ID_HEADER, requestIdMiddleware } from "./common/request-id";
import type { AppConfig } from "./config";
import { isDocsPath, setupSwagger } from "./docs/swagger";

const strictHeaders = helmet();
// Swagger UI (@nestjs/swagger 8) loads only same-origin scripts, so script-src stays
// 'self'; it needs inline styles (helmet's default already allows them) and images
// from data:/https: (icons, spec-referenced logos). This looser CSP is scoped to
// /docs so the API itself keeps helmet's defaults.
const docsHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      "img-src": ["'self'", "data:", "https:"],
    },
  },
});

/** Shared by main.ts and the e2e tests so tests exercise the real HTTP pipeline. */
export function configureApp(app: INestApplication, config: AppConfig): void {
  // First, so every response (including 404s and /docs) carries X-Request-Id.
  app.use(requestIdMiddleware);
  // Behind Apache/Passenger the socket peer is the proxy; this makes req.ip the client.
  const express: Express = app.getHttpAdapter().getInstance();
  express.set("trust proxy", config.trustProxy);
  app.useLogger(app.get(Logger));
  app.setGlobalPrefix("v1");
  app.use((req: Request, res: Response, next: NextFunction) =>
    (isDocsPath(req.path) ? docsHeaders : strictHeaders)(req, res, next),
  );
  app.enableCors({ origin: config.corsOrigins, credentials: true, exposedHeaders: [REQUEST_ID_HEADER] });
  app.useGlobalFilters(new ErrorFilter());
  setupSwagger(app, config);
  app.enableShutdownHooks();
}
