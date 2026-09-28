import { OpenAPIRegistry, OpenApiGeneratorV3, extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { applyDecorators } from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger";
import {
  DestinationList,
  ErrorEnvelope,
  HealthResponse,
  PackageCard,
  PackageDetail,
  PackageList,
  PartnerList,
  Quote,
} from "@arlink28/shared";
import { z } from "zod";

// Adds `.openapi()` to zod's prototype, which registry.register() needs. This
// must be the same zod copy packages/shared uses — openapi-schemas.spec.ts
// fails if the two ever diverge.
extendZodWithOpenApi(z);

/** Shared zod contracts exposed as reusable OpenAPI components (the single source of truth). */
const SCHEMAS = {
  ErrorEnvelope,
  HealthResponse,
  PackageCard,
  PackageList,
  PackageDetail,
  Quote,
  DestinationList,
  PartnerList,
} as const;
export type SchemaName = keyof typeof SCHEMAS;

export function zodComponentSchemas(): Record<string, unknown> {
  const registry = new OpenAPIRegistry();
  for (const [name, schema] of Object.entries(SCHEMAS)) registry.register(name, schema);
  return new OpenApiGeneratorV3(registry.definitions).generateComponents().components?.schemas ?? {};
}

export function schemaRef(name: SchemaName): { $ref: string } {
  return { $ref: `#/components/schemas/${name}` };
}

type ParamSchema = { type?: string; description?: string; [key: string]: unknown };

/** OpenAPI query parameters generated from the same zod object the ZodPipe validates with. */
export function zodQueryParams(schema: z.AnyZodObject): { name: string; required: boolean; schema: ParamSchema }[] {
  const registry = new OpenAPIRegistry();
  registry.register("Query", schema);
  const generated = new OpenApiGeneratorV3(registry.definitions).generateComponents().components?.schemas?.Query as {
    properties?: Record<string, ParamSchema>;
    required?: string[];
  };
  return Object.entries(generated.properties ?? {}).map(([name, s]) => ({
    name,
    required: generated.required?.includes(name) ?? false,
    schema: s,
  }));
}

/** `@ApiZodQuery(PackageListQuery)` — documents every query parameter of a zod schema. */
export function ApiZodQuery(schema: z.AnyZodObject): MethodDecorator {
  return applyDecorators(
    ...zodQueryParams(schema).map((p) =>
      ApiQuery({ name: p.name, required: p.required, schema: p.schema, description: p.schema.description }),
    ),
  );
}
