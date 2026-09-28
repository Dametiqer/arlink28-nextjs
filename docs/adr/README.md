# Architecture decision records

Accepted decisions. Future design work reads these first and doesn't re-open them without new evidence. To reverse a decision, write a new ADR that supersedes the old one rather than editing it.

| ADR | Decision | Status |
|---|---|---|
| [0001](./0001-monorepo-on-cpanel.md) | Monorepo platform on the existing cPanel account (design candidate b) | Superseded by 0004 and 0005, 2026-09-28 |
| [0002](./0002-packages-priced-per-party-per-season.md) | Packages are priced per party per season, not per seat on a departure | Accepted, 2026-09-28 |
| [0003](./0003-package-media-photos-and-embedded-video.md) | Package media: hosted photos, YouTube/Vimeo embedded videos, reusable lodge galleries | Accepted, 2026-09-28 |
| [0004](./0004-single-vps-hosting.md) | Host web, admin, API and database on one VPS with Docker Compose | Accepted, 2026-09-28 |
| [0005](./0005-api-in-dotnet-with-postgres.md) | API in C# (ASP.NET Core, EF Core) on PostgreSQL; TS client generated from OpenAPI | Accepted, 2026-09-28 |
