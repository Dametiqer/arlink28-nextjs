# Instructions

## Stack

- pnpm workspaces + Turborepo monorepo (converted 2026-09-25 — see [`monorepo-migration.md`](./monorepo-migration.md))
- `apps/web` — Next.js 14 (App Router), React 18, TypeScript (`strict: false`), hand-written CSS per page in `app/styles/`. Runs as a live Node app (no `output: "export"` — see the note below).
- `apps/admin` — Next.js 14, static export (`output: "export"`). Scaffold only; no real pages yet.
- `apps/api` — NestJS 10 + TypeScript (`strict: true`), plain `tsc` build (no Nest CLI). M0 foundation of [`packages-api-plan.md`](./packages-api-plan.md): env validation, Prisma service, shared error envelope, zod pipe, UUIDv7 ids, cursor pagination, and `GET /v1/health` (pings MySQL; 503 when it is down). `src/main.ts` is the HTTP server, `src/worker.ts` is the separate cron-worker entrypoint.
- `packages/db` — Prisma, MySQL. Package-catalogue schema (13 tables) plus the first migration, including hand-written CHECK constraints. Builds to `dist/`.
- `packages/shared` — zod contracts shared by web, admin and api: error envelope, money (minor units), pagination. Builds to `dist/`.
- `packages/emails` — empty placeholder package.

See [`architecture.md`](./architecture.md) for what is and isn't wired up, and how this repo relates to `ARlinkII8` and `arlink-static-web`.

## Setup

```bash
pnpm install        # installs all 7 workspace projects
pnpm dev             # runs every app's dev script via Turborepo
pnpm build           # builds every app
```

Run one app at a time with `--filter`:

```bash
pnpm --filter @arlink28/web dev      # http://localhost:3000
pnpm --filter @arlink28/admin dev    # http://localhost:3002
pnpm --filter @arlink28/api dev      # NestJS on :3001 (ts-node-dev)
```

`apps/api`'s worker entrypoint runs separately: `pnpm --filter @arlink28/api worker:dev`.

`packages/db` and `packages/shared` compile to `dist/`, and apps import that output. Turbo builds them first for `dev`, `build`, `test` and `typecheck`. If you run a single app without Turbo, run `pnpm build --filter @arlink28/shared --filter @arlink28/db` first.

## Database (local)

Local dev uses WAMP's **MySQL 9.1 on 127.0.0.1:3306, user `root`, no password**. The databases are `arlink28` (dev) and `arlink28_test` (e2e tests; recreated on every e2e run).

```bash
cp packages/db/.env.example packages/db/.env   # Prisma CLI
cp apps/api/.env.example apps/api/.env         # API runtime
pnpm db:migrate        # prisma migrate dev: applies migrations and regenerates the client
pnpm db:studio         # browse data
pnpm test              # unit tests (no DB)
pnpm test:e2e          # API + schema tests against arlink28_test
```

**WAMP defaults differ from production.** WAMP's `my.ini` sets `default_storage_engine=MYISAM`, and its `sql_mode` is empty (non-strict). cPanel MySQL uses InnoDB and strict mode. Migrations pin `SET default_storage_engine = InnoDB`, and an e2e test fails if any table is not InnoDB, so the engine is covered. Non-strict `sql_mode` still silently truncates bad writes locally. To match production, set `default_storage_engine=InnoDB` and `sql_mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION` under `[wampmysqld64]` in `C:wamp64_3.3.4inmysqlmysql9.1.0my.ini`, then restart WAMP. This change affects other projects on that server.

Production must run **MySQL >= 8.0.16**. Older versions parse CHECK constraints but do not enforce them. Keep new SQL within MySQL 8.0 features: the local server is 9.1, but cPanel will not be.

If `pnpm` isn't on PATH, `npx --yes pnpm@latest <command>` works identically (that's how this monorepo was scaffolded in this environment — global install hit an `EPERM` writing to `C:\Program Files\nodejs`).

## Resolved: static-export question

The previous version of this doc flagged that `next.config.mjs` didn't set `output: "export"`, and asked whether this repo was meant to regenerate `arlink-static-web`'s deploy. That's now settled by the target-platform design (`arlink-static-web`'s `docs/design/arlink28-platform/DESIGN.md`, Candidate B): **`apps/web` deploys as a live Passenger Node app, not a static export** — leave `output: "export"` unset there. Only `apps/admin` is a static export, and it's already configured that way.

## Project structure

```text
apps/web/app/                  Next.js App Router pages (one folder per route)
apps/web/app/styles/           Per-page CSS, imported by that page's page.tsx (not global)
apps/web/app/globals.css       Base tokens/resets, minified, imported once in layout.tsx
apps/web/app/layout.tsx        Root layout: Header, Footer, ClientEffects, BackToTop, Font Awesome <link>
apps/web/components/           Header, Footer, BookingWidget, ClientEffects, BackToTop
apps/web/public/images/        Site imagery, including public/images/packages/ (Giraffe Manor + Zanzibar)
apps/admin/app/                Admin dashboard pages (scaffold: just a placeholder home page)
apps/api/src/                  NestJS API: main.ts, app.setup.ts (prefix, helmet, CORS, error filter), config.ts, worker.ts
apps/api/src/common/           Prisma service, AppError + ErrorFilter, ZodPipe, ids (UUIDv7), money, pagination
apps/api/test/                 e2e tests (supertest + real MySQL test DB)
packages/db/prisma/            Prisma schema + migrations/
packages/shared/src/           Shared zod contracts: errors, money, pagination
packages/emails/src/           React Email templates (placeholder)
```

`@/*` resolves to `apps/web` (that app's own `tsconfig.json` `paths`), e.g. `import Header from "@/components/Header"` from within `apps/web`.

## Environment variables

- `packages/db/.env`: `DATABASE_URL`, used by the Prisma CLI.
- `apps/api/.env` (local only; on cPanel, set these in the Node.js app settings): `NODE_ENV`, `PORT`, `DATABASE_URL`, `CORS_ORIGINS`. They are validated at boot, so the API refuses to start with a bad value. See `apps/api/.env.example`.
- `TEST_DATABASE_URL` (optional): overrides the e2e database. Its name must end in `_test`, because the suite drops and recreates it. See [`security.md`](./security.md) for what to set up as the real integrations (Web3Forms replacement, Mailchimp/newsletter, payment provider keys) are ported in.
