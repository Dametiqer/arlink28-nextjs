import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { AppModule } from "../src/app.module";
import { configureApp } from "../src/app.setup";
import { APP_CONFIG, AppConfig, loadConfig } from "../src/config";

async function boot(overrides: Partial<AppConfig> = {}): Promise<INestApplication> {
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

describe("GET /v1/health", () => {
  let app: INestApplication;
  afterEach(() => app?.close());

  it("is 200 with db ok when MySQL answers", async () => {
    app = await boot();
    const res = await request(app.getHttpServer()).get("/v1/health").expect(200);
    expect(res.body).toEqual({ status: "ok", db: "ok" });
  });

  it("is 503 degraded — not a crash — when MySQL is unreachable", async () => {
    app = await boot({ databaseUrl: "mysql://root@127.0.0.1:1/arlink28_test?connect_timeout=2" });
    const res = await request(app.getHttpServer()).get("/v1/health").expect(503);
    expect(res.body).toEqual({ status: "degraded", db: "down" });
  });

  it("renders unknown routes with the shared error envelope", async () => {
    app = await boot();
    const res = await request(app.getHttpServer()).get("/v1/does-not-exist").expect(404);
    expect(res.body.error.code).toBe("NOT_FOUND");
  });
});
