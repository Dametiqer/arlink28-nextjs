import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { loadConfig } from "../src/config";
import { boot } from "./boot";

describe("Swagger docs", () => {
  let app: INestApplication;
  afterEach(() => app?.close());

  it("serves an OpenAPI 3 spec built from the shared zod schemas", async () => {
    app = await boot();
    const res = await request(app.getHttpServer()).get("/docs/openapi.json").expect(200);
    expect(res.body.openapi).toMatch(/^3\./);
    expect(res.body.info).toMatchObject({ title: "ARLink28 API", version: "0.1.0" });
    expect(res.body.servers).toEqual([{ url: "/" }]);
    expect(Object.keys(res.body.components.schemas)).toEqual(
      expect.arrayContaining(["ErrorEnvelope", "HealthResponse"]),
    );

    const health = res.body.paths["/v1/health"].get.responses;
    expect(health["200"].content["application/json"].schema).toEqual({ $ref: "#/components/schemas/HealthResponse" });
    expect(health["503"].content["application/json"].schema).toEqual({ $ref: "#/components/schemas/HealthResponse" });
    expect(health.default.content["application/json"].schema).toEqual({ $ref: "#/components/schemas/ErrorEnvelope" });
  });

  it("serves Swagger UI at /docs with a CSP that still forbids inline scripts", async () => {
    app = await boot();
    const res = await request(app.getHttpServer()).get("/docs").expect(200);
    expect(res.headers["content-type"]).toMatch(/text\/html/);
    expect(res.text).toContain("swagger-ui-bundle.js");
    const csp = res.headers["content-security-policy"];
    expect(csp).toContain("img-src 'self' data: https:");
    expect(csp).toContain("script-src 'self';");
    await request(app.getHttpServer()).get("/docs/swagger-ui-bundle.js").expect(200);
  });

  it("keeps helmet's strict CSP on API routes", async () => {
    app = await boot();
    const res = await request(app.getHttpServer()).get("/v1/health").expect(200);
    const csp = res.headers["content-security-policy"];
    expect(csp).toContain("script-src 'self';");
    expect(csp).toContain("img-src 'self' data:;");
    expect(csp).not.toContain("https:;object-src");
  });

  it("is 404 in production unless SWAGGER_ENABLED=true", async () => {
    const prod = loadConfig({ ...process.env, NODE_ENV: "production", SWAGGER_ENABLED: undefined });
    app = await boot(prod);
    await request(app.getHttpServer()).get("/docs").expect(404);
    const res = await request(app.getHttpServer()).get("/docs/openapi.json").expect(404);
    expect(res.body.error.code).toBe("NOT_FOUND");
    await app.close();

    app = await boot(loadConfig({ ...process.env, NODE_ENV: "production", SWAGGER_ENABLED: "true" }));
    await request(app.getHttpServer()).get("/docs/openapi.json").expect(200);
  });
});
