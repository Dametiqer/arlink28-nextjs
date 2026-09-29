# Instructions

## Stack

- pnpm workspaces + Turborepo monorepo (converted 2026-09-25 — see [`monorepo-migration.md`](./monorepo-migration.md))
- `apps/web` — Next.js 14 (App Router), React 18, TypeScript (`strict: false`), hand-written CSS per page in `app/styles/`. Runs as a live Node app (no `output: "export"` — see the note below).
- Admin UI — lives in `apps/web` as the `app/(admin)` route group, served under `/admin`. The separate `apps/admin` app was merged in and removed.
- `apps/api` — NestJS 10 + TypeScript (`strict: true`), plain `tsc` build (no Nest CLI). M0 foundation of [`packages-api-plan.md`](./packages-api-plan.md): env validation, Prisma service, shared error envelope, zod pipe, UUIDv7 ids, cursor pagination, and `GET /v1/health` (pings MySQL; 503 when it is down). `src/main.ts` is the HTTP server, `src/worker.ts` is the separate cron-worker entrypoint.
- `packages/db` — Prisma, MySQL. Package-catalogue schema (13 tables) plus the first migration, including hand-written CHECK constraints. Builds to `dist/`.
- `packages/shared` — zod contracts shared by web, admin and api: error envelope, money (minor units), pagination. Builds to `dist/`.
- `packages/emails` — empty placeholder package.

See [`architecture.md`](./architecture.md) for what is and isn't wired up, and how this repo relates to `ARlinkII8` and `arlink-static-web`.

## Setup

```bash
pnpm install        # installs all 6 workspace projects
pnpm dev             # runs every app's dev script via Turborepo
pnpm build           # builds every app
```

Run one app at a time with `--filter`:

```bash
pnpm --filter @arlink28/web dev      # http://localhost:3000 (admin at /admin)
pnpm --filter @arlink28/api dev      # NestJS on :3001 (ts-node-dev)
```

`apps/api`'s worker entrypoint runs separately: `pnpm --filter @arlink28/api worker:dev`.

Lint and format (backend packages; `apps/web` keeps `next lint`, and Web CI in `.github/workflows/web-ci.yml` runs its typecheck and build):

```bash
pnpm exec turbo run lint --filter=@arlink28/api... --filter=@arlink28/shared --filter=@arlink28/db
pnpm format          # Prettier --write over apps/api, packages, docs/packages-api-plan.md, tasks
pnpm format:check    # what CI runs
```

ESLint 9 uses the flat config in `eslint.config.mjs`, with type-aware `typescript-eslint` rules on `apps/api/src` (for example `no-floating-promises` and `no-misused-promises`). Warnings fail the lint. Every `eslint-disable` needs a `-- reason`.

**Database boundary:** only `apps/api` may touch MySQL, and only via `@arlink28/db`, never `@prisma/client` directly. `apps/web`, `packages/shared` and `packages/emails` must call the `/v1` API. The rule lives in `eslint.boundaries.mjs`. It is part of the normal backend lint, and `pnpm lint:boundaries` also checks `apps/web`. That boundary config ignores inline `eslint-disable` comments, so the rule can't be switched off per line. CI runs it in `.github/workflows/boundaries.yml` on any change under `apps/` or `packages/`.

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
npx --yes pnpm@12.6.0 --filter @arlink28/db build  # needed before seeding (compiles the seed script)
npx --yes pnpm@12.6.0 --filter @arlink28/db seed   # load the poster catalogue into arlink28 (safe to re-run)
```

The seed matches rows by slug and resets seeded packages to the poster data on every run; it refuses `NODE_ENV=production` without `--allow-production`. Pass `-- --today=YYYY-MM-DD` to compute FROM prices as of another date. If `prisma generate` fails with `EPERM ... query_engine-windows.dll.node`, a running API (e.g. `pnpm --filter @arlink28/api dev`) has the Prisma engine loaded; stop it and rebuild.

**WAMP defaults differ from production.** WAMP's `my.ini` sets `default_storage_engine=MYISAM`, and its `sql_mode` is empty (non-strict). cPanel MySQL uses InnoDB and strict mode. Migrations pin `SET default_storage_engine = InnoDB`, and an e2e test fails if any table is not InnoDB, so the engine is covered. Non-strict `sql_mode` still silently truncates bad writes locally. To match production, set `default_storage_engine=InnoDB` and `sql_mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION` under `[wampmysqld64]` in `C:wamp64_3.3.4inmysqlmysql9.1.0my.ini`, then restart WAMP. This change affects other projects on that server.

CI (`.github/workflows/api-ci.yml`) runs build, typecheck, lint, `format:check`, unit tests and then the e2e suite. The e2e suite runs against a **`mysql:8.0` service container in its default strict `sql_mode`**. This happens on every push and PR to `develop` and `main` that touches `apps/api`, `packages` or root config. It uses Node 20, the lowest supported version. If e2e passes locally on 9.1 but fails in CI, look for 9.x-only SQL or non-strict-mode assumptions first.

Production must run **MySQL >= 8.0.16**. Older versions parse CHECK constraints but do not enforce them. Keep new SQL within MySQL 8.0 features: the local server is 9.1, but cPanel will not be.

If `pnpm` isn't on PATH, `npx --yes pnpm@latest <command>` works identically (that's how this monorepo was scaffolded in this environment — global install hit an `EPERM` writing to `C:\Program Files\nodejs`).

## Testing with Swagger

The API serves **Swagger UI at http://localhost:3001/docs** and the raw OpenAPI 3 spec at `http://localhost:3001/docs/openapi.json`. Start it with `pnpm --filter @arlink28/api dev`. Use "Try it out" on an operation to call the running API from the browser.

