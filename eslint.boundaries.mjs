// Database access boundary, shared by eslint.config.mjs (backend packages) and
// eslint.boundaries.config.mjs (web/admin, which have no ESLint setup of their own).
//
// Only apps/api (HTTP server + cron worker) may touch MySQL, and only through
// @arlink28/db. Web, admin and the browser-safe packages must go through the
// /v1 API, so pricing, publish rules and audit logging can't be bypassed.
// See docs/packages-api-plan.md §2.

const PRISMA = ["@prisma/client", "@prisma/client/*", ".prisma/*", "prisma"];

/** For apps/api: the DB is allowed, but only via @arlink28/db (one schema, one client). */
export const apiDbImports = {
  "no-restricted-imports": [
    "error",
    {
      patterns: [
        {
          group: PRISMA,
          message: "Import the Prisma client and types from @arlink28/db, not @prisma/client directly.",
        },
      ],
    },
  ],
};

/** For everything that isn't apps/api: no database access at all. */
export const noDbImports = {
  "no-restricted-imports": [
    "error",
    {
      patterns: [
        {
          group: ["@arlink28/db", "@arlink28/db/*", ...PRISMA],
          message:
            "Only apps/api may access the database. Call the /v1 API instead (types and schemas come from @arlink28/shared).",
        },
      ],
    },
  ],
};
