# ARLink28

pnpm/Turborepo monorepo for the ARLink28 travel platform.

```text
apps/web        customer site (Next.js 14, public pages + checkout)
apps/admin      admin dashboard (Next.js, static export)
apps/api        API (NestJS + Prisma) — main.ts = HTTP server, worker.ts = cron worker
packages/db     Prisma schema + client (MySQL)
packages/shared zod schemas, API types, money/currency helpers
packages/emails React Email templates
```

See [`docs/monorepo-migration.md`](./docs/monorepo-migration.md) for the phased plan this layout implements, and [`docs/`](./docs/) generally for architecture, design and decisions.

## Setup

```bash
pnpm install
pnpm dev     # runs every app's dev script via Turborepo
pnpm build   # builds every app
```

Run one app at a time with `--filter`:

```bash
pnpm --filter @arlink28/web dev      # http://localhost:3000
pnpm --filter @arlink28/admin dev    # http://localhost:3002
pnpm --filter @arlink28/api dev      # NestJS on :3001 (ts-node-dev)
```

See [`docs/instructions.md`](./docs/instructions.md) for full setup details (worker entrypoint, env vars, project structure).
