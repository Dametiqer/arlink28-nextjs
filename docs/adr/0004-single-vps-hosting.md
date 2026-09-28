# 0004. Host web, admin, API and database on one VPS

- **Status:** Accepted, 2026-09-28
- **Supersedes:** [ADR 0001](./0001-monorepo-on-cpanel.md) (hosting on the shared cPanel account). ADR 0001 named this move, candidate **c**, as its documented fallback.
- **Enables:** [ADR 0005](./0005-api-in-dotnet-with-postgres.md).

## Context

The cPanel account offers only Node.js (through Passenger) and MySQL. It has no PostgreSQL, no .NET, no Docker and no `ffmpeg`, cron runs at most once a minute, and backups are hourly at best. ADR 0001 accepted those limits to keep hosting at about $0.

The owner has now chosen to pay for a VPS, both to lift those limits and to allow a C# API on PostgreSQL (ADR 0005). Load still isn't a constraint: writes peak at about 0.023 per second even at 10× growth, so one machine is enough.

## Decision

Run everything on **one Linux VPS**: Ubuntu 24.04 LTS, 4 GB RAM or more, for example a Hetzner CX32 or DigitalOcean at about $10–25 a month. Docker Compose runs one container per concern:

| Container | Role |
|---|---|
| `caddy` | TLS (automatic HTTPS), reverse proxy, static admin build and `/media` files |
| `web` | Next.js customer site |
| `api` | ASP.NET Core `/v1` API, the only process that talks to the database |
| `worker` | Background jobs (image variants, recomputes, e-mail). It's a long-running process, so no cron is needed |
| `postgres` | PostgreSQL 18. Its port isn't published, so only the internal Docker network can reach it |

- **The payment path stays isolated.** Web, API and worker are separate containers, so a web deploy can't restart the API. This keeps ADR 0001's core rule.
- **Backups leave the machine.** A nightly `pg_dump`, plus the `/media` directory, goes to off-site object storage (for example Backblaze B2) with retention. A restore is rehearsed before launch.
- **Baseline hardening:**
  - The firewall allows only 22, 80 and 443.
  - SSH uses keys only.
  - Unattended security upgrades are on.
  - Secrets live in an env file readable only by root, not in the repo.

## Consequences

- **Good:** we control the whole runtime (PostgreSQL, .NET, Docker, a real worker process), and deploys are reproducible from `compose.yaml`.
- **Good:** the RPO improves to whatever we schedule, with no host quota on cron or memory.
- **Bad:** we now operate a server: OS patches, disk space, monitoring and certificates (Caddy automates the certificates). Someone owns this.
- **Bad:** it's still one failure domain for everything. There's no CDN yet, so an outage takes the site down with the API. Adding a CDN in front of Caddy later is cheap.
- **Bad:** it costs about $10–25 a month plus backup storage, against about $0 before.
