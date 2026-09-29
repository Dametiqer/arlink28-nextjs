import { QUOTE_ERROR_CODES, QuoteError, fromPrice, quote, upcomingSeasons, type PricingPackage } from "./pricing";
import { ErrorCode } from "../errors";

const SAVINGS = {
  id: "savings",
  name: "Savings 2026",
  ranges: [
    { start: "2026-01-06", end: "2026-05-31" },
    { start: "2026-11-01", end: "2026-12-15" },
  ],
};
const PEAK = {
  id: "peak",
  name: "Peak 2026",
  ranges: [
    { start: "2026-01-01", end: "2026-01-05" },
    { start: "2026-06-01", end: "2026-10-31" },
    { start: "2026-12-16", end: "2026-12-31" },
  ],
};

// Modelled on the Ultimate Safari Collection Journey posters: same stay, two seasons.
const pkg: PricingPackage = {
  nights: 10,
  minNights: 10,
  adults: 2,
  children: 0,
  baseCurrency: "USD",
  seasons: [SAVINGS, PEAK],
  rates: [
    { seasonId: "savings", currency: "USD", priceMinor: 3_088_900, extraNightPriceMinor: null },
    { seasonId: "peak", currency: "USD", priceMinor: 4_484_800, extraNightPriceMinor: null },
  ],
  addOns: [{ id: "vehicle", name: "Private exclusive vehicle", unit: "PER_DAY", currency: "USD", priceMinor: 49_000 }],
};
const today = "2026-09-28";

function codeOf(fn: () => unknown): string {
  try {
    fn();
  } catch (e) {
    if (e instanceof QuoteError) return e.code;
    throw e;
  }
  throw new Error("expected a QuoteError");
}

