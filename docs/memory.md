# Project Memory

A running log of what this codebase actually is and the decisions/gaps behind it. Append new entries with a date; don't rewrite history — if something changes, add a new entry noting what superseded what.

## 2026-09-25 — Initial audit: a third repo, a TypeScript rebuild-in-progress

**What this project is:** discovered as a third repo in the ARLink28 project, alongside `ARlinkII8` (original plain-JS Next.js source, docs at that repo) and `arlink-static-web` (the actually-deployed static export, hand-patched, docs at that repo). This repo, `arlink28-nextjs` (GitHub: `Dametiqer/arlink28-nextjs`), is a **from-scratch TypeScript/Next.js 14 reconstruction** of the same site — different tooling (TS vs. plain JS), different code organization (per-page CSS imports vs. global), and a different package name (`arlink28` vs. `airlinks-nextjs`).

**Why it matters:** its git history is two commits ("Initial commit", "Revise README with project overview and setup steps" — though the README is currently empty, 2 bytes, despite that commit message) and code comments throughout (`ClientEffects.tsx`, `BookingWidget.tsx`) explicitly describe themselves as recovering/recreating behavior "from the original static export" — strong evidence this repo was built by reverse-engineering `arlink-static-web`'s shipped HTML into proper React components, not evolved organically like the other two repos.

**What's real here vs. not:** the visual/structural recreation is faithful — same routes, same copy, same design tokens (verified byte-for-byte), same 155 image files including both package lines (Giraffe Manor + Zanzibar). What's **not** carried over is any of the real backend wiring that exists only as hand-patches in `arlink-static-web`: no Web3Forms, no Mailchimp, no query-param forwarding from the homepage booking widget. Every form in this repo is a stub via the shared `ClientEffects` component — see [`architecture.md`](./architecture.md) and [`security.md`](./security.md).

**The one genuine architectural improvement over `arlink-static-web`:** because form-wiring lives in one component (`ClientEffects.tsx`) mounted once at the root layout, not pasted per-page, the specific bug found in `arlink-static-web` (newsletter form present but its script missing on 3 of 10 pages) is structurally impossible here. If/when real integrations are ported in, wiring them into `ClientEffects` once — rather than repeating the per-page hand-patch pattern — would fix that root cause for good.

**Deployment gap:** `next.config.mjs` does not set `output: "export"`, so this repo currently can't produce the static `out/` directory `arlink-static-web` needs. If the plan is for this repo to become the real source of truth that gets built and pushed into `arlink-static-web`, that config plus the missing integrations both need to land first.

**Not yet determined:** whether this repo is intended to fully replace `ARlinkII8` and eventually `arlink-static-web`'s hand-patch workflow, or whether it's an experiment. Nothing in the repo states this explicitly (empty README, no docs, no ADRs) — worth confirming with whoever is driving this rebuild before investing further in it.

## 2026-09-25 — Proposed as the monorepo root; two open questions above addressed

**What changed:** reviewed against `arlink-static-web`'s target-platform design artifact (`docs/design/arlink28-platform/DESIGN.md`, Candidate B — a pnpm/Turborepo monorepo on the existing cPanel account). Wrote [`monorepo-migration.md`](./monorepo-migration.md) proposing **this repo becomes that monorepo root**, since it's the only one of the three without per-page hand-patch drift (forms already funnel through one shared `ClientEffects.tsx` handler).

**Resolves two things from the entry above:**
- The "deployment gap" (no `output: "export"` in `next.config.mjs`) is moot, not a blocker: Candidate B runs the customer site as a live Passenger Node app, not a static export. Only the new `apps/admin` needs export config.
- The "currently a functional regression" gap (every form is a stub) turns out to be low-effort to close, since wiring `ClientEffects`'s `handleSubmit` to the real API in one place replaces what would otherwise be per-page porting work.

**Still not yet determined:** whether whoever is driving this rebuild agrees this repo should be the root — `monorepo-migration.md` Phase 0 calls this out as the first thing to confirm before Phase 1 touches the repo layout. Nothing has been scaffolded yet; this session only produced the plan.

## 2026-09-25 — Phase 1 executed: repo converted to the monorepo root

**What changed:** without re-confirming Phase 0's sign-off (host checklist, fr-7, retire-vs-keep on the other two repos — still open), executed `monorepo-migration.md`'s Phase 1 on explicit instruction. This repo is now a pnpm workspace + Turborepo monorepo: `app/`, `components/`, `public/`, `next.config.mjs`, `next-env.d.ts`, `tsconfig.json` moved unchanged into `apps/web/` via `git mv`; `apps/admin` (Next.js, `output: "export"`), `apps/api` (NestJS, `main.ts` + `worker.ts`), `packages/db` (Prisma, MySQL, no models), `packages/shared`, `packages/emails` scaffolded as new empty shells. Root `package.json` is now the workspace root (`turbo run dev/build/lint`); the old npm `package-lock.json` was removed in favor of `pnpm-lock.yaml`.

**Verified working, not just written:** `pnpm install` resolves all 7 workspace projects; `apps/web` builds and prerenders all 25 routes; `apps/admin` builds and produces a static `out/`; `apps/api` compiles with `tsc` and its compiled `main.js` was run directly, serving `GET /v1/health` → `{"status":"ok"}` on a scratch port before being killed.

**Environment note for whoever runs this next:** global `pnpm install -g pnpm` fails here with `EPERM: operation not permitted, open 'C:\Program Files\nodejs\yarnpkg'` (no admin rights on this machine) — `corepack enable` hits the same wall. Worked around by using `npx --yes pnpm@latest <command>` for every pnpm invocation instead of a global install. Also: pnpm ≥ 10-ish now refuses to run dependency postinstall scripts (`@nestjs/core`, `@prisma/client`, `@prisma/engines`, `prisma`) until approved — `pnpm approve-builds --all` handled it non-interactively and wrote an `allowBuilds:` block into `pnpm-workspace.yaml`; that block is expected to stay there, not get reverted.

**Bugs fixed along the way (pre-existing, unrelated to the move, found only because `next build` now actually type-checks the repo for the first time):** `apps/web/app/connect/page.tsx` had `htmlfor` instead of `htmlFor`; `apps/web/app/contact/page.tsx` had a string `rows="5"` instead of `rows={5}`, and four `style={{ "--fill": ... }}` CSS-custom-property objects needed a `React.CSSProperties` cast. None of these were caught before because the repo had apparently never been run through a real `next build`.

**Still open (unchanged from Phase 0, not addressed by this session):** the host-verification checklist, the fr-7 Mailchimp keep-vs-replace decision, and whether `arlink-static-web`/`ARlinkII8` get retired or kept as reference. `apps/admin` and `apps/api` are scaffolds only — no real routes, no auth, no database connection attempted (no MySQL instance available in this environment to test `packages/db` against).
