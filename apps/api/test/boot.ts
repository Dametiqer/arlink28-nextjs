import { INestApplication, Type } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { configureApp } from "../src/app.setup";
import { APP_CONFIG, AppConfig, loadConfig } from "../src/config";

/**
 * Boots the real AppModule through configureApp(), with optional config
 * overrides and extra test-only controllers (global guards apply to them too).
 */
export async function boot(
  overrides: Partial<AppConfig> = {},
  controllers: Type<unknown>[] = [],
): Promise<INestApplication> {
  const config = { ...loadConfig(), ...overrides };
  const moduleRef = await Test.createTestingModule({ imports: [AppModule], controllers })
    .overrideProvider(APP_CONFIG)
    .useValue(config)
    .compile();
  const app = moduleRef.createNestApplication({ logger: false });
  configureApp(app, config);
  await app.init();
  return app;
}
