import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { boot } from "./boot";

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
