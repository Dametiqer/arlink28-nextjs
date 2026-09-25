# Monorepo Migration Plan

> **Source design (2026-09-25):** [`docs/design/arlink28-platform/DESIGN.md`](../../arlink-static-web/docs/design/arlink28-platform/DESIGN.md) in the `arlink-static-web` repo picked **Candidate B** — one pnpm/Turborepo monorepo (`apps/web`, `apps/admin`, `apps/api`, `packages/db`, `packages/shared`, `packages/emails`) deployed entirely on the existing cPanel account. This file translates that target architecture into concrete phases against **this repo's** actual state, and answers the "not yet determined" question `memory.md`'s 2026-09-25 audit left open: whether this repo is meant to become that root. Edit this file directly (it isn't generated).

## Why this repo is the monorepo root, not the other two

Three repos currently make up ARLink28 (see [`architecture.md`](./architecture.md) for the full comparison):

| Repo | Role | Why it's not the root |
|---|---|---|
| `ARlinkII8` (`airlinks-nextjs`) | Original plain-JS Next.js source | Superseded; plain JS, no clean form-wiring layer |
| `arlink-static-web` | The deployed static export | Not source at all — hand-edited HTML/CSS/JS with no `package.json`. Its own hand-patched scripts (Web3Forms, Mailchimp, booking-widget routing) are pasted per-page with no shared owner, which is the root cause of its documented newsletter bug (missing on 3 of 10 pages) |
| **`arlink28-nextjs` (this repo)** | TypeScript rebuild | **Chosen root.** Same routes/copy/design tokens/images as the live site, but every form already funnels through one shared component (`ClientEffects.tsx`) instead of per-page scripts — the exact failure mode above is structurally impossible here |

This matches DESIGN.md's own migration step for Candidate B: *"convert repo to pnpm + Turborepo; move the existing site to `apps/web` unchanged."* There's nothing to convert in `arlink-static-web` (no source), so that step can only mean a repo like this one.

## Two things this resolves that `memory.md` left open

- **The "deployment gap" flagged 2026-09-25** (`next.config.mjs` has no `output: "export"`, so `next build` doesn't produce a static `out/` directory) **is moot under Candidate B.** The container diagram in `arlink-static-web`'s `docs/architecture/02-container.md` has Customer Web running as a **live Next.js Node app on Passenger**, not a static export — only `apps/admin` needs static-export config. Don't add `output: "export"` to `apps/web`.
- **The "currently a functional regression" gap** (every form is a no-op stub in `ClientEffects.tsx`) turns out to be the *easy* part of this migration, not a blocker: because form handling already lives in one place, wiring it to the real API in Phase 3 is a one-file change — no per-page hand-patching to port over from `arlink-static-web`.

## Target structure

```text
arlink28/                     (this repo, converted to pnpm workspaces + Turborepo)
├── apps/web                  customer site — current app/, components/, public/ move here unchanged
├── apps/admin                admin dashboard — new, Next.js static export
├── apps/api                  NestJS API — new — main.ts = HTTP, worker.ts = worker (cron tick)
├── packages/db                Prisma schema + migrations (MySQL 8 / MariaDB 10.6+)
├── packages/shared           zod schemas, API types, money/currency helpers
└── packages/emails           React Email templates
```

## Status

**Phase 1 is done (2026-09-25).** This repo is now the pnpm/Turborepo monorepo root: `pnpm-workspace.yaml`, root `turbo.json`, `apps/web` (existing site, moved unchanged), `apps/admin` (static-export scaffold), `apps/api` (NestJS scaffold, `GET /v1/health`), `packages/db` (Prisma shell, MySQL datasource, no models), `packages/shared`, `packages/emails` (empty placeholders). All 7 workspace projects install and build cleanly with pnpm; `apps/web` builds and prerenders all 25 routes, `apps/admin` builds and statically exports, `apps/api` compiles and serves `/v1/health`. Three pre-existing TypeScript errors in `apps/web` (invalid `htmlfor` casing, a string `rows` attribute, four untyped CSS custom properties in `contact/page.tsx`) were fixed along the way — `next build` never caught them before because the repo had never been built with strict type-checking prior to this migration.

Not done: Phase 0's pre-flight checks (host checklist, fr-7 decision, retire-vs-keep call on the other two repos) were not run before scaffolding — worth circling back to before Phase 2 goes further than local scaffolding. Nothing has been deployed; `apps/admin` and `apps/api` have no real routes/pages yet.

## Phases

**Phase 0 — pre-flight (no code)**
- Confirm with whoever is driving this rebuild that this repo becomes the monorepo root (this doc is the proposal; get explicit sign-off before Phase 1 touches the repo layout).
- Answer DESIGN.md's host-verification checklist, which gates the Candidate B vs. C decision: cPanel MySQL/MariaDB version (need MySQL ≥ 8.0.16 or MariaDB ≥ 10.6), minimum cron interval (need 1 min), LVE memory/CPU/process limits (need ~512 MB+ for two Node apps), Node version offered (need 20+), SSH/Git deploy access, number of Node apps allowed, server location, bandwidth quota, disk/inode quota, off-site backup support.
- Decide fr-7 (keep Mailchimp alongside the API vs. bring newsletter fully in-house) — determines how much `packages/emails`/newsletter work lands in Phase 3.
- Decide the fate of `arlink-static-web` and `ARlinkII8`: retire once `apps/web` deploys live, or keep as reference/rollback. Candidate B assumes retirement.

**Phase 1 — scaffold the monorepo (done 2026-09-25, see Status above)**
- Add `pnpm-workspace.yaml` + root `turbo.json`.
- Move `app/`, `components/`, `public/`, `next.config.mjs`, `tsconfig.json` into `apps/web/` unchanged; update import paths only as needed for the new root.
- Scaffold `apps/admin` (Next.js, static export config — this is the one app that *should* set `output: "export"`), `apps/api` (NestJS + Prisma), `packages/db`, `packages/shared`, `packages/emails` as empty shells.
- Root-level scripts (`turbo build`, `turbo dev`, `turbo lint`), shared TS/ESLint config across workspaces.

**Phase 2 — data + auth foundation**
- `packages/db`: Prisma schema for the tables DESIGN.md already specced — `users`, `sessions`, `packages`, `departures`, `departure_prices`, `bookings`, `payments`, `payment_events`, `enquiries`, `newsletter_subscribers`, `audit_log`, `jobs`, `idempotency_keys` — against a local MySQL/MariaDB matching the confirmed cPanel version.
- `apps/api`: magic-link customer auth + TOTP staff auth, `GET /v1/me`.

**Phase 3 — catalogue + admin CRUD + real forms**
- `apps/admin` built against the API's admin routes: packages, departures, prices, image upload (multipart → WebP variants via the worker).
- `apps/web`'s package pages switch from hardcoded content to `GET /v1/packages*` (ISR, ≤5 min stale).
- Replace `ClientEffects.tsx`'s stub `handleSubmit` with real calls to `POST /v1/enquiries` and `POST /v1/newsletter/subscribe` — this is where Web3Forms/Mailchimp get superseded for good, in one place, not per-page.
- Add a real success/error message element to forms (currently missing here entirely, per `architecture.md`).

**Phase 4 — bookings + payments**
- Seat-hold transaction, Paystack + Stripe adapters behind one `PaymentProvider` interface, signed webhooks, `worker-tick.js` cron worker, reconciliation sweep, refunds — per the two critical-deep-dive designs already written in DESIGN.md (seat holds, payment verify/reconcile).
- `BookingWidget.tsx`'s four tabs go from inert (intercepted by `ClientEffects`) to real: flight tab keeps forwarding field values, all four `POST /v1/bookings` through checkout.

**Phase 5 — customer accounts + rollout hardening**
- Customer sign-in, booking history/receipt download.
- Hourly-dump restore drill; load test ~20 concurrent checkouts against one departure (DESIGN.md's stated rollout gate).

## Related docs

- [`architecture.md`](./architecture.md) — this repo's current stack and the three-repo comparison
- [`design.md`](./design.md) — design tokens/components carried into `apps/web` and `apps/admin`
- [`instructions.md`](./instructions.md) — setup/run, including the static-export config note this doc supersedes
- [`memory.md`](./memory.md) — audit history; the 2026-09-25 entry this plan resolves two open questions from
- `arlink-static-web`'s `docs/design/arlink28-platform/DESIGN.md` and `docs/architecture/02-container.md` — the source design this plan implements
