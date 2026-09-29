# ARLink28

pnpm/Turborepo monorepo for the ARLink28 travel platform.

```text
apps/web        Next.js 14 front end: customer site (app/(web)) and admin UI (app/(admin), under /admin)
packages/shared zod schemas and API types (until packages/api-client is generated), money helpers
packages/emails React Email templates (placeholder)
```

The production API is ASP.NET Core on PostgreSQL ([ADR 0005](./docs/adr/0005-api-in-dotnet-with-postgres.md)), planned under `backend/` ([`docs/dotnet-api-plan.md`](./docs/dotnet-api-plan.md)) but not checked in yet. `apps/web` talks to it over HTTP via `NEXT_PUBLIC_API_URL`. The earlier TypeScript API (NestJS + Prisma on MySQL) was deleted 2026-09-29; its tests, the parity checklist for the C# API, are in git history at `a925948`.

See [`docs/monorepo-migration.md`](./docs/monorepo-migration.md) for the phased plan this layout implements, and [`docs/`](./docs/) generally for architecture, design and decisions.

## Setup

```bash
pnpm install
pnpm dev     # runs every app's dev script via Turborepo
pnpm build   # builds every app
```

Run one app at a time with `--filter`:

```bash
pnpm --filter @arlink28/web dev      # http://localhost:3000 (admin at /admin)
```

See [`docs/instructions.md`](./docs/instructions.md) for full setup details (env vars, CI, project structure).
