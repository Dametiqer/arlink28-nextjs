# ARLink28 — Docs (arlink28-nextjs)

Living documentation for this repo. Organized by category; each file grows independently as the project evolves.

**This repo (`arlink28-nextjs`) is a from-scratch TypeScript/Next.js 14 reconstruction of the ARLink28 marketing site**, distinct from the two other repos this project has:

- `ARlinkII8` (`airlinks-nextjs`) — the original plain-JS Next.js source. Appears superseded by this repo; not otherwise touched by this audit.
- `arlink-static-web` — the **deployed** static export (HTML/CSS/JS/images) actually served from cPanel, hand-patched directly for live behavior (Web3Forms, Mailchimp, booking-widget routing). Has its own `docs/` with the same category files, plus the system-design artifact for the target platform (`docs/design/arlink28-platform/`, also published at a Claude.ai artifact link — see that repo's `memory.md` for the URL).

This repo does **not** yet reproduce the live site's real backend integrations — see [`architecture.md`](./architecture.md) for what that means. The system-design work for the *target* platform (payments, MySQL, admin dashboard, etc.) lives only in `arlink-static-web`'s `docs/design/`; it is not duplicated here to avoid the two copies drifting out of sync. If you're looking for that, go there.

- [`architecture.md`](./architecture.md) — stack, what is and isn't wired up, and how this repo relates to the other two
- [`design.md`](./design.md) — design tokens, typography, and reusable UI components
- [`instructions.md`](./instructions.md) — how to set up, run, and build the project
- [`memory.md`](./memory.md) — project state, decisions, and known gaps (the "why" behind current choices)
- [`security.md`](./security.md) — security findings, exposure notes, and hardening recommendations
- [`monorepo-migration.md`](./monorepo-migration.md) — phased plan (Phase 1 done 2026-09-25) that converted this repo into the pnpm/Turborepo monorepo root (`apps/web`, `apps/admin`, `apps/api`, `packages/db`, `packages/shared`, `packages/emails`) per the target-platform design
