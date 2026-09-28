import { addDays } from "../dates";
import type { Currency, Money } from "../money";
import type { AddOnUnit } from "./enums";

// Pure pricing rules (docs/packages-api-plan.md §5): no I/O, no clock — the
// caller passes `today`. The API quotes with it and bookings will snapshot it.
// All amounts are integer minor units; every sum is overflow-checked.

export type PricingRange = { start: string; end: string }; // inclusive ISO dates (check-in dates)
export type PricingSeason = { id: string; name: string; ranges: PricingRange[] };
export type PricingRate = {
  seasonId: string;
  currency: Currency;
  priceMinor: number;
  extraNightPriceMinor: number | null;
};
export type PricingAddOn = { id: string; name: string; unit: AddOnUnit; currency: Currency; priceMinor: number };
export type PricingPackage = {
  nights: number;
  minNights: number;
  adults: number;
  children: number;
  baseCurrency: Currency;
  seasons: PricingSeason[];
  rates: PricingRate[];
  addOns: PricingAddOn[];
};

export type QuoteRequest = {
  checkIn: string;
  today: string;
  nights?: number;
  currency?: Currency;
  addOns?: { id: string; quantity: number }[];
};

export type PricedLine =
  | { kind: "PACKAGE"; label: string; quantity: 1; unitPriceMinor: number; amountMinor: number }
  | { kind: "EXTRA_NIGHTS"; label: string; quantity: number; unitPriceMinor: number; amountMinor: number }
  | { kind: "ADD_ON"; addOnId: string; label: string; quantity: number; unitPriceMinor: number; amountMinor: number };

export type QuoteResult = {
  checkIn: string;
  checkOut: string;
  nights: number;
  party: { adults: number; children: number };
  season: { id: string; name: string };
  lines: PricedLine[];
  total: Money;
};

export const QUOTE_ERROR_CODES = [
  "CHECK_IN_IN_PAST",
  "BELOW_MIN_NIGHTS",
  "EXTRA_NIGHTS_NOT_SOLD",
  "NO_RATE_FOR_DATE",
  "CURRENCY_NOT_AVAILABLE",
  "UNKNOWN_ADD_ON",
] as const;
export type QuoteErrorCode = (typeof QUOTE_ERROR_CODES)[number];

/** An expected, customer-facing reason a quote can't be given (the API maps it to 422). */
export class QuoteError extends Error {
  constructor(
    readonly code: QuoteErrorCode,
    message: string,
  ) {
    super(message);
    this.name = "QuoteError";
  }
}

function inRange(date: string, range: PricingRange): boolean {
  return range.start <= date && date <= range.end;
}

function safeAdd(a: number, b: number): number {
  const sum = a + b;
  if (!Number.isSafeInteger(sum)) throw new RangeError("Quote total exceeds the safe integer range");
  return sum;
}

function safeMul(a: number, b: number): number {
  const product = a * b;
  if (!Number.isSafeInteger(product)) throw new RangeError("Quote line exceeds the safe integer range");
  return product;
}

/** How many units of an add-on a stay consumes. PER_DAY counts days of stay = nights (plan Q7). */
function addOnUnits(unit: AddOnUnit, nights: number, people: number): number {
  switch (unit) {
    case "PER_STAY":
      return 1;
    case "PER_NIGHT":
    case "PER_DAY":
      return nights;
    case "PER_PERSON":
      return people;
  }
}

/**
 * Prices one stay. The season is chosen by the check-in date alone (plan Q4),
 * and the rate must exist in the requested currency (no FX yet, plan Q2).
 */
