# ARLink28

pnpm/Turborepo monorepo for the ARLink28 travel platform.

```text
apps/web        Next.js 14 front end: customer site (app/(web)) and admin UI (app/(admin), under /admin)
apps/api        legacy NestJS API, kept only as the parity reference for the C# API (ADR 0005)
packages/db     legacy Prisma schema + client (MySQL), same status as apps/api
packages/shared zod schemas, API types, money/currency helpers
packages/emails React Email templates (placeholder)
```

The production API is ASP.NET Core on PostgreSQL ([ADR 0005](./docs/adr/0005-api-in-dotnet-with-postgres.md)), planned under `backend/` ([`docs/dotnet-api-plan.md`](./docs/dotnet-api-plan.md)) but not checked in yet. `apps/web` talks to it over HTTP via `NEXT_PUBLIC_API_URL`. Once the C# API passes the parity checklist, `apps/api`, `packages/db` and the pricing code in `packages/shared` are deleted.

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
pnpm --filter @arlink28/api dev      # legacy NestJS on :3001 (ts-node-dev)
```

See [`docs/instructions.md`](./docs/instructions.md) for full setup details (worker entrypoint, env vars, project structure).
