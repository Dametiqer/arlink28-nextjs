import { PackageListQuery, QuoteQuery } from "@arlink28/shared";
import { zodComponentSchemas, zodQueryParams } from "./openapi-schemas";

describe("zodComponentSchemas", () => {
  it("generates OpenAPI components from the shared zod contracts", () => {
    const schemas = zodComponentSchemas();
    expect(Object.keys(schemas).sort()).toEqual([
      "DestinationList",
      "ErrorEnvelope",
      "HealthResponse",
      "PackageCard",
      "PackageDetail",
      "PackageList",
      "PartnerList",
      "Quote",
    ]);
    expect(schemas.HealthResponse).toMatchObject({
      type: "object",
      properties: {
        status: { type: "string", enum: ["ok", "degraded"] },
        db: { type: "string", enum: ["ok", "down"] },
      },
      required: ["status", "db"],
    });
    expect(schemas.ErrorEnvelope).toMatchObject({ type: "object", required: ["error"] });
  });
});

describe("zodQueryParams", () => {
  it("marks only non-optional fields as required", () => {
    const params = zodQueryParams(QuoteQuery);
    expect(params.map((p) => [p.name, p.required])).toEqual([
      ["checkIn", true],
      ["nights", false],
      ["currency", false],
      ["addOns", false],
    ]);
  });

  it("documents transformed fields by their wire (string) type", () => {
    const byName = Object.fromEntries(zodQueryParams(QuoteQuery).map((p) => [p.name, p.schema]));
    expect(byName.addOns).toMatchObject({ type: "string" });
    expect(byName.currency).toMatchObject({ type: "string" });
    expect(byName.currency.enum).toContain("USD");
    expect(byName.currency.enum).toContain("NGN");
    expect(byName.nights).toMatchObject({ type: "integer", minimum: 1, maximum: 60 });
  });

  it("includes pagination defaults on the list query", () => {
    const limit = zodQueryParams(PackageListQuery).find((p) => p.name === "limit");
    expect(limit).toMatchObject({ required: false, schema: { default: 20, maximum: 100 } });
  });
});
