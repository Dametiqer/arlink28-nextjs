# Packages API — Implementation Plan

> **Status:** proposal, 2026-09-28. Nothing in this doc is built yet. It covers the package catalogue: data model, public and admin API, pricing, and how it plugs into `apps/api`, `packages/db` and `packages/shared`. Bookings and payments (Phase 4 of [`monorepo-migration.md`](./monorepo-migration.md)) are out of scope. This doc only notes where the package model constrains them.
>
> **Inputs:** the 17 package posters in `Company docs/Packages/` (Giraffe Manor and Safari Collection lines), and `arlink-static-web`'s `docs/design/arlink28-platform/DESIGN.md` (the target platform design: MySQL on cPanel, NestJS `/v1` API, Prisma, UUIDv7, integer minor-unit money).

## 1. What the posters tell us (and where DESIGN.md doesn't fit)

DESIGN.md models a package as a trip product with **dated departures that have seat capacity** (`departures`, `departure_prices`, `seats_held + seats_confirmed ≤ capacity`). The real products don't work that way:

| What the posters show                                       | Example                                                                                                                | Consequence for the model                                                                                                                                                     |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Fixed party composition, priced per party**               | "2 Adults — US$8,488 per couple"; "2 Adults + 3 Children — US$11,809 per family"                                       | Price belongs to the package as a whole, not to a seat. `adults` and `children` are package attributes.                                                                       |
| **Season windows, not departure dates**                     | "Savings Season: 6 Jan–31 May 2026, 1 Nov–15 Dec 2026"; "Season Dates: 1–5 Jan, 1 Jun–31 Oct, 16–31 Dec 2026"          | The customer picks a check-in date inside a window. A season is a named set of date ranges and can be shared across packages.                                                 |
| **Same stay, different price by season**                    | Safari Collection posters: savings vs peak                                                                             | Rates are keyed by (package, season, currency).                                                                                                                               |
| **Fixed nights plus a minimum stay, with a "FROM" price**   | "3 Nights / 4 Days … FROM US$8,488 … Minimum stay: 3 nights"                                                           | `nights` (what the headline price buys) and `min_nights` are separate. "FROM" suggests extra nights may be sold (open question Q3).                                           |
| **Multi-property itineraries**                              | "5 Nights at Sala's Camp • 5 Nights at Sasaab"                                                                         | Ordered `package_stays` rows, each pointing at a property.                                                                                                                    |
| **Repeated, icon-led inclusion lists in distinct sections** | Includes / Added Premium Services / Accommodation Highlights / Vehicle Use / Excludes, each item with an icon          | A reusable **feature library** (label and icon) plus a per-package join that carries the section and sort order. "All meals" and "House wines" appear on nearly every poster. |
| **Priced add-ons**                                          | "Private exclusive vehicle … extra charge of $490 per day"                                                             | `add_ons` with a pricing unit (per day, per stay, per person).                                                                                                                |
| **Perks and footnotes**                                     | "Eligibility for complimentary retreat day pass and 30% off…"; "*Subject to applicable collection and departure times" | Free-text `PERK` and `NOTE` feature sections.                                                                                                                                 |
| **Partner co-branding**                                     | "Giraffe Manor × ARLink28 — An exclusive partnership"                                                                  | `partners` table (logo, tagline) → `properties` → packages.                                                                                                                   |
| **All prices in USD**                                       | every poster                                                                                                           | USD is the authoritative price list. How NGN/KES/GBP are shown is open question Q2.                                                                                           |

**Availability is lodge inventory that the partner confirms, not seats we own.** Nothing on the posters implies ARLink28 holds a room allotment. This is the one finding that affects the wider platform design: the `departures` seat-hold model in DESIGN.md probably becomes **request-to-book** (see Q1). The package API below works either way. It exposes seasons and quotes, and never promises availability.

## 2. Architecture

The shape doesn't change: NestJS API → Prisma → MySQL (InnoDB, utf8mb4), shared zod contracts, and Next.js web and admin as clients.

