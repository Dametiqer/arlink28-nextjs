import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { boot } from "./boot";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

describe("X-Request-Id", () => {
  let app: INestApplication;
  beforeAll(async () => {
    app = await boot();
  });
  afterAll(() => app?.close());

  it("is generated for every response", async () => {
    const res = await request(app.getHttpServer()).get("/v1/health").expect(200);
    expect(res.headers["x-request-id"]).toMatch(UUID);
  });

  it("echoes a safe caller-supplied id", async () => {
    const res = await request(app.getHttpServer()).get("/v1/health").set("X-Request-Id", "support-ticket.42_a");
    expect(res.headers["x-request-id"]).toBe("support-ticket.42_a");
  });

  it.each([["unsafe characters", "abc<script>"], ["too long", "a".repeat(65)]])(
    "replaces an id with %s",
    async (_label, id) => {
      const res = await request(app.getHttpServer()).get("/v1/health").set("X-Request-Id", id);
      expect(res.headers["x-request-id"]).toMatch(UUID);
    },
  );

  it("puts the same id in the error envelope", async () => {
    const res = await request(app.getHttpServer()).get("/v1/does-not-exist").expect(404);
    expect(res.body.error.code).toBe("NOT_FOUND");
    expect(res.body.error.requestId).toBe(res.headers["x-request-id"]);
    expect(res.body.error.requestId).toMatch(UUID);
  });
});
