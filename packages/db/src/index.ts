// Re-exports the generated Prisma client so apps depend on @arlink28/db, not
// on @prisma/client directly — one place owns the schema and its client.
export * from "@prisma/client";
export { uuidv7 } from "./ids";
export { seedCatalogue, validateSeed, type SeedSummary } from "./seed/seed-catalogue";
