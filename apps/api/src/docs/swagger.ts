import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { INestApplication } from "@nestjs/common";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";
import type { AppConfig } from "../config";
import { schemaRef, zodComponentSchemas } from "./openapi-schemas";

export const DOCS_PATH = "/docs";

/** True for Swagger UI and its assets — the only routes that get a relaxed CSP. */
export function isDocsPath(path: string): boolean {
  return path === DOCS_PATH || path.startsWith(`${DOCS_PATH}/`);
}

function apiVersion(): string {
  // ../../package.json is apps/api/package.json from both src/docs and dist/docs.
  const pkg = JSON.parse(readFileSync(resolve(__dirname, "../../package.json"), "utf8")) as { version: string };
  return pkg.version;
}

// zod-to-openapi types its output with openapi3-ts; Nest uses its own typings for the same OpenAPI 3.0 JSON.
type ComponentSchemas = NonNullable<NonNullable<OpenAPIObject["components"]>["schemas"]>;

/** Every operation documents the shared error envelope as its default (non-2xx) response. */
function withSharedSchemas(document: OpenAPIObject): OpenAPIObject {
  document.components = {
    ...document.components,
    schemas: { ...document.components?.schemas, ...(zodComponentSchemas() as ComponentSchemas) },
  };
  for (const item of Object.values(document.paths)) {
    for (const method of ["get", "put", "post", "delete", "patch"] as const) {
      const op = item[method];
      if (op && !op.responses.default) {
        op.responses.default = {
          description: "Error — shared envelope; switch on `error.code`",
          content: { "application/json": { schema: schemaRef("ErrorEnvelope") } },
        };
      }
    }
  }
  return document;
}

/** Swagger UI at /docs and the raw spec at /docs/openapi.json, when enabled (off in production by default). */
export function setupSwagger(app: INestApplication, config: AppConfig): void {
  if (!config.swaggerEnabled) return;
  const base = new DocumentBuilder()
    .setTitle("ARLink28 API")
    .setDescription("Package catalogue API. Schemas are generated from the zod contracts in @arlink28/shared.")
    .setVersion(apiVersion())
    .addServer("/")
    .build();
  const document = withSharedSchemas(SwaggerModule.createDocument(app, base));
  SwaggerModule.setup(DOCS_PATH.slice(1), app, document, {
    jsonDocumentUrl: `${DOCS_PATH.slice(1)}/openapi.json`,
    customSiteTitle: "ARLink28 API",
  });
}
