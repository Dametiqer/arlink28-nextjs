import { OpenAPIRegistry, OpenApiGeneratorV3, extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { ErrorEnvelope, HealthResponse } from "@arlink28/shared";
import { z } from "zod";

// Adds `.openapi()` to zod's prototype, which registry.register() needs. This
// must be the same zod copy packages/shared uses — openapi-schemas.spec.ts
// fails if the two ever diverge.
extendZodWithOpenApi(z);

/** Shared zod contracts exposed as reusable OpenAPI components (the single source of truth). */
const SCHEMAS = { ErrorEnvelope, HealthResponse } as const;
export type SchemaName = keyof typeof SCHEMAS;

export function zodComponentSchemas(): Record<string, unknown> {
  const registry = new OpenAPIRegistry();
  for (const [name, schema] of Object.entries(SCHEMAS)) registry.register(name, schema);
  return new OpenApiGeneratorV3(registry.definitions).generateComponents().components?.schemas ?? {};
}

export function schemaRef(name: SchemaName): { $ref: string } {
  return { $ref: `#/components/schemas/${name}` };
}
