# Project Memory

A running log of what this codebase actually is and the decisions/gaps behind it. Append new entries with a date; don't rewrite history — if something changes, add a new entry noting what superseded what.

## 2026-09-25 — Initial audit: a third repo, a TypeScript rebuild-in-progress

**What this project is:** discovered as a third repo in the ARLink28 project, alongside `ARlinkII8` (original plain-JS Next.js source, docs at that repo) and `arlink-static-web` (the actually-deployed static export, hand-patched, docs at that repo). This repo, `arlink28-nextjs` (GitHub: `Dametiqer/arlink28-nextjs`), is a **from-scratch TypeScript/Next.js 14 reconstruction** of the same site — different tooling (TS vs. plain JS), different code organization (per-page CSS imports vs. global), and a different package name (`arlink28` vs. `airlinks-nextjs`).

**Why it matters:** its git history is two commits ("Initial commit", "Revise README with project overview and setup steps" — though the README is currently empty, 2 bytes, despite that commit message) and code comments throughout (`ClientEffects.tsx`, `BookingWidget.tsx`) explicitly describe themselves as recovering/recreating behavior "from the original static export" — strong evidence this repo was built by reverse-engineering `arlink-static-web`'s shipped HTML into proper React components, not evolved organically like the other two repos.

**What's real here vs. not:** the visual/structural recreation is faithful — same routes, same copy, same design tokens (verified byte-for-byte), same 155 image files including both package lines (Giraffe Manor + Zanzibar). What's **not** carried over is any of the real backend wiring that exists only as hand-patches in `arlink-static-web`: no Web3Forms, no Mailchimp, no query-param forwarding from the homepage booking widget. Every form in this repo is a stub via the shared `ClientEffects` component — see [`architecture.md`](./architecture.md) and [`security.md`](./security.md).

**The one genuine architectural improvement over `arlink-static-web`:** because form-wiring lives in one component (`ClientEffects.tsx`) mounted once at the root layout, not pasted per-page, the specific bug found in `arlink-static-web` (newsletter form present but its script missing on 3 of 10 pages) is structurally impossible here. If/when real integrations are ported in, wiring them into `ClientEffects` once — rather than repeating the per-page hand-patch pattern — would fix that root cause for good.

**Deployment gap:** `next.config.mjs` does not set `output: "export"`, so this repo currently can't produce the static `out/` directory `arlink-static-web` needs. If the plan is for this repo to become the real source of truth that gets built and pushed into `arlink-static-web`, that config plus the missing integrations both need to land first.

**Not yet determined:** whether this repo is intended to fully replace `ARlinkII8` and eventually `arlink-static-web`'s hand-patch workflow, or whether it's an experiment. Nothing in the repo states this explicitly (empty README, no docs, no ADRs) — worth confirming with whoever is driving this rebuild before investing further in it.
