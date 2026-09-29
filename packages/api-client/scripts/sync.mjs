// Refresh openapi.json from a running C# API (arlink28-api repo), then
// `pnpm generate` rebuilds src/schema.ts from it. The snapshot is committed so
// the web build never needs the API running.
// Usage: pnpm --filter @arlink28/api-client sync   (API_URL defaults to local `dotnet run`)
import { writeFile } from "node:fs/promises";

const base = process.env.API_URL ?? "http://localhost:5270";
const url = `${base}/swagger/v1/swagger.json`;

const res = await fetch(url);
if (!res.ok) {
  console.error(`GET ${url} -> ${res.status}. Is the API running?`);
  process.exit(1);
}
const spec = await res.json();
await writeFile(new URL("../openapi.json", import.meta.url), JSON.stringify(spec, null, 2) + "\n");
console.log(`openapi.json updated from ${url}`);
