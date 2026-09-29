# 0002. Packages are priced per party per season, not per seat on a departure

- **Status:** Accepted, 2026-09-28
- **Amends:** the Package, Departure and Booking model in the platform design (`arlink-static-web/docs/design/arlink28-platform/`) for lodge-stay packages. It doesn't change [ADR 0001](./0001-monorepo-on-cpanel.md).
- **Details:** [`docs/packages-api-plan.md`](../packages-api-plan.md) §1, §3, §5 and §9.

## Context

The platform design modelled a package as dated **departures** with seat capacity (`departures`, `departure_prices`, a seat-hold transaction, and "zero double-sold seats"). The 17 partner posters in `Company docs/Packages/` (Giraffe Manor and The Safari Collection) describe a different product:

- **The price is for the whole party.** For example, "2 Adults — US$8,488 per couple" or "2 Adults + 3 Children — US$11,809 per family".
- **The customer picks a check-in date inside a season window.** For example, the Savings Season runs 6 Jan–31 May and 1 Nov–15 Dec 2026.
- **The same stay costs different amounts in different seasons.**
- **Each package has a set number of nights and a minimum stay.** Some stays cover several properties, such as 5 nights at Sala's Camp and 5 nights at Sasaab.
- **Extras carry their own prices.** For example, a private vehicle costs $490 per day.
- **The lodge owns the rooms.** Nothing indicates that ARLink28 holds seat or room inventory.

Forcing these products into departures would mean inventing dates and capacities that don't exist.

## Decision

We will price lodge-stay packages with **rates**: one price per season and currency, for the package's fixed party and nights.

- A **season** is a named set of inclusive check-in date ranges.
- **Quotes are chosen by the check-in date's season.** A package can never have two same-currency seasons that overlap, so any check-in date has at most one price.
- **The public catalogue offers a price quote instead of departures.** It exposes `GET /v1/packages/{slug}/quote?checkIn=…`, which returns an advisory price with `availability: "ON_REQUEST"`, instead of `GET /v1/packages/{slug}/departures`.
- **We won't create departure tables for these packages.** `departures` and `departure_prices` stay reserved, not built.
- **Inclusions become proper tables, not JSON.** They're sectioned items from a reusable feature library, and the itinerary is an ordered list of property stays.
- **Money is stored exactly.** It's whole minor units (`BIGINT`) plus an ISO currency code, and the pure `quote()` and `fromPrice()` functions in `packages/shared` are the only pricing code.

## Consequences

- **Good:** the model matches what the partners actually sell, and it held up against the real data. The 17 posters reduced to 13 packages, where posters for one stay in different seasons became one package with a rate per season.
- **Good:** pricing is pure, tested code shared by the API and the seed.
- **Good:** quotes need no locking, because no inventory of ours changes.
- **Bad: booking design is open until Q1 is decided (plan §9).** Q1 asks whether bookings are **request-to-book** (staff confirm with the lodge, then send a payment link) or use **allotments** that ARLink28 holds.
  - Under request-to-book, the design's seat-hold deep dive doesn't apply to packages. A booking is confirmed only after both the partner's confirmation and a verified payment.
  - Under allotments, the seat-hold mechanism returns as room inventory.
  - `POST /v1/bookings` changes shape either way: it takes package, check-in date and party instead of departure and seats.
- **Accepted assumptions** (plan §9, to confirm):
  - A stay that crosses two seasons is priced by its check-in date's season.
  - Rates are entered in USD only; there's no currency conversion yet.
  - Extra nights aren't sold online.
  - "Per day" for the private vehicle means per night of the stay.
  - The Giraffe Manor prices are valid for check-ins in 2026.
- **Data quality:** three packages have posters that contradict each other. They're seeded as DRAFT and stay off the public API until the partner confirms them (plan Q8).
