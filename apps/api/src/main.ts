import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { configureApp } from "./app.setup";
import { APP_CONFIG, AppConfig, loadDotEnv } from "./config";

async function bootstrap() {
  loadDotEnv();
  const app = await NestFactory.create(AppModule);
  const config = app.get<AppConfig>(APP_CONFIG);
  configureApp(app, config);
  await app.listen(config.port);
  // eslint-disable-next-line no-console
  console.log(`[api] listening on :${config.port} (${config.nodeEnv})`);
}

bootstrap();