```text
apps/web  ──GET /v1/packages*──►┐           (ISR 5 min + on-demand revalidate on publish)
apps/admin ─/v1/admin/packages*─►│  apps/api (NestJS)
                                 │   modules/catalog   ← public read + quote
                                 │   modules/admin/catalog ← CRUD, publish, media
                                 │   common/ (prisma, zod pipe, errors, money, ids)
                                 ▼
                      packages/db (Prisma schema + migrations) ──► MySQL 8 / MariaDB 10.6+
packages/shared: zod schemas + inferred TS types + money helpers, imported by all three apps
```

### Decisions (defaults I'll build unless you say otherwise)

| #   | Decision                                                                                                                                  | Why                                                                                                                                                                                                                          |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1  | **Validation uses zod schemas in `packages/shared`** and a `ZodValidationPipe` in Nest, not class-validator DTOs                          | One contract shared by web, admin and API, which is what `packages/shared` exists for. The response types are the same zod-inferred types, so the admin forms can't drift from the API.                                      |
| D2  | **IDs are UUIDv7 stored as `CHAR(36)`**, generated in the app                                                                             | Matches DESIGN.md. Time-ordered, so it's InnoDB-friendly. `BINARY(16)` saves space we don't need at 200 packages and makes Prisma and debugging awkward.                                                                     |
| D3  | **Money is `BIGINT` minor units plus a `CHAR(3)` ISO currency**, and never floats                                                         | `INT` overflows for NGN: ₦50M = 5,000,000,000 kobo, which is more than 2³¹. Prisma returns `bigint`, so the API serialises it as a JSON number (all realistic values are below 2⁵³) through one mapper in `common/money.ts`. |
| D4  | **Optimistic concurrency uses an integer `version` column**, and the admin sends `If-Match: <version>`                                    | DESIGN.md says to use `updated_at`, but an int is exact, whereas two edits in the same millisecond collide on a timestamp. A stale version returns 409.                                                                      |
| D5  | **Child collections are written with replace-all `PUT`s** (`/stays`, `/features`, `/rates`, `/add-ons`), each in one transaction          | The admin edits these as ordered lists. Replacing the whole list avoids per-item endpoints, sort-key bookkeeping and half-saved states.                                                                                      |
| D6  | **Pricing is a pure function** (`pricing.ts`: package, rates, seasons, request → breakdown) with no database access, and it's unit-tested | This is where the money bugs would live, so it needs to be testable without MySQL. Bookings (Phase 4) reuse it to snapshot the price.                                                                                        |
| D7  | **The slug is immutable once published**, and archiving replaces deleting after publish                                                   | DESIGN.md invariant: shared links and SEO never break.                                                                                                                                                                       |
| D8  | **Descriptions are Markdown on write, rendered and sanitised on read in the web app**                                                     | Safer than storing HTML. Admin gets a simple editor.                                                                                                                                                                         |
| D9  | **Every admin write goes to `audit_log`** (actor, action, entity, before/after JSON)                                                      | This table is already in DESIGN.md. Price changes need a paper trail.                                                                                                                                                        |

## 3. Data model (Prisma sketch for `packages/db/prisma/schema.prisma`)

