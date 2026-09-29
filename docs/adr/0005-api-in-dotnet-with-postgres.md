# 0005. Build the API in C# (ASP.NET Core) on PostgreSQL

- **Status:** Accepted, 2026-09-28
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
