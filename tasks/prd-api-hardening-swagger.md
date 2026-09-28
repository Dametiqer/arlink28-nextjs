# PRD: API hardening + Swagger (M0.5)

## Introduction

M0 of `docs/packages-api-plan.md` (commit 4b3758b) built the API foundation: Prisma/MySQL schema, shared zod contracts, error filter, `GET /v1/health`, 25 unit + 11 e2e tests. A best-practice review found gaps that should close before M1 adds business endpoints, and the team wants Swagger UI to explore and test the backend. This PRD covers those fixes.

## Goals

- Swagger UI + OpenAPI JSON generated from the existing shared zod schemas (single source of truth — no hand-written duplicate DTOs)
- Every request traceable by a request id through logs and error responses
- Public endpoints protected by rate limiting that works behind cPanel's Apache/Passenger proxy
- Fix the reliability defects found in review
- Lint + CI that runs the e2e suite against **MySQL 8.0** (production's engine family; local dev is MySQL 9.1)

## Project context (read before starting)

- pnpm/Turborepo monorepo. pnpm is NOT on PATH: use `npx --yes pnpm@12.6.0 <cmd>` for every pnpm command.
- Local MySQL: WAMP MySQL 9.1 at `127.0.0.1:3306`, user `root`, no password. Dev DB `arlink28`, e2e DB `arlink28_test` (reset on every e2e run). Do NOT edit WAMP's `my.ini`.
- Copy `packages/db/.env.example` → `packages/db/.env` and `apps/api/.env.example` → `apps/api/.env` in the worktree if missing (they are gitignored).
- `packages/shared` and `packages/db` build to `dist/`; apps import `dist`. Run `npx --yes pnpm@12.6.0 exec turbo run build --filter=@arlink28/api...` before api tests.
- Keep NestJS on v10 (`@nestjs/common@^10`) and zod on v3. Pick library versions compatible with both.
- Scope: `apps/api`, `packages/shared`, `packages/db`, root config, `docs/`. Do not touch `apps/web` or `apps/admin`.
- Existing conventions: error envelope in `packages/shared/src/errors.ts`; `AppError` + `ErrorFilter` in `apps/api/src/common`; `configureApp()` in `apps/api/src/app.setup.ts` is shared by `main.ts` and e2e tests — wire global behaviour there so tests exercise it.
- `docs/*.md` may use CRLF line endings — preserve them when editing.
- **Quality gate for every story:** from the repo root, `npx --yes pnpm@12.6.0 exec turbo run build typecheck test --filter=@arlink28/api... --filter=@arlink28/shared --filter=@arlink28/db` passes AND `cd apps/api && npx jest --selectProjects e2e --runInBand` passes.

## User Stories

### US-001: Fix reliability defects found in review
**Description:** As a maintainer, I want the known latent bugs fixed so failures surface correctly instead of as silent wrong data or misleading 500s.

**Acceptance Criteria:**
- [ ] `ErrorFilter`/`toErrorResponse` recognises zod validation errors without relying solely on `instanceof ZodError` (which silently breaks if two zod copies are ever installed): also accept errors with `name === "ZodError"` and an `issues` array. Unit test with a ZodError-shaped object not created by this zod instance → 422.
- [ ] `toMinor` in `packages/shared/src/money.ts` no longer accepts non-integer JS numbers (today `toMinor(1.005, "USD")` silently returns 100 because of float rounding). Integers and decimal strings still work; non-integer numbers throw `RangeError`. Unit test for `1.005`.
- [ ] Root and `apps/api` `package.json` declare `"engines": { "node": ">=20.12" }` (`process.loadEnvFile` needs 20.12+).
- [ ] Quality gate passes.

### US-002: Request ids and structured logging
**Description:** As an operator, I want every request to carry an id that appears in logs and error responses so a customer's error report can be traced.

**Acceptance Criteria:**
- [ ] Structured JSON logging via `nestjs-pino` (or `pino-http`), pretty-printed only when `NODE_ENV=development`; log level from optional `LOG_LEVEL` env (validated in `config.ts`, default `info`; tests use `silent`).
- [ ] Incoming `X-Request-Id` is reused if it is a safe token (≤ 64 chars, `[A-Za-z0-9._-]`), otherwise a new UUID is generated; the id is returned in the `X-Request-Id` response header.
- [ ] Error envelope gains optional `requestId` (update the shared `ErrorEnvelope` zod schema); `ErrorFilter` fills it. 5xx errors are logged with the request id and stack.
- [ ] `authorization` and `cookie` request headers are redacted in logs.
- [ ] e2e tests: response carries `X-Request-Id`; a supplied valid id is echoed; an unsafe id is replaced; a 404 body includes the same `requestId` as the header.
- [ ] `apps/api/.env.example` documents `LOG_LEVEL`. Quality gate passes.

### US-003: Rate limiting behind the cPanel proxy
**Description:** As the business, I want the public API throttled per client IP so scraping or abuse can't exhaust the shared cPanel host.

**Acceptance Criteria:**
- [ ] `@nestjs/throttler` (version compatible with Nest 10) applied globally; limits from env `RATE_LIMIT_TTL_MS` (default 60000) and `RATE_LIMIT_MAX` (default 120), validated in `config.ts`.
- [ ] `GET /v1/health` is exempt (`@SkipThrottle`).
- [ ] Throttled requests return 429 with the shared envelope, `code: "RATE_LIMITED"`, and a `Retry-After` header.
- [ ] New env `TRUST_PROXY` (default `false`; accepts `true`/`false`/hop count) applied via Express `trust proxy` so the client IP is the real one behind Apache/Passenger — documented in `.env.example` and `docs/instructions.md` (production should set `1`).
- [ ] e2e test boots the app with a low limit (e.g. max 3) and asserts the 4th request gets 429 + `RATE_LIMITED` + `Retry-After`, while health is never throttled.
- [ ] Quality gate passes.

### US-004: Swagger UI and OpenAPI generated from shared zod schemas
**Description:** As a developer, I want Swagger UI at `/docs` to explore and call the API, generated from the same zod schemas web/admin use.

**Acceptance Criteria:**
- [ ] `@nestjs/swagger` (Nest-10-compatible) plus a zod→OpenAPI bridge (`nestjs-zod` or `@asteasolutions/zod-to-openapi`) so request/response docs come from zod schemas in `packages/shared` — no hand-written duplicate class-validator DTOs. If `nestjs-zod` is adopted, its validation pipe may replace `ZodPipe`, but zod errors must still render as the shared 422 envelope (existing tests stay green).
- [ ] Swagger UI served at `/docs`, raw spec at `/docs/openapi.json`. Title "ARLink28 API", version from `apps/api/package.json`, server URL `/`.
- [ ] Enabled when `NODE_ENV !== "production"` or env `SWAGGER_ENABLED=true` (validated in `config.ts`); disabled (404) in production by default.
- [ ] Helmet's CSP is relaxed only for `/docs` routes (Swagger UI needs inline scripts/styles); all other routes keep helmet defaults. Verify the UI loads in a browser or by fetching the HTML + asset URLs without CSP blocking.
- [ ] `GET /v1/health` is documented with its 200 and 503 response schemas (add a `HealthResponse` zod schema to `packages/shared`), and the shared `ErrorEnvelope` is registered as a reusable component used for default error responses.
- [ ] e2e tests: `/docs/openapi.json` is 200, is OpenAPI 3.x, and contains path `/v1/health`; with `NODE_ENV=production` and no `SWAGGER_ENABLED`, `/docs` is 404; a non-docs route still has a strict CSP header.
- [ ] `docs/instructions.md` gains a "Testing with Swagger" section (URL `http://localhost:3001/docs`, how to enable in other environments). Quality gate passes.

### US-005: Lint and format
**Description:** As a team, we want consistent, statically checked code.

**Acceptance Criteria:**
- [ ] ESLint 9 flat config with `typescript-eslint` (type-aware rules on `apps/api/src`, including `@typescript-eslint/no-floating-promises` and `no-misused-promises`) and Prettier config at repo root; Prettier settings match the existing code style (double quotes, semicolons, 2-space indent, trailing commas, print width ~120).
- [ ] `lint` scripts in `apps/api`, `packages/shared`, `packages/db`; `npx --yes pnpm@12.6.0 exec turbo run lint --filter=@arlink28/api... --filter=@arlink28/shared --filter=@arlink28/db` passes with zero errors (fix violations rather than disabling rules; any disable needs an inline justification).
- [ ] Root `format` / `format:check` scripts scoped to `apps/api packages docs/packages-api-plan.md tasks` (not `apps/web`).
- [ ] Quality gate passes.

### US-006: CI pipeline with MySQL 8.0
**Description:** As a team, we want every push and PR to build, lint and run unit + e2e tests against MySQL 8.0 so we catch 9.1-vs-8.0 differences before cPanel does.

**Acceptance Criteria:**
- [ ] `.github/workflows/api-ci.yml` runs on push and pull_request to `develop` and `main` with path filters for `apps/api/**`, `packages/**`, root config and lockfile.
- [ ] Uses Node 20 (lowest supported), pnpm 12.6.0 via `pnpm/action-setup`, cached pnpm store, `pnpm install --frozen-lockfile`.
- [ ] Runs build, typecheck, lint, unit tests, then e2e with a `mysql:8.0` service container (root password set, health-checked) and `TEST_DATABASE_URL`/`DATABASE_URL` pointing at it; `sql_mode` left at MySQL 8.0's strict default.
- [ ] Workflow YAML is valid (check with `npx --yes @action-validator/cli` or equivalent if available; otherwise careful review) — it cannot be run from this machine, so note that in the story notes.
- [ ] Quality gate passes.

### US-007: Document the review outcome
**Description:** As the team, we want the docs to reflect what changed.

**Acceptance Criteria:**
- [ ] `docs/packages-api-plan.md` gets an "M0.5 — hardening" row in the delivery table marked done, listing: Swagger, request ids/logging, rate limiting, lint, CI, reliability fixes.
- [ ] `docs/memory.md` gets a dated 2026-09-28 entry summarising US-001..US-006 and anything left open.
- [ ] Full quality gate passes one final time.

## Non-Goals

- No business endpoints (packages, quotes) — that's M1.
- No authentication (staff auth is a separate phase); Swagger gets no auth config yet.
- No changes to `apps/web`, `apps/admin`, or WAMP configuration.
- No Prisma 6 upgrade.

## Technical Considerations

- Accepted trade-off (no action): UUIDs are `CHAR(36)` in a utf8mb4 table (144-byte keys). Fine at catalogue scale; revisit only if tables reach millions of rows.
- Supertest-based e2e tests must go through `configureApp()` so Swagger, CSP, throttling and request ids are all exercised as in production.