```prisma
enum PackageStatus   { DRAFT PUBLISHED ARCHIVED }
enum PricingBasis    { PER_PARTY PER_PERSON }
enum FeatureSection  { INCLUDED PREMIUM_SERVICE HIGHLIGHT VEHICLE PERK EXCLUDED NOTE }
enum AddOnUnit       { PER_STAY PER_NIGHT PER_DAY PER_PERSON }
enum MediaRole       { HERO GALLERY POSTER }
enum VideoProvider   { YOUTUBE VIMEO }       // ADR 0003: videos are embedded, never stored on cPanel

model Destination {            // Nairobi, Masai Mara, Laikipia, Zanzibar
  id       String @id @db.Char(36)
  slug     String @unique @db.VarChar(80)
  name     String @db.VarChar(120)
  country  String @db.Char(2)
  properties Property[]
  packages   Package[]
}

model Partner {                // Giraffe Manor / The Safari Collection
  id        String @id @db.Char(36)
  slug      String @unique @db.VarChar(80)
  name      String @db.VarChar(120)
  tagline   String? @db.VarChar(200)   // "An exclusive partnership. Extraordinary experiences."
  logoPath  String? @db.VarChar(255)
  properties Property[]
  seasons    Season[]
}

model Property {               // Giraffe Manor, Sala's Camp, Sasaab
  id            String @id @db.Char(36)
  slug          String @unique @db.VarChar(80)
  name          String @db.VarChar(120)
  partnerId     String @db.Char(36)
  destinationId String @db.Char(36)
  partner       Partner     @relation(fields: [partnerId], references: [id])
  destination   Destination @relation(fields: [destinationId], references: [id])
  stays         PackageStay[]
  media         PropertyMedia[]   // the lodge's own gallery, shown on every package staying there
}

model Package {
  id              String        @id @db.Char(36)
  slug            String        @unique @db.VarChar(120)
  status          PackageStatus @default(DRAFT)
  title           String        @db.VarChar(160)  // "Giraffe Manor Grand Escape"
  subtitle        String?       @db.VarChar(200)  // "10-Night Premium Long-Stay Safari for Two Adults"
  summary         String        @db.VarChar(500)  // card blurb
  description     String?       @db.Text          // markdown
  category        String        @db.VarChar(40)   // SAFARI | BEACH | CITY | FAMILY … (lookup later if needed)
  destinationId   String        @db.Char(36)      // primary destination, for filtering
  nights          Int           @db.SmallInt      // nights the headline price buys
  minNights       Int           @db.SmallInt
  adults          Int           @db.TinyInt
  children        Int           @default(0) @db.TinyInt
  pricingBasis    PricingBasis  @default(PER_PARTY)
  baseCurrency    String        @default("USD") @db.Char(3)
  fromPriceMinor  BigInt?       // denormalised min active rate, recomputed on every rates/season write
  featured        Boolean       @default(false)
  sortOrder       Int           @default(0)
  seoTitle        String?       @db.VarChar(160)
  seoDescription  String?       @db.VarChar(300)
  version         Int           @default(1)
  publishedAt     DateTime?     @db.DateTime(3)
  createdAt       DateTime      @default(now()) @db.DateTime(3)
  updatedAt       DateTime      @updatedAt @db.DateTime(3)

  destination Destination      @relation(fields: [destinationId], references: [id])
  stays       PackageStay[]
  features    PackageFeature[]
  rates       PackageRate[]
  addOns      PackageAddOn[]
  media       PackageMedia[]

  @@index([status, category])
  @@index([status, destinationId])
  @@index([status, featured, sortOrder])
}

model PackageStay {            // "5 nights at Sala's Camp" — ordered itinerary segments
  id         String @id @db.Char(36)
  packageId  String @db.Char(36)
  propertyId String @db.Char(36)
  nights     Int    @db.SmallInt
  roomType   String? @db.VarChar(120)   // "Keekorok Tent with Pool"
  sortOrder  Int    @db.SmallInt
  package  Package  @relation(fields: [packageId], references: [id], onDelete: Cascade)
  property Property @relation(fields: [propertyId], references: [id])
  @@index([packageId, sortOrder])
}

model Feature {                // reusable library: "All meals" + icon "utensils"
  id    String @id @db.Char(36)
  key   String @unique @db.VarChar(80)
  label String @db.VarChar(160)
  icon  String @db.VarChar(60)          // Font Awesome name, already loaded site-wide
  packageFeatures PackageFeature[]
}

model PackageFeature {
  id          String         @id @db.Char(36)
  packageId   String         @db.Char(36)
  section     FeatureSection
  featureId   String?        @db.Char(36)   // null → free text (perks, notes)
  labelOverride String?      @db.VarChar(300)
  footnote    String?        @db.VarChar(300) // "*Subject to applicable collection and departure times"
  sortOrder   Int            @db.SmallInt
  package Package  @relation(fields: [packageId], references: [id], onDelete: Cascade)
  feature Feature? @relation(fields: [featureId], references: [id])
  @@index([packageId, section, sortOrder])
}

model Season {                 // "Safari Collection Savings 2026"
  id        String  @id @db.Char(36)
  name      String  @db.VarChar(120)
  partnerId String? @db.Char(36)
  partner   Partner? @relation(fields: [partnerId], references: [id])
  ranges    SeasonRange[]
  rates     PackageRate[]
}

model SeasonRange {            // 2026-01-06 → 2026-05-31 (inclusive, check-in dates)
  id        String   @id @db.Char(36)
  seasonId  String   @db.Char(36)
  startDate DateTime @db.Date
  endDate   DateTime @db.Date
  season Season @relation(fields: [seasonId], references: [id], onDelete: Cascade)
  @@index([seasonId, startDate])
}

model PackageRate {
  id                   String  @id @db.Char(36)
  packageId            String  @db.Char(36)
  seasonId             String  @db.Char(36)
  currency             String  @db.Char(3)
  priceMinor           BigInt                 // price for `nights` and the package's party
  extraNightPriceMinor BigInt?                // null → extra nights not sold (Q3)
  package Package @relation(fields: [packageId], references: [id], onDelete: Cascade)
  season  Season  @relation(fields: [seasonId], references: [id])
  @@unique([packageId, seasonId, currency])
}

model PackageAddOn {           // "Private exclusive vehicle", USD 490 PER_DAY
  id          String    @id @db.Char(36)
  packageId   String    @db.Char(36)
  name        String    @db.VarChar(160)
  description String?   @db.VarChar(500)
  unit        AddOnUnit
  currency    String    @db.Char(3)
  priceMinor  BigInt
  sortOrder   Int       @db.SmallInt
  package Package @relation(fields: [packageId], references: [id], onDelete: Cascade)
}

model PackageMedia {           // ADR 0003; photo bytes live on disk under ~/media/packages/{packageId}/
  id            String         @id @db.Char(36)
  packageId     String         @db.Char(36)
  role          MediaRole      @default(GALLERY)
  path          String         @unique @db.VarChar(255)   // the photo; for a video, its thumbnail
  alt           String         @db.VarChar(200)
  caption       String?        @db.VarChar(300)
  width         Int
  height        Int
  videoProvider VideoProvider?                           // set together with videoId (CHECK)
  videoId       String?        @db.VarChar(40)           // YouTube id, or Vimeo "id" / "id:hash" when unlisted
  variantsReady Boolean        @default(false)
  sortKey       String         @db.VarChar(32)           // fractional index, so reordering touches one row
  package Package @relation(fields: [packageId], references: [id], onDelete: Cascade)
  @@index([packageId, role, sortKey])
}
// CHECK: a video is GALLERY only, so HERO and POSTER are always photos.

model PropertyMedia {          // same columns minus role; ~/media/properties/{propertyId}/
  // id, propertyId, path, alt, caption, width, height, videoProvider, videoId, variantsReady, sortKey
  @@index([propertyId, sortKey])
}
```

