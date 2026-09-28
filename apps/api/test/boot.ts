import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { configureApp } from "../src/app.setup";
import { APP_CONFIG, AppConfig, loadConfig } from "../src/config";

/** Boots the real AppModule through configureApp(), with optional config overrides. */
export async function boot(overrides: Partial<AppConfig> = {}): Promise<INestApplication> {
  const config = { ...loadConfig(), ...overrides };
  const moduleRef = await Test.createTestingModule({ imports: [AppModule] })
    .overrideProvider(APP_CONFIG)
    .useValue(config)
    .compile();
  const app = moduleRef.createNestApplication({ logger: false });
  configureApp(app, config);
  await app.init();
  return app;
}
