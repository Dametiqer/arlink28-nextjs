# .NET API plan (C# + PostgreSQL on one VPS)

This plan implements [ADR 0004](./adr/0004-single-vps-hosting.md) (one VPS) and [ADR 0005](./adr/0005-api-in-dotnet-with-postgres.md) (ASP.NET Core on PostgreSQL).

The domain doesn't change. [`packages-api-plan.md`](./packages-api-plan.md) §1–§5 (model, invariants, routes) and ADRs 0002 and 0003 still apply. Only the implementation moves.

## 1. Layout

The .NET solution lives in `backend/` next to the pnpm workspace. The web and admin apps are unchanged.

```text
backend/
  ARLink28.slnx
  Directory.Build.props         net10.0, nullable, warnings-as-errors, analyzers
  Directory.Packages.props      central package versions
  src/
    ARLink28.Domain/            pure: Money, Currency, Season/Rate, Quote, FromPrice, PublishRules, VideoRef
    ARLink28.Data/              EF Core DbContext, entity configs, migrations, seed (poster data)
    ARLink28.Api/               Minimal API endpoints /v1, OpenAPI, ProblemDetails, rate limits, health
    ARLink28.Worker/            BackgroundService host: image variants, fromPrice recompute, orphan sweep
  tests/
    ARLink28.Domain.Tests/      ports packages/shared pricing + media specs case for case
    ARLink28.Api.Tests/         WebApplicationFactory + Testcontainers PostgreSQL; ports the e2e suite
packages/api-client/            TypeScript types generated from /openapi/v1.json (openapi-typescript)
deploy/
  compose.yaml  Caddyfile  backup.sh  .env.example
```

Dependencies point inward: `Api → Data → Domain` and `Worker → Data → Domain`. `Domain` references nothing, and an architecture test enforces this.

## 2. Mapping from the TypeScript implementation

| TypeScript (reference until parity) | .NET |
|---|---|
| `packages/db/prisma/schema.prisma` + MySQL migrations | `ARLink28.Data` entity configs + EF migrations (PostgreSQL) |
| MySQL `CHECK`s | Same CHECKs, plus a partial unique index for one `HERO` per package, and an exclusion constraint (`btree_gist`) on a trigger-maintained `package_rate_windows(package_id, currency, daterange)` table, because an exclusion constraint can't span rates → seasons → ranges. The service still returns a friendly 422 first, and the database is the backstop |
| `SeasonRange(startDate, endDate)` rows | Kept as rows (admin-friendly). The trigger flattens them into `package_rate_windows` on insert or update of a range or rate |
| `packages/shared` `quote()`, `fromPrice()`, `upcomingSeasons()` | `ARLink28.Domain.Pricing`, pure static functions with `long` minor units |
| `parseVideoUrl()` / `videoEmbedUrl()` | `ARLink28.Domain.Media.VideoRef` |
| zod request schemas | Typed binding + .NET 10 built-in Minimal API validation. 422 for validation failures (kept from the TS API) |
| `{ error: { code, message, details, requestId } }` | RFC 9457 Problem Details: `type`, `title`, `status`, `detail`, plus `code`, `errors` and `traceId` extensions |
| nestjs-pino + `X-Request-Id` | Structured JSON console logging, `X-Request-Id` echoed, W3C trace id in logs |
| `@nestjs/throttler` | `Microsoft.AspNetCore.RateLimiting` (fixed window per IP, `429` + `Retry-After`) |
| Swagger at `/docs` | `/openapi/v1.json` (built-in) + Scalar UI at `/docs`, disabled in Production |
| Injectable `CLOCK` | `TimeProvider` (built-in); tests use `FakeTimeProvider` pinned to 2026-09-28 |
| Keyset cursor (base64 of `sortOrder`, `id`) | Same opaque cursor format |
| `seedCatalogue()` (idempotent upsert) | `ARLink28.Data.Seed`, run by `dotnet run --project src/ARLink28.Api -- seed`; same 13 packages, same 3 drafts |

## 3. Milestones

Each milestone ships on its own branch with green CI. **"Parity"** means the ported cases from `apps/api/test/*.e2e-spec.ts` and `packages/shared/src/**/*.spec.ts` pass against .NET.

| Milestone | Scope | Done when |
|---|---|---|
| **D0 — Foundation** (≈2–3 days) | Solution + central packages; `deploy/compose.yaml` running Postgres 18 for local dev; EF model for the full catalogue including `package_media` and `property_media`; first migration with all CHECKs, the exclusion constraint and the partial unique index; Domain money + pricing ported with all shared tests; `/v1/health` (DB ping); Problem Details; request id + JSON logs; rate limiting; OpenAPI + Scalar; GitHub Actions `backend-ci.yml` (build, `dotnet format --verify-no-changes`, unit + integration via Testcontainers) | Pricing tests pass case for case; a DB test proves each constraint rejects bad rows; CI green |
| **D1 — Seed + public read parity** (≈2–3 days) | Port the poster seed (13 packages, 3 DRAFT with notes); `GET /v1/packages`, `/{slug}`, `/{slug}/quote`, `/v1/destinations`, `/v1/partners`, including card `hero`, detail `media` and lodge `media` | Every case in `catalogue.e2e-spec.ts` and `schema.e2e-spec.ts` passes on .NET, including Grand Escape = 848,800 cents for 2026-11-10 |
| **D2 — Client + cutover** (≈1 day) | `packages/api-client` generated from the OpenAPI doc; CI drift check; delete `apps/api`, `packages/db`, pricing and contracts in `packages/shared`, and `api-ci.yml`; update `docs/instructions.md` and `architecture.md` | `pnpm typecheck` passes for web and admin against the generated client; the repo builds with no Node backend |
| **D3 — VPS baseline** (≈1–2 days) | Provision the VPS (ADR 0004): Compose stack, Caddy TLS, firewall, SSH keys, unattended upgrades, nightly `pg_dump` + `/media` to off-site storage, a rehearsed restore, deploy script (build images in CI, pull + `compose up -d` on the server) | Public `/v1/packages` over HTTPS on the real domain; a backup restored into a scratch database matches row counts |

After D3, the original roadmap continues in .NET:

- **M2:** the web app reads from the API.
- **Staff auth:** TOTP. It's a prerequisite for any admin write.
- **M3:** the admin write API.
- **M4:** media uploads, with NetVips variants in the worker.
- **M5:** the admin UI.

## 4. Local development

- **.NET 10 SDK.** The machine has 7 and 9 today, so install 10 with `winget install Microsoft.DotNet.SDK.10`.
- **Docker Desktop.** Already installed (28.4). It runs Postgres for development and Testcontainers for tests.
- **Postgres from Compose, not the local install.** The PostgreSQL 13 and 18 installs under `C:\Program Files\PostgreSQL` aren't used by the project. Compose pins the version, so every machine and CI use the same one.

## 5. Open questions

| # | Question | Default if unanswered |
|---|---|---|
| D-Q1 | Which VPS provider and region? Customers are mostly in Nigeria and Kenya, with some in the UK. | **Hetzner (Falkenstein/Helsinki) or DigitalOcean London.** Europe gives the best latency across Lagos, Nairobi and the UK at this price. A CDN can come later |
| D-Q2 | Who owns server operations (patching, alerts)? | **The owner**, with an uptime check (e.g. UptimeRobot) on `/v1/health` e-mailing on failure |
| D-Q3 | Should the admin app stay a static export? | **Yes.** Caddy serves it, and it calls the API with a staff session |
