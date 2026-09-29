# 0005. Build the API in C# (ASP.NET Core) on PostgreSQL

- **Status:** Accepted, 2026-09-28. Amended 2026-09-29 (see [Amendment](#amendment-2026-09-29)).
- **Supersedes:**
  - ADR 0001's `apps/api` (NestJS), `packages/db` (Prisma on MySQL) and the shared-zod contract model.
  - The web and admin apps stay Next.js/TypeScript.
- **Keeps:**
  - [ADR 0002](./0002-packages-priced-per-party-per-season.md) (pricing model).
  - [ADR 0003](./0003-package-media-photos-and-embedded-video.md) (media model).
  - The domain design in [`packages-api-plan.md`](../packages-api-plan.md).
- **Plan:** [`dotnet-api-plan.md`](../dotnet-api-plan.md).
- **Depends on:** [ADR 0004](./0004-single-vps-hosting.md). cPanel could run neither .NET nor PostgreSQL.

## Context

The TypeScript API had reached M1 plus media: 13 seeded packages, the public read and quote endpoints, 178 tests, and CI on MySQL 8.0. The owner chose to build the backend in C# on PostgreSQL once the move to a VPS removed the hosting constraint.

**What PostgreSQL adds for this domain.** It can enforce two rules that MySQL leaves to application code:

- An exclusion constraint on `daterange` can say that no two same-currency seasons on a package overlap. The rule spans rates, seasons and ranges, and an exclusion constraint only covers one table. So a trigger keeps a flattened `package_rate_windows` table of (package, currency, range) rows for the constraint to check.
- A partial unique index can say that a package has exactly one `HERO` photo.

It also has transactional DDL, so a failed migration can't leave the schema half-applied.

**What C# costs.** The web, admin and API no longer compile against one zod package. We also have to regain about 1–2 weeks of finished work.

## Decision

- **Runtime and framework:** .NET 10 LTS with ASP.NET Core Minimal APIs, grouped under `/v1`.
- **Data access:** EF Core 10 with Npgsql on PostgreSQL 18.
  - Constraints EF can't model go in as raw SQL inside EF migrations: the CHECKs, and the `package_rate_windows` trigger plus its exclusion constraint (via `btree_gist`).
- **Data formats:**
  - Money is `bigint` minor units plus an ISO currency code.
  - Ids are UUIDv7, from `Guid.CreateVersion7()`, stored as `uuid`.
  - Dates are `date`, read as `DateOnly`.
- **Domain logic:** a pure `ARLink28.Domain` project (pricing, quote, publish rules) with no EF or HTTP dependencies. The existing pricing tests are ported case for case.
- **Contracts:** the API's OpenAPI document is the source of truth.
  - The web and admin apps consume a TypeScript client generated from it (`openapi-typescript` into `packages/api-client`).
  - CI fails if the generated client drifts from the spec.
  - Pricing lives only in C#. The web app shows prices from `/quote` and card `fromPrice`, and never computes them.
- **Errors:** RFC 9457 Problem Details with a stable `code` extension, such as `NO_RATE_FOR_DATE`, and the request's `traceId`. This replaces the custom envelope, which no client consumed yet.
- **Platform concerns:**
  - Rate limiting and health checks use the built-in ASP.NET Core middleware.
  - Logs are structured JSON with request ids.
- **Testing:** xUnit with `WebApplicationFactory` and Testcontainers PostgreSQL, so every test run uses a real PostgreSQL 18.
  - The TypeScript e2e suite becomes the parity checklist. For example, the Grand Escape must quote exactly US$8,488 for a 2026-11-10 check-in.
- **Image variants:** NetVips (libvips), not ImageSharp. ImageSharp's Split License requires a paid licence above US$1M annual revenue.

## Consequences

- **Good:** the database enforces the season-overlap and single-hero rules, not just the service.
- **Good:** one strongly typed backend, with first-class OpenAPI, rate limiting and background services in the framework.
- **Good:** pricing exists in exactly one place.
- **Bad:** two toolchains (pnpm/Node for the web, dotnet for the API) in CI and on developer machines.
- **Bad:** contract safety moves from compile-time sharing to codegen plus a CI drift check. A forgotten regeneration is caught in CI, not in the editor.
- **Bad:** it costs about 1–2 weeks to regain the NestJS work. That code stays in the repo as the reference implementation until the .NET API passes the parity checklist, then it's deleted (`apps/api`, `packages/db`, and pricing in `packages/shared`).

## Amendment (2026-09-29)

The TypeScript reference implementation was deleted **before** parity, not after: `apps/api`, `packages/db`, the pricing code and specs in `packages/shared`, and `api-ci.yml`. The owner removed it on that date.

- **The parity checklist is unchanged**, but it's now read from git history rather than the working tree. Commit `a925948` is the last one containing all of it, for example `git show a925948:apps/api/test/catalogue.e2e-spec.ts` and `git show a925948:packages/shared/src/catalogue/pricing.spec.ts`.
- **Cost:** the old API can no longer be run side by side with the new one to compare responses. Where a spec is ambiguous, check out `a925948` in a separate worktree and run it there.
- The zod contracts in `packages/shared` stay until new code has moved to the generated `packages/api-client` (added 2026-09-29).

**Where the built API differs from this ADR (recorded 2026-09-29, not yet decided either way):**

- **Location:** the API is in its own repo, `arlink28-api`, not in `backend/` here. `packages/api-client` therefore works from a committed `openapi.json` snapshot, and its CI drift check only compares that snapshot with the generated types; it can't see changes in the API repo until someone runs `sync`.
- **Errors:** the API answers with its own envelope, `{ success, message, data }` (plus `code` on 422 quote errors), not RFC 9457 Problem Details. Only ASP.NET's automatic validation failures come back as Problem Details. `apps/web` handles both.
- **Spec gaps:** controllers return `ApiResponse<object>`, so the spec has no response bodies; 204 endpoints are documented as 200; enums show as integers although the API uses names (Swashbuckle reads System.Text.Json settings, the app uses Newtonsoft). The web app hand-writes response types until the API declares them.