export function quote(pkg: PricingPackage, req: QuoteRequest): QuoteResult {
  const nights = req.nights ?? pkg.nights;
  const currency = req.currency ?? pkg.baseCurrency;

  if (req.checkIn < req.today) throw new QuoteError("CHECK_IN_IN_PAST", "Check-in date is in the past");
  if (nights < Math.max(pkg.minNights, pkg.nights)) {
    throw new QuoteError("BELOW_MIN_NIGHTS", `This package is priced for a minimum of ${pkg.nights} nights`);
  }

  const seasonIds = new Set(pkg.seasons.filter((s) => s.ranges.some((r) => inRange(req.checkIn, r))).map((s) => s.id));
  const datedRates = pkg.rates.filter((r) => seasonIds.has(r.seasonId));
  if (datedRates.length === 0) {
    throw new QuoteError("NO_RATE_FOR_DATE", `No rate is available for a check-in on ${req.checkIn}`);
  }
  const matching = datedRates.filter((r) => r.currency === currency);
  if (matching.length === 0) {
    throw new QuoteError("CURRENCY_NOT_AVAILABLE", `This package is not priced in ${currency}`);
  }
  // Admin writes reject overlapping seasons per currency (plan §3 invariant 3), so this is a data bug.
  if (matching.length > 1) throw new Error(`Ambiguous rate: ${matching.length} ${currency} rates cover ${req.checkIn}`);
  const rate = matching[0];
  const season = pkg.seasons.find((s) => s.id === rate.seasonId)!;

  const lines: PricedLine[] = [
    {
      kind: "PACKAGE",
      label: `Package price (${pkg.nights} nights)`,
      quantity: 1,
      unitPriceMinor: rate.priceMinor,
      amountMinor: rate.priceMinor,
    },
  ];

  const extraNights = nights - pkg.nights;
  if (extraNights > 0) {
    if (rate.extraNightPriceMinor === null) {
      throw new QuoteError("EXTRA_NIGHTS_NOT_SOLD", `Stays longer than ${pkg.nights} nights are available on request`);
    }
    lines.push({
      kind: "EXTRA_NIGHTS",
      label: "Extra nights",
      quantity: extraNights,
      unitPriceMinor: rate.extraNightPriceMinor,
      amountMinor: safeMul(extraNights, rate.extraNightPriceMinor),
    });
  }

  const people = pkg.adults + pkg.children;
  for (const requested of req.addOns ?? []) {
    const addOn = pkg.addOns.find((a) => a.id === requested.id);
    if (!addOn) throw new QuoteError("UNKNOWN_ADD_ON", `Add-on ${requested.id} is not offered with this package`);
    if (addOn.currency !== currency) {
      throw new QuoteError("CURRENCY_NOT_AVAILABLE", `Add-on "${addOn.name}" is not priced in ${currency}`);
    }
    const quantity = safeMul(addOnUnits(addOn.unit, nights, people), requested.quantity);
    lines.push({
      kind: "ADD_ON",
      addOnId: addOn.id,
      label: addOn.name,
      quantity,
      unitPriceMinor: addOn.priceMinor,
      amountMinor: safeMul(quantity, addOn.priceMinor),
    });
  }

  return {
    checkIn: req.checkIn,
    checkOut: addDays(req.checkIn, nights),
    nights,
    party: { adults: pkg.adults, children: pkg.children },
    season: { id: season.id, name: season.name },
    lines,
    total: { amountMinor: lines.reduce((sum, l) => safeAdd(sum, l.amountMinor), 0), currency },
  };
}

/**
 * The "FROM" price on cards: the cheapest base-currency rate whose season still
 * has a check-in date on or after `today`. Null when nothing is bookable.
 */
export function fromPrice(
  pkg: Pick<PricingPackage, "baseCurrency" | "seasons" | "rates">,
  today: string,
): Money | null {
  const live = new Set(pkg.seasons.filter((s) => s.ranges.some((r) => r.end >= today)).map((s) => s.id));
  const prices = pkg.rates
    .filter((r) => r.currency === pkg.baseCurrency && live.has(r.seasonId))
    .map((r) => r.priceMinor);
  return prices.length ? { amountMinor: Math.min(...prices), currency: pkg.baseCurrency } : null;
}

/** Seasons trimmed to ranges with a check-in date on or after `today`; seasons left empty are dropped. */
export function upcomingSeasons<T extends PricingSeason>(seasons: T[], today: string): T[] {
  return seasons
    .map((s) => ({ ...s, ranges: s.ranges.filter((r) => r.end >= today) }))
    .filter((s) => s.ranges.length > 0);
}