- The schemas come from the zod contracts in `packages/shared` (`apps/api/src/docs/openapi-schemas.ts` registers them as components). There are no hand-written DTOs to keep in sync: when you add an endpoint, register its shared schemas there and reference them with `schemaRef(...)` in `@ApiOkResponse` and similar decorators. Every operation gets the shared `ErrorEnvelope` as its default error response.
- Swagger is on whenever `NODE_ENV` is not `production`. It is **off in production** (`/docs` returns 404) unless you set `SWAGGER_ENABLED=true`, e.g. on a staging deploy. `SWAGGER_ENABLED=false` turns it off anywhere. The docs have no auth yet, so don't enable them on the public production site.
- `/docs` gets a slightly looser Content-Security-Policy (images from `data:`/`https:`). Every other route keeps helmet's defaults.
- The spec is also handy for client generation or Postman import: `curl http://localhost:3001/docs/openapi.json`.

## Resolved: static-export question

The previous version of this doc flagged that `next.config.mjs` didn't set `output: "export"`, and asked whether this repo was meant to regenerate `arlink-static-web`'s deploy. That's now settled by the target-platform design (`arlink-static-web`'s `docs/design/arlink28-platform/DESIGN.md`, Candidate B): **`apps/web` deploys as a live Node app, not a static export** — leave `output: "export"` unset there. Hosting has since moved from cPanel to one VPS ([ADR 0004](./adr/0004-single-vps-hosting.md)), and the admin UI is now part of `apps/web`, so nothing in the repo is a static export.

## Project structure

```text
apps/web/app/                  Next.js App Router pages (one folder per route)
apps/web/app/styles/           Per-page CSS, imported by that page's page.tsx (not global)
apps/web/app/globals.css       Base tokens/resets, minified, imported once in layout.tsx
apps/web/app/layout.tsx        Root layout: Header, Footer, ClientEffects, BackToTop, Font Awesome <link>
apps/web/components/           Header, Footer, BookingWidget, ClientEffects, BackToTop
apps/web/public/images/        Site imagery, including public/images/packages/ (Giraffe Manor + Zanzibar)
apps/web/app/(admin)/admin/    Admin UI pages (login, dashboard, users, password flows)
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
- `apps/api/.env` (local only; on cPanel, set these in the Node.js app settings): `NODE_ENV`, `PORT`, `DATABASE_URL`, `CORS_ORIGINS`, `LOG_LEVEL`, `RATE_LIMIT_TTL_MS`, `RATE_LIMIT_MAX`, `TRUST_PROXY`, `SWAGGER_ENABLED`. They are validated at boot, so the API refuses to start with a bad value. See `apps/api/.env.example`.
- Rate limiting: every `/v1` route except `GET /v1/health` is limited per client IP (`RATE_LIMIT_MAX` requests per `RATE_LIMIT_TTL_MS`, default 120 per minute). Throttled requests get `429` with `code: "RATE_LIMITED"` and a `Retry-After` header (seconds). Counters are in memory, which suits the single Passenger process.
- `TRUST_PROXY` (`false` by default; `true`, `false` or a hop count) sets Express `trust proxy`. **Production on cPanel must set `TRUST_PROXY=1`.** Apache/Passenger sits in front of the app, so without it every request appears to come from the proxy and all clients share one rate-limit bucket. Don't use `true` there: it trusts any client-supplied `X-Forwarded-For`, which lets a client choose its own IP.
- `TEST_DATABASE_URL` (optional): overrides the e2e database. Its name must end in `_test`, because the suite drops and recreates it. See [`security.md`](./security.md) for what to set up as the real integrations (Web3Forms replacement, Mailchimp/newsletter, payment provider keys) are ported in.
