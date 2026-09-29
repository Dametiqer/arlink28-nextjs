# Instructions

## Stack

- pnpm workspaces + Turborepo monorepo (converted 2026-09-25 — see [`monorepo-migration.md`](./monorepo-migration.md))
- `apps/web` — Next.js 14 (App Router), React 18, TypeScript (`strict: false`), hand-written CSS per page in `app/styles/`. Runs as a live Node app (no `output: "export"` — see the note below).
- Admin UI — lives in `apps/web` as the `app/(admin)` route group, served under `/admin`. The separate `apps/admin` app was merged in and removed.
- `packages/shared` — zod contracts for the API's request/response shapes: error envelope, money (minor units), pagination, catalogue schemas. Builds to `dist/`. Replaced by the generated `packages/api-client` once the C# API publishes its OpenAPI spec.
- `packages/emails` — empty placeholder package.
- **API:** ASP.NET Core on PostgreSQL ([ADR 0005](./adr/0005-api-in-dotnet-with-postgres.md)), planned under `backend/` ([`dotnet-api-plan.md`](./dotnet-api-plan.md)). The TypeScript API (`apps/api`, `packages/db`) and the shared pricing code were deleted 2026-09-29. Its tests are the parity checklist; read them from git history, e.g. `git show a925948:apps/api/test/catalogue.e2e-spec.ts`.

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

`apps/web` needs `NEXT_PUBLIC_API_URL` in `apps/web/.env.local`, pointing at the running C# API.

Lint, test and format:

```bash
pnpm --filter @arlink28/web typecheck   # apps/web (Web CI also runs next build)
pnpm exec turbo run lint --filter=./packages/*
pnpm test            # packages/shared unit tests
pnpm format          # Prettier --write over packages and docs/packages-api-plan.md
pnpm format:check    # what Packages CI runs
```

ESLint 9 uses the flat config in `eslint.config.mjs` for the packages. `apps/web` has no ESLint config yet. Warnings fail the lint. Every `eslint-disable` needs a `-- reason`.

**Database boundary:** nothing in this repo touches the database. `apps/web`, `packages/shared` and `packages/emails` must call the `/v1` API, so pricing, publish rules and audit logging can't be bypassed. The rule lives in `eslint.boundaries.mjs`. `pnpm lint:boundaries` checks web and the packages, and ignores inline `eslint-disable` comments, so the rule can't be switched off per line. CI runs it in `.github/workflows/boundaries.yml` on any change under `apps/` or `packages/`.

`packages/shared` compiles to `dist/`, and apps import that output. Turbo builds it first for `dev`, `build`, `test` and `typecheck`. If you run a single app without Turbo, run `pnpm build --filter @arlink28/shared` first.

If `pnpm` isn't on PATH, `npx --yes pnpm@latest <command>` works identically (that's how this monorepo was scaffolded in this environment — global install hit an `EPERM` writing to `C:\Program Files\nodejs`).

## CI

- `web-ci.yml` — typecheck and `next build` for `apps/web`.
- `packages-ci.yml` — build, lint, `format:check` and unit tests for `packages/*`.
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
apps/web/utils/api/            API client: fetch wrapper, auth and users endpoints
apps/web/public/images/        Site imagery, including public/images/packages/ (Giraffe Manor + Zanzibar)
packages/shared/src/           Shared zod contracts: errors, money, pagination, catalogue
packages/emails/src/           React Email templates (placeholder)
```

`@/*` resolves to `apps/web` (that app's own `tsconfig.json` `paths`), e.g. `import Header from "@/components/Header"` from within `apps/web`.

## Environment variables

- `apps/web/.env.local` (local only, git-ignored): `NEXT_PUBLIC_API_URL`, the base URL of the C# API. It's inlined into the browser bundle at build time, so it must never hold a secret.

See [`security.md`](./security.md) for what to set up as the real integrations (Web3Forms replacement, Mailchimp/newsletter, payment provider keys) are ported in.
