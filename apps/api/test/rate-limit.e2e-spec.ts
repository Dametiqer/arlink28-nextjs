import { Controller, Get, INestApplication } from "@nestjs/common";
import request from "supertest";
import { boot } from "./boot";

// A throttled route to hit; health is exempt and M0 has no business routes yet.
@Controller("ping")
class PingController {
  @Get()
  ping() {
    return { pong: true };
  }
}

describe("rate limiting", () => {
  let app: INestApplication;
  afterEach(() => app?.close());

  it("returns 429 RATE_LIMITED with Retry-After once the limit is spent", async () => {
    app = await boot({ rateLimit: { ttlMs: 60_000, max: 3 } }, [PingController]);
    const server = app.getHttpServer();
    for (let i = 0; i < 3; i++) await request(server).get("/v1/ping").expect(200);

    const res = await request(server).get("/v1/ping").expect(429);
    expect(res.body.error.code).toBe("RATE_LIMITED");
    expect(Number(res.headers["retry-after"])).toBeGreaterThan(0);
    expect(res.body.error.requestId).toBe(res.headers["x-request-id"]);
  });

  it("never throttles health", async () => {
    app = await boot({ rateLimit: { ttlMs: 60_000, max: 3 } }, [PingController]);
    for (let i = 0; i < 6; i++) await request(app.getHttpServer()).get("/v1/health").expect(200);
  });

  it("keys on the forwarded client IP when TRUST_PROXY is set", async () => {
    app = await boot({ rateLimit: { ttlMs: 60_000, max: 1 }, trustProxy: 1 }, [PingController]);
    const server = app.getHttpServer();
    await request(server).get("/v1/ping").set("X-Forwarded-For", "203.0.113.1").expect(200);
    await request(server).get("/v1/ping").set("X-Forwarded-For", "203.0.113.1").expect(429);
    await request(server).get("/v1/ping").set("X-Forwarded-For", "203.0.113.2").expect(200);
  });
});
