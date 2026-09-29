# Instructions

## Stack

- pnpm workspaces + Turborepo monorepo (converted 2026-09-25 — see [`monorepo-migration.md`](./monorepo-migration.md))
- `apps/web` — Next.js 14 (App Router), React 18, TypeScript (`strict: false`), hand-written CSS per page in `app/styles/`. Runs as a live Node app (no `output: "export"` — see the note below).
- Admin UI — lives in `apps/web` as the `app/(admin)` route group, served under `/admin`. The separate `apps/admin` app was merged in and removed.
- `packages/api-client` — types for the C# API: `src/schema.ts` is generated from the committed `openapi.json` snapshot, and `src/index.ts` gives the schemas the web app uses short names (`AuthResponse`, `UserResponse`, `ApiProblem`, …). Refresh with `pnpm --filter @arlink28/api-client sync` while the API is running; Packages CI fails if the two drift.
- `packages/shared` — older zod contracts (error envelope, money in minor units, pagination, catalogue schemas). Builds to `dist/`. New code should use `@arlink28/api-client`.
- `packages/emails` — empty placeholder package.
- **API:** ASP.NET Core on PostgreSQL ([ADR 0005](./adr/0005-api-in-dotnet-with-postgres.md)), in the separate `arlink28-api` repo (`dotnet run` serves it on http://localhost:5270). The TypeScript API (`apps/api`, `packages/db`) and the shared pricing code were deleted 2026-09-29. Its tests are the parity checklist; read them from git history, e.g. `git show a925948:apps/api/test/catalogue.e2e-spec.ts`.

See [`architecture.md`](./architecture.md) for what is and isn't wired up, and how this repo relates to `ARlinkII8` and `arlink-static-web`.

## Setup

```bash
pnpm install        # installs all workspace projects
pnpm dev             # runs every app's dev script via Turborepo
pnpm build           # builds every app
```

Run one app at a time with `--filter`:

```bash
pnpm --filter @arlink28/web dev      # http://localhost:3000 (admin at /admin)
```

`apps/web` needs `API_URL` in `apps/web/.env.local` (copy `apps/web/.env.example`), pointing at the running C# API.

Lint, test and format:

```bash
pnpm --filter @arlink28/web lint        # ESLint for apps/web
pnpm --filter @arlink28/web typecheck   # apps/web (Web CI also runs next build)
pnpm exec turbo run lint --filter=./packages/*
pnpm test            # packages/shared unit tests
pnpm format          # Prettier --write over apps/web, packages and docs/packages-api-plan.md
pnpm format:check    # what Packages CI runs
```

ESLint 9 uses flat config: `eslint.config.mjs` for the packages, and `apps/web/eslint.config.mjs` for the web app (typescript-eslint, React hooks and the Next rules; `next lint` isn't used because Next 14 can't read flat config). Warnings fail the lint. Every `eslint-disable` needs a `-- reason`.

**Database boundary:** nothing in this repo touches the database. `apps/web`, `packages/shared` and `packages/emails` must call the `/v1` API, so pricing, publish rules and audit logging can't be bypassed. The rule lives in `eslint.boundaries.mjs`. `pnpm lint:boundaries` checks web and the packages, and ignores inline `eslint-disable` comments, so the rule can't be switched off per line. CI runs it in `.github/workflows/boundaries.yml` on any change under `apps/` or `packages/`.

`packages/shared` compiles to `dist/`, and apps import that output. Turbo builds it first for `dev`, `build`, `test` and `typecheck`. If you run a single app without Turbo, run `pnpm build --filter @arlink28/shared` first.

If `pnpm` isn't on PATH, `npx --yes pnpm@latest <command>` works identically (that's how this monorepo was scaffolded in this environment — global install hit an `EPERM` writing to `C:\Program Files\nodejs`).

## CI

- `web-ci.yml` — Prettier, ESLint, typecheck and `next build` for `apps/web`.
- `packages-ci.yml` — build, lint, typecheck, `format:check` and unit tests for `packages/*`, plus the `api-client` drift check.
- `boundaries.yml` — the database import rule across web and the packages.

All run on pushes and PRs to `develop` and `main` that touch their paths, on Node 20 (the lowest supported version).

## Resolved: static-export question

The previous version of this doc flagged that `next.config.mjs` didn't set `output: "export"`, and asked whether this repo was meant to regenerate `arlink-static-web`'s deploy. That's now settled by the target-platform design (`arlink-static-web`'s `docs/design/arlink28-platform/DESIGN.md`, Candidate B): **`apps/web` deploys as a live Node app, not a static export** — leave `output: "export"` unset there. Hosting has since moved from cPanel to one VPS ([ADR 0004](./adr/0004-single-vps-hosting.md)), and the admin UI is now part of `apps/web`, so nothing in the repo is a static export.

## Project structure

```text
apps/web/app/(web)/            Customer site pages (one folder per route)
apps/web/app/(web)/styles/     Per-page CSS, imported by that page's page.tsx (not global)
apps/web/app/(admin)/admin/    Admin UI pages (login, dashboard, users, password flows)
apps/web/app/layout.tsx        Root layout
apps/web/components/           Header, Footer, BookingWidget, ClientEffects, BackToTop, ProtectedPage
apps/web/context/              AuthContext (admin session)
apps/web/utils/api/            Browser API client: fetch wrapper and error parsing, auth/users calls, session types
apps/web/utils/server/         Server-only helpers for route handlers (API_URL, session cookie)
apps/web/app/api/              Route handlers: /api/session (cookie auth) and the /api/v1 proxy
apps/web/middleware.ts         Redirects signed-out visitors away from /admin pages
packages/api-client/           OpenAPI snapshot + generated types for the C# API
apps/web/public/images/        Site imagery, including public/images/packages/ (Giraffe Manor + Zanzibar)
packages/shared/src/           Shared zod contracts: errors, money, pagination, catalogue
packages/emails/src/           React Email templates (placeholder)
```

`@/*` resolves to `apps/web` (that app's own `tsconfig.json` `paths`), e.g. `import Header from "@/components/Header"` from within `apps/web`.

## Environment variables

- `apps/web/.env.local` (local only, git-ignored; template in `.env.example`): `API_URL`, the base URL of the C# API. It's read only on the server (session routes, the `/api/v1` proxy), so it never reaches the browser bundle.

See [`security.md`](./security.md) for what to set up as the real integrations (Web3Forms replacement, Mailchimp/newsletter, payment provider keys) are ported in.
