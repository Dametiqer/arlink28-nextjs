import { zodComponentSchemas } from "./openapi-schemas";

describe("zodComponentSchemas", () => {
  it("generates OpenAPI components from the shared zod contracts", () => {
    const schemas = zodComponentSchemas();
    expect(Object.keys(schemas).sort()).toEqual(["ErrorEnvelope", "HealthResponse"]);
    expect(schemas.HealthResponse).toMatchObject({
      type: "object",
      properties: { status: { type: "string", enum: ["ok", "degraded"] }, db: { type: "string", enum: ["ok", "down"] } },
      required: ["status", "db"],
    });
    expect(schemas.ErrorEnvelope).toMatchObject({ type: "object", required: ["error"] });
  });
});
