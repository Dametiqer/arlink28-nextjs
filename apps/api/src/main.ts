import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { configureApp } from "./app.setup";
import { APP_CONFIG, AppConfig, loadDotEnv } from "./config";

async function bootstrap() {
  loadDotEnv();
  // Buffer boot logs until configureApp swaps in the pino logger.
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: true });
  const config = app.get<AppConfig>(APP_CONFIG);
  configureApp(app, config);
  await app.listen(config.port);
  // eslint-disable-next-line no-console -- one plain line for Passenger's stdout log, whatever LOG_LEVEL is
  console.log(`[api] listening on :${config.port} (${config.nodeEnv})`);
}

bootstrap().catch((err: unknown) => {
  // eslint-disable-next-line no-console -- boot failed, possibly before the pino logger exists
  console.error("[api] failed to start", err);
  process.exitCode = 1;
});