### Invariants enforced by the service (and by the DB where MySQL can)

1. **Publishing a package requires** a title, summary, `nights ≥ minNights ≥ 1`, `adults ≥ 1`, at least one rate in `baseCurrency` whose season has a range ending in the future, and exactly one `HERO` photo. Otherwise publish returns 422 with a list of what's missing, which the admin UI shows as a checklist.
2. **When stays exist, their nights sum to `nights`.**
3. **The seasons a package's rates reference must not overlap in dates for the same currency.** Otherwise a check-in date has two prices. This is checked on `PUT /rates` and on season-range edits, and each package the season touches is re-validated.
4. **`fromPriceMinor` equals the minimum `priceMinor` in `baseCurrency` across rates with a future range.** It's recomputed in the same transaction as any rate or season write, and by a daily worker job so expired seasons drop out.
5. **Slug format is `^[a-z0-9]+(-[a-z0-9]+)*$`, and it's immutable after `publishedAt` is set.**
6. **Range sanity:** `startDate ≤ endDate` (a `CHECK` constraint added in raw SQL in the migration, since Prisma can't express it).

## 4. API surface

All routes are under `/v1`. Errors use one envelope: `{ "error": { "code": "VALIDATION_FAILED", "message": "…", "details": [...] } }`. Lists are cursor-paginated (`?cursor=&limit=`, where the cursor is opaque base64 of `(sortOrder, id)`).

### Public (anonymous, cached)

| Method & path                                                                        | Purpose                      | Notes                                                                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------ | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET /v1/packages`                                                                   | Package cards                | Filters: `destination`, `category`, `partner`, `adults`, `children`, `featured`. Returns only `PUBLISHED`. `Cache-Control: public, max-age=60, stale-while-revalidate=300`.                                                                                      |
| `GET /v1/packages/{slug}`                                                            | Full package detail          | Stays with property, features grouped by section, seasons with ranges, rates, add-ons, package `media` (HERO, GALLERY photos and videos, POSTER) and each lodge's `media` under its stay. Cards carry the `hero` photo. Unknown or unpublished slug returns 404. |
| `GET /v1/packages/{slug}/quote?checkIn=YYYY-MM-DD&nights=&currency=&addOns=id:qty,…` | Price breakdown for a date   | Calls the pure pricing function. Returns 422 `NO_RATE_FOR_DATE` when no season covers the date and 422 `BELOW_MIN_NIGHTS` when nights are below the minimum. Advisory only, and never a promise of availability.                                                 |
| `GET /v1/destinations`, `GET /v1/partners`                                           | Filter chips and co-branding | Small lookup lists.                                                                                                                                                                                                                                              |

Example `GET /v1/packages/giraffe-manor-grand-escape` (abridged):

```json
{
  "slug": "giraffe-manor-grand-escape",
  "title": "Giraffe Manor Grand Escape",
  "summary": "Step into elegance, where heritage, wildlife and warm hospitality create unforgettable moments.",
  "partner": {
    "slug": "giraffe-manor",
    "name": "Giraffe Manor",
    "tagline": "An exclusive partnership. Extraordinary experiences."
  },
  "nights": 3,
  "minNights": 3,
  "party": { "adults": 2, "children": 0 },
  "pricingBasis": "PER_PARTY",
  "fromPrice": { "amountMinor": 848800, "currency": "USD" },
  "stays": [{ "property": { "slug": "giraffe-manor", "name": "Giraffe Manor" }, "nights": 3 }],
  "features": {
    "INCLUDED": [
      { "label": "All meals", "icon": "utensils" },
      { "label": "VAT", "icon": "receipt" }
    ],
    "PREMIUM_SERVICE": [{ "label": "VIP transfer from home to airport", "icon": "car", "footnote": "if required" }],
    "EXCLUDED": [{ "label": "Champagne", "icon": "champagne-glasses" }]
  },
  "seasons": [
    { "name": "2026", "ranges": [["2026-01-01", "2026-12-31"]], "price": { "amountMinor": 848800, "currency": "USD" } }
  ],
  "addOns": [],
  "media": [
    {
      "role": "HERO",
      "alt": "Giraffe Manor with giraffes on the lawn",
      "caption": null,
      "src": "/media/packages/…/hero-960.webp",
      "srcSet": "…480w, …960w, …1600w",
      "width": 1600,
      "height": 1067,
      "video": null
    },
    {
      "role": "GALLERY",
      "alt": "Breakfast with the giraffes",
      "caption": "Breakfast with the giraffes",
      "src": "/media/packages/…/breakfast-thumb-960.webp",
      "width": 1280,
      "height": 720,
      "video": { "provider": "YOUTUBE", "id": "…", "embedUrl": "https://www.youtube-nocookie.com/embed/…" }
    }
  ]
}
```

### Admin (staff session, role `ADMIN` or `EDITOR`)

| Method & path                                                                                                                                   | Purpose                                                                                                                                       |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET /v1/admin/packages?status=&q=`                                                                                                             | All statuses, search by title or slug                                                                                                         |
| `POST /v1/admin/packages`                                                                                                                       | Create a draft                                                                                                                                |
| `GET /v1/admin/packages/{id}`                                                                                                                   | Full editable aggregate, including `version`                                                                                                  |
| `PATCH /v1/admin/packages/{id}` + `If-Match`                                                                                                    | Update scalar fields (409 on a stale version)                                                                                                 |
| `PUT /v1/admin/packages/{id}/stays` · `/features` · `/rates` · `/add-ons` + `If-Match`                                                          | Replace a child list atomically. Each bumps `version`.                                                                                        |
| `POST /v1/admin/packages/{id}/publish` · `/unpublish` · `/archive`                                                                              | Status transitions. Publish runs the invariant checks and triggers web revalidation.                                                          |
| `POST /v1/admin/packages/{id}/duplicate`                                                                                                        | Clone as a draft. This matters because most posters are variants of one another (2 vs 4 nights, couple vs family).                            |
| `POST /v1/admin/packages/{id}/media` · `POST /v1/admin/properties/{id}/media` (multipart photo, ≤10 MB, JPEG/PNG/WebP sniffed)                  | Write the original (temp file plus rename), insert the row, enqueue a `image.variants` job                                                    |
| `POST /v1/admin/packages/{id}/media/video` · `POST /v1/admin/properties/{id}/media/video` (`{ url, alt, caption? }`, optional thumbnail upload) | `parseVideoUrl()` accepts YouTube or Vimeo links only (422 otherwise). The default thumbnail is fetched from the provider and can be replaced |
| `PATCH /v1/admin/media/{id}` · `DELETE /v1/admin/media/{id}`                                                                                    | Alt text, caption, role, reorder, delete (which queues file deletion)                                                                         |
| `GET/POST/PATCH/DELETE /v1/admin/seasons`, `/features`, `/properties`, `/partners`, `/destinations`                                             | Reference data. Deleting anything still referenced returns 409.                                                                               |

**Publish → web freshness:** the API calls `POST {WEB_URL}/api/revalidate` with a shared secret and the tags `packages` and `package:{slug}`. The web pages also use `revalidate: 300` as a backstop, so a failed revalidation call costs at most 5 minutes of staleness.

## 5. Pricing rules (`apps/api/src/modules/catalog/pricing.ts`)

```text
quote(pkg, rates, seasons, { checkIn, nights = pkg.nights, currency, addOns }):
  nights < pkg.minNights                          → BELOW_MIN_NIGHTS
  rate = rate whose season has a range containing checkIn, in `currency`
         (fallback: baseCurrency + FX, per Q2)    → NO_RATE_FOR_DATE if none
  base   = rate.priceMinor
  extra  = (nights - pkg.nights) × rate.extraNightPriceMinor   (only if nights > pkg.nights; null rate → EXTRA_NIGHTS_NOT_SOLD)
  addOns = Σ unit price × (PER_DAY|PER_NIGHT: nights, PER_PERSON: adults+children, PER_STAY: 1) × qty
  total  = base + extra + addOns     // all BigInt, never floats
  → { lines: [...], total, currency, season: {id, name}, rateId }
```

Rule assumed for Q4: **the check-in date's season prices the whole stay.** This is simple and matches how the posters talk ("valid for check-ins between…").

## 6. Code layout in `apps/api`

```text
apps/api/src/
  main.ts                      // + global ZodValidationPipe, ErrorFilter, /v1 prefix, helmet, CORS (web + admin origins)
  worker.ts                    // + image.variants, catalog.recompute-from-price jobs (Phase 4 jobs table)
  common/
    prisma.service.ts          // one PrismaClient, enableShutdownHooks
    zod.pipe.ts  errors.ts  ids.ts (uuidv7)  money.ts  pagination.ts  audit.ts
  modules/
    catalog/                   // public
      catalog.controller.ts  catalog.service.ts  pricing.ts  pricing.spec.ts  mappers.ts
    admin/
      auth/                    // StaffGuard — see sequencing note below
      catalog/
        packages.controller.ts  packages.service.ts  publish.rules.ts
        media.controller.ts     media.service.ts      (package + lodge galleries, video links)
        reference-data.controller.ts  (seasons, features, properties, partners, destinations)
packages/shared/src/
  catalog/  package.schema.ts  quote.schema.ts  admin-package.schema.ts  (zod + z.infer types)
  money.ts  (formatMoney, toMinor/fromMinor per currency exponent)
packages/db/
  prisma/schema.prisma  prisma/migrations/  prisma/seed.ts   // seed = the 17 posters
```

## 7. Delivery plan (vertical slices, each one shippable and testable)

| Milestone                                      | Scope                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Done when                                                                                                                                                  |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **M0 — Foundation** ✅ done 2026-09-28         | Local WAMP MySQL 9.1 (root, no password; see instructions.md), with SQL kept to MySQL 8.0 features; Prisma models from §3 plus the first migration; `common/` (Prisma service, zod pipe, error filter, ids, money); Jest config; `.env.example`                                                                                                                                                                                                                                                                                                                               | `pnpm --filter @arlink28/db migrate:dev` runs clean on a fresh database; `/v1/health` also pings the database                                              |
| **M0.5 — Hardening** ✅ done 2026-09-28        | Reliability fixes (zod errors recognised by shape, `toMinor` rejects fractional numbers, `engines.node >=20.12`); request ids + structured logging (`X-Request-Id`, `requestId` in the error envelope, nestjs-pino JSON logs with redaction); rate limiting (`@nestjs/throttler`, `RATE_LIMITED` 429 + `Retry-After`, `TRUST_PROXY` for Apache/Passenger); Swagger UI at `/docs` + `/docs/openapi.json` generated from the shared zod schemas; lint (ESLint 9 flat + type-aware typescript-eslint) and Prettier; CI (`.github/workflows/api-ci.yml`) running e2e on MySQL 8.0 | Quality gate green (build, typecheck, lint, format:check, unit + e2e); `/docs` loads with a strict CSP elsewhere; see `tasks/prd-api-hardening-swagger.md` |
| **M1 — Seed + public read** ✅ done 2026-09-28 | Poster seed (`packages/db/src/seed/`: 17 posters → 13 packages, 3 held as DRAFT over contradictory posters, see Q8); migration `season_slug`; pure `quote()`/`fromPrice()` in `packages/shared`; `GET /v1/packages` (filters, keyset cursor), `/{slug}`, `/{slug}/quote`, `/v1/destinations`, `/v1/partners`, all in Swagger with query params generated from zod; injectable clock                                                                                                                                                                                           | Grand Escape quotes exactly US$8,488 for a 2026-11-10 check-in (e2e); 44 shared + 9 db + 40 api unit tests and 53 e2e pass                                 |
| **M2 — Web reads from the API** (≈2 days)      | `apps/web/app/giraffe-manor` and a new `/packages/[slug]` route fetch from the API with ISR; `/api/revalidate` route                                                                                                                                                                                                                                                                                                                                                                                                                                                          | The Giraffe Manor page renders from database data with no hardcoded prices                                                                                 |
| **M3 — Admin write API** (≈4 days)             | CRUD, replace-list `PUT`s, publish rules, duplicate, reference data, audit log, `If-Match`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Integration tests cover the 409 on a stale version, the 422 publish checklist, overlapping-season rejection, and `fromPrice` recompute                     |
| **M4 — Media** (≈3–4 days)                     | Package and lodge galleries (ADR 0003; schema, CHECKs and read contract already landed): multipart photo upload, type sniffing, worker WebP variants with `sharp` (480/960/1600), YouTube/Vimeo link endpoint with provider thumbnail fetch, daily orphan sweep                                                                                                                                                                                                                                                                                                               | An uploaded JPEG gets variants within one cron tick; the page falls back to the original until then                                                        |
| **M5 — Admin UI**                              | `apps/admin` screens on top of M3 and M4                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Separate plan                                                                                                                                              |

**Sequencing constraint:** M3 and M4 must not deploy before staff auth exists. That's Phase 2 in `monorepo-migration.md` (TOTP staff login). Locally, `StaffGuard` accepts a dev-only header when `NODE_ENV=development`, and it **fails closed** in any other environment. So M0–M2 can ship publicly while auth is built in parallel.

## 8. Testing

- **Unit:** `pricing.ts` (seasons, extra nights, add-on units, currency mismatch, BigInt totals) and `publish.rules.ts`.
- **Integration:** supertest against the Docker MySQL. Each test file uses a fresh schema via `prisma migrate reset --force` once, then runs each test in a transaction that's rolled back.
- **Contract:** the API response mappers `parse()` through the shared zod schemas in tests, so a response that doesn't match the contract fails CI.
- **Acceptance fixture:** the seeded poster data. If a quote disagrees with a poster price, it's a bug.

## 9. Open questions (answer before M1 is finished; defaults in **bold**)

| #   | Question                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Default if unanswered                                                                                                                                                                                                            | What it affects                                      |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Q1  | Does ARLink28 hold room allotments, or does staff confirm availability with the lodge for each booking?                                                                                                                                                                                                                                                                                                                                                                                                             | **Request-to-book:** the customer submits dates, staff confirm with the partner, then a payment link is sent. DESIGN.md's `departures`/seat-hold tables are dropped for packages.                                                | Phase 4 booking design. The catalogue is unaffected. |
| Q2  | Customers pay in NGN/KES/GBP, but prices are USD. Should admins enter explicit per-currency prices, or should we convert?                                                                                                                                                                                                                                                                                                                                                                                           | **Admins enter USD only.** Other currencies come from an `fx_rates` table (admin-set, with markup), and the quote is snapshotted at booking. `PackageRate` already allows explicit per-currency rows to override the conversion. | Quote endpoint, `fx_rates` table                     |
| Q3  | "FROM $X, minimum stay N nights": can customers buy extra nights, and at what price?                                                                                                                                                                                                                                                                                                                                                                                                                                | **Not sold online** (`extraNightPriceMinor = null`). Longer stays go to an enquiry.                                                                                                                                              | Quote, and the web date picker                       |
| Q4  | A stay that straddles two seasons: is it priced by the check-in date or night by night?                                                                                                                                                                                                                                                                                                                                                                                                                             | **By the check-in date's season**                                                                                                                                                                                                | `pricing.ts`                                         |
| Q5  | Are the posters themselves published as images (the current site has a poster lightbox)?                                                                                                                                                                                                                                                                                                                                                                                                                            | **Yes, as a `POSTER` media role,** alongside structured data rendered as HTML for SEO and accessibility                                                                                                                          | Media roles                                          |
| Q6  | ~~Is the cPanel database MySQL or MariaDB?~~ **Answered 2026-09-28: MySQL.** The exact version still needs checking in cPanel → MySQL Databases or phpMyAdmin. It must be ≥ 8.0.16, because older versions parse `CHECK` constraints but silently ignore them.                                                                                                                                                                                                                                                      | Develop against `mysql:8.0` in Docker, collation `utf8mb4_0900_ai_ci`                                                                                                                                                            | CHECK constraints, collation, the local dev image    |
| Q7  | The private vehicle is "$490 per day". How many days does a stay have?                                                                                                                                                                                                                                                                                                                                                                                                                                              | **Days = nights** (a 2-night stay pays for 2 days). Implemented as the `PER_DAY` add-on unit.                                                                                                                                    | `pricing.ts` add-on units                            |
| Q8  | **Poster contradictions** (seeded as DRAFT until resolved): (a) Sala's Extended Mara Experience: both posters say "Savings Season" but show $14,944 and $23,666; (b) Sala's Family Safari: both posters show peak dates but $37,882 and $26,884; (c) Safari Collection Explorer: the savings poster is 4 nights Sasaab + 3 Sala's, the peak poster is 4 Sala's + 3 Sasaab; (d) Giraffe & Nairobi Wildlife Escape lists "Park Fees" as included and "Nairobi National Park fees are not included" (published as-is). | (a) $23,666 as peak (matches Sala's peak per-night rate); (b) lower price as savings (a guess); (c) peak itinerary; (d) both shown                                                                                               | `packages/db/src/seed/catalogue-data.ts`             |
| Q9  | The Giraffe Manor posters carry no season dates. For which check-in dates are their prices valid?                                                                                                                                                                                                                                                                                                                                                                                                                   | **Calendar 2026** (season `giraffe-manor-2026`)                                                                                                                                                                                  | GM quotes and FROM prices stop after 2026-12-31      |

## Related docs

- [`monorepo-migration.md`](./monorepo-migration.md): phase plan. This doc details Phase 3's catalogue and pulls its read path ahead of Phase 2 auth.
- `arlink-static-web`'s `docs/design/arlink28-platform/DESIGN.md`: platform design. §1 above proposes amending its `departures` model for packages.
