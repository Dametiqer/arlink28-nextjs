# 0001. Monorepo platform on the existing cPanel account

- **Status:** Accepted, 2026-09-28
- **Design:** `arlink-static-web/docs/design/arlink28-platform/` (`design.json`, `DESIGN.md`; published as the "System design report" artifact). This is candidate **b**.

## Context

ARLink28 needed a real platform: package sales with online payment (NGN, KES, USD, GBP), an admin dashboard, a versioned API that other clients can use later, transactional email, and a relational system of record. The earlier setup was a hand-patched static export with Web3Forms and Mailchimp scripts pasted into individual pages. See `docs/architecture.md`.

The binding forces:

- **Hosting.** The owner chose to host everything on the existing shared cPanel account. It offers Node.js through Passenger and MySQL, but no PostgreSQL, no CDN and no object storage. The owner confirmed on 2026-09-28 that production runs MySQL, not MariaDB.
- **Load isn't a constraint.** Writes peak at about 0.023 per second even at 10× growth, roughly 700× under the point where one database stops being enough. So one MySQL database, with no queues or sagas, meets the load.
- **Correctness is.** About $216k of margin per quarter depends on payment intake, so the payment path must not share a process with the customer website.

Rejected candidates:

- **a — one full-stack Next.js app.** The site, admin and API would share one process and deploy together, so a site deploy could restart the payment path. The owner also asked for separate package, booking, payment and customer APIs.
- **c — API and database on a VPS.** It adds cost and needs someone to run a Linux server, while the owner decided on all-cPanel. It stays the documented fallback if the host limits cron to every 5+ minutes, can't fit two Node apps in its memory limit, or can't copy backups off-site.

This ADR supersedes the undecided state of that design. The monorepo migration plan (`docs/monorepo-migration.md`) implements it.

## Decision

We will build ARLink28 as one pnpm/Turborepo monorepo, deployed entirely on the existing cPanel account:

- `apps/web`: the customer site, a Next.js app on Passenger.
- `apps/admin`: a static export that calls the API.
- `apps/api`: a NestJS `/v1` API, with a cron-driven worker from the same codebase.
- `packages/db`: the Prisma schema and migrations.
- `packages/shared`: zod contracts and pure domain logic.
- `packages/emails`.

MySQL (InnoDB) is the single source of truth. Only `apps/api` may access it, through `@arlink28/db`; lint and CI enforce this.

## Consequences

- **Good:** about $0 extra hosting cost. The payment path runs in its own process. There's one versioned API that future clients can use. Every invariant is enforced in one transactional database.
- **Bad:** the shared host is a single failure domain for everything, with no CDN to serve stale pages during an outage.
- **Bad:** background work depends on cPanel cron, so the worker runs at most once a minute and only as often as the host allows.
- **Bad:** backups are hourly dumps, so up to 1 hour of data can be lost (RPO ≤ 1 h).
- **Bad:** bandwidth is limited by the hosting plan's quota.
- **To watch:** the host limits (cron interval, memory, Node version, backups) are still partly unverified. They're the triggers for moving to candidate c.