describe("quote", () => {
  it("prices the package by the season containing the check-in date", () => {
    expect(quote(pkg, { checkIn: "2026-11-10", today }).total).toEqual({ amountMinor: 3_088_900, currency: "USD" });
    expect(quote(pkg, { checkIn: "2026-10-01", today }).total.amountMinor).toBe(4_484_800);
  });

  it("treats range boundaries as inclusive on both ends", () => {
    expect(quote(pkg, { checkIn: "2026-11-01", today }).season.id).toBe("savings");
    expect(quote(pkg, { checkIn: "2026-12-15", today }).season.id).toBe("savings");
    expect(quote(pkg, { checkIn: "2026-12-16", today }).season.id).toBe("peak");
  });

  it("prices a stay that straddles seasons by its check-in season (plan Q4)", () => {
    const q = quote(pkg, { checkIn: "2026-10-31", today });
    expect(q.season.id).toBe("peak");
    expect(q.checkOut).toBe("2026-11-10");
  });

  it("returns check-out, party and a single package line", () => {
    const q = quote(pkg, { checkIn: "2026-12-28", today });
    expect(q).toMatchObject({
      checkIn: "2026-12-28",
      checkOut: "2027-01-07",
      nights: 10,
      party: { adults: 2, children: 0 },
    });
    expect(q.lines).toEqual([
      {
        kind: "PACKAGE",
        label: "Package price (10 nights)",
        quantity: 1,
        unitPriceMinor: 4_484_800,
        amountMinor: 4_484_800,
      },
    ]);
  });

  it("allows check-in today but not before", () => {
    expect(quote(pkg, { checkIn: today, today }).season.id).toBe("peak");
    expect(codeOf(() => quote(pkg, { checkIn: "2026-09-27", today }))).toBe("CHECK_IN_IN_PAST");
  });

  it("rejects a check-in no season covers", () => {
    expect(codeOf(() => quote(pkg, { checkIn: "2027-02-01", today }))).toBe("NO_RATE_FOR_DATE");
  });

  it("rejects stays shorter than the package", () => {
    expect(codeOf(() => quote(pkg, { checkIn: "2026-11-10", today, nights: 9 }))).toBe("BELOW_MIN_NIGHTS");
  });

  it("refuses extra nights when the rate has no extra-night price (plan Q3)", () => {
    expect(codeOf(() => quote(pkg, { checkIn: "2026-11-10", today, nights: 11 }))).toBe("EXTRA_NIGHTS_NOT_SOLD");
  });

  it("adds extra nights when the rate prices them", () => {
    const withExtra: PricingPackage = {
      ...pkg,
      rates: [{ seasonId: "savings", currency: "USD", priceMinor: 848_800, extraNightPriceMinor: 282_900 }],
    };
    const q = quote(withExtra, { checkIn: "2026-11-10", today, nights: 12 });
    expect(q.lines[1]).toEqual({
      kind: "EXTRA_NIGHTS",
      label: "Extra nights",
      quantity: 2,
      unitPriceMinor: 282_900,
      amountMinor: 565_800,
    });
    expect(q.total.amountMinor).toBe(848_800 + 565_800);
  });

  it("rejects a currency the package is not priced in (no FX yet, plan Q2)", () => {
    expect(codeOf(() => quote(pkg, { checkIn: "2026-11-10", today, currency: "NGN" }))).toBe("CURRENCY_NOT_AVAILABLE");
  });

  it.each([
    ["PER_DAY", 10 * 2], // 10 days × 2 vehicles
    ["PER_NIGHT", 10 * 2],
    ["PER_STAY", 1 * 2],
    ["PER_PERSON", 2 * 2], // 2 adults × qty 2
  ] as const)("prices a %s add-on", (unit, expectedQuantity) => {
    const p: PricingPackage = { ...pkg, addOns: [{ ...pkg.addOns[0], unit }] };
    const q = quote(p, { checkIn: "2026-11-10", today, addOns: [{ id: "vehicle", quantity: 2 }] });
    expect(q.lines[1]).toMatchObject({
      kind: "ADD_ON",
      addOnId: "vehicle",
      quantity: expectedQuantity,
      unitPriceMinor: 49_000,
    });
    expect(q.total.amountMinor).toBe(3_088_900 + expectedQuantity * 49_000);
  });

  it("prices the private vehicle for a 10-night stay at $490 × 10 days", () => {
    const q = quote(pkg, { checkIn: "2026-11-10", today, addOns: [{ id: "vehicle", quantity: 1 }] });
    expect(q.total.amountMinor).toBe(3_088_900 + 490_000);
  });

  it("rejects unknown add-ons and add-ons priced in another currency", () => {
    expect(codeOf(() => quote(pkg, { checkIn: "2026-11-10", today, addOns: [{ id: "nope", quantity: 1 }] }))).toBe(
      "UNKNOWN_ADD_ON",
    );
    const gbpAddOn: PricingPackage = { ...pkg, addOns: [{ ...pkg.addOns[0], currency: "GBP" }] };
    expect(
      codeOf(() => quote(gbpAddOn, { checkIn: "2026-11-10", today, addOns: [{ id: "vehicle", quantity: 1 }] })),
    ).toBe("CURRENCY_NOT_AVAILABLE");
  });

  it("treats overlapping same-currency rates as a data bug, not a customer error", () => {
    const overlapping: PricingPackage = { ...pkg, seasons: [SAVINGS, { ...PEAK, ranges: SAVINGS.ranges }] };
    expect(() => quote(overlapping, { checkIn: "2026-11-10", today })).toThrow(/Ambiguous rate/);
  });

  it("refuses totals beyond the safe integer range instead of losing precision", () => {
    const huge: PricingPackage = {
      ...pkg,
      rates: [
        { seasonId: "savings", currency: "USD", priceMinor: Number.MAX_SAFE_INTEGER, extraNightPriceMinor: null },
      ],
    };
    expect(() => quote(huge, { checkIn: "2026-11-10", today, addOns: [{ id: "vehicle", quantity: 1 }] })).toThrow(
      RangeError,
    );
  });

  it("uses only error codes the shared ErrorCode enum knows (so the API can return them)", () => {
    for (const code of QUOTE_ERROR_CODES) expect(ErrorCode.safeParse(code).success).toBe(true);
  });
});

describe("fromPrice", () => {
  it("is the cheapest base-currency rate among seasons with upcoming dates", () => {
    expect(fromPrice(pkg, today)).toEqual({ amountMinor: 3_088_900, currency: "USD" });
  });

  it("ignores seasons that have fully passed", () => {
    expect(fromPrice(pkg, "2026-12-16")).toEqual({ amountMinor: 4_484_800, currency: "USD" });
  });

  it("is null when nothing is bookable any more", () => {
    expect(fromPrice(pkg, "2027-01-01")).toBeNull();
  });

  it("ignores rates in other currencies", () => {
    const gbpOnly = { ...pkg, rates: pkg.rates.map((r) => ({ ...r, currency: "GBP" as const })) };
    expect(fromPrice(gbpOnly, today)).toBeNull();
  });
});

describe("upcomingSeasons", () => {
  it("drops past ranges and seasons left empty", () => {
    expect(upcomingSeasons([SAVINGS, PEAK], "2026-12-16")).toEqual([
      { ...PEAK, ranges: [{ start: "2026-12-16", end: "2026-12-31" }] },
    ]);
  });

  it("keeps a range that is in progress", () => {
    expect(upcomingSeasons([PEAK], today)[0].ranges).toEqual([
      { start: "2026-06-01", end: "2026-10-31" },
      { start: "2026-12-16", end: "2026-12-31" },
    ]);
  });
});
