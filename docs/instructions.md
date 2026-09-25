# Instructions

## Stack

- pnpm workspaces + Turborepo monorepo (converted 2026-09-25 — see [`monorepo-migration.md`](./monorepo-migration.md))
- `apps/web` — Next.js 14 (App Router), React 18, TypeScript (`strict: false`), hand-written CSS per page in `app/styles/`. Runs as a live Node app (no `output: "export"` — see the note below).
- `apps/admin` — Next.js 14, static export (`output: "export"`). Scaffold only; no real pages yet.
- `apps/api` — NestJS 10 + TypeScript, plain `tsc` build (no Nest CLI). Scaffold only: one `GET /v1/health` route. `src/main.ts` is the HTTP server, `src/worker.ts` is the separate cron-worker entrypoint.
- `packages/db` — Prisma, MySQL datasource. Schema has no models yet.
- `packages/shared`, `packages/emails` — empty placeholder packages.

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
apps/api/src/                  NestJS API: app.module.ts, app.controller.ts, main.ts, worker.ts
packages/db/prisma/            Prisma schema (no models yet)
packages/shared/src/           Shared zod schemas / types (placeholder)
packages/emails/src/           React Email templates (placeholder)
```

`@/*` resolves to `apps/web` (that app's own `tsconfig.json` `paths`), e.g. `import Header from "@/components/Header"` from within `apps/web`.

## Environment variables

None yet at the app level. `packages/db/.env.example` documents `DATABASE_URL` for Prisma once real models land (Phase 2, [`monorepo-migration.md`](./monorepo-migration.md)). See [`security.md`](./security.md) for what to set up as the real integrations (Web3Forms replacement, Mailchimp/newsletter, payment provider keys) are ported in.
