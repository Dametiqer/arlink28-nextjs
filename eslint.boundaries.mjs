// Database access boundary, shared by eslint.config.mjs (packages) and
// eslint.boundaries.config.mjs (apps/web, which has no ESLint setup of its own).
//
// Nothing in this repo touches the database. Only the C# API does (ADR 0005),
// so web and the browser-safe packages must go through the /v1 API, and
// pricing, publish rules and audit logging can't be bypassed.

const PRISMA = ["@prisma/client", "@prisma/client/*", ".prisma/*", "prisma"];

/** No database access at all. */
export const noDbImports = {
  "no-restricted-imports": [
    "error",
    {
      patterns: [
        {
          group: ["@arlink28/db", "@arlink28/db/*", ...PRISMA],
          message:
            "Only the C# API may access the database. Call the /v1 API instead (types and schemas come from @arlink28/shared).",
        },
      ],
    },
  ],
};
