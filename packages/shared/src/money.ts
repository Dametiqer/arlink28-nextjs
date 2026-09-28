import { z } from "zod";

// Money is always integer minor units + ISO 4217 currency; never floats.
// On the wire amounts are JSON numbers — safe because every realistic value
// (≤ 2^53 minor units) is an exact integer in a double.

// Currencies we sell in (DESIGN.md: NGN/KES/USD/GBP customers, plus the
// providers' other rails). Extend deliberately — each needs an exponent.
export const CURRENCY_EXPONENTS = {
  USD: 2,
  GBP: 2,
  EUR: 2,
  NGN: 2,
  KES: 2,
  GHS: 2,
  ZAR: 2,
  TZS: 2,
} as const;

export type Currency = keyof typeof CURRENCY_EXPONENTS;

export const Currency = z.enum(Object.keys(CURRENCY_EXPONENTS) as [Currency, ...Currency[]]);

export const MinorAmount = z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER);

export const Money = z.object({
  amountMinor: MinorAmount,
  currency: Currency,
});
export type Money = z.infer<typeof Money>;

/**
 * "8488.00" / 8488 → 848800 for USD. Rejects more decimals than the currency has.
 * Numbers must be integers: a fractional double like 1.005 is really
 * 1.00499999…, so rounding it would silently lose a minor unit — pass the
 * decimal as a string instead.
 */
export function toMinor(major: string | number, currency: Currency): number {
  const exp: number = CURRENCY_EXPONENTS[currency];
  if (typeof major === "number" && !Number.isInteger(major)) {
    throw new RangeError(`Fractional amounts must be passed as decimal strings: ${major}`);
  }
  const text = typeof major === "number" ? major.toFixed(0) : major.trim();
  const match = /^(\d+)(?:\.(\d+))?$/.exec(text);
  if (!match) throw new RangeError(`Invalid amount: ${major}`);
  const [, whole, frac = ""] = match;
  if (frac.length > exp) throw new RangeError(`${currency} allows at most ${exp} decimals: ${major}`);
  const minor = Number(whole + frac.padEnd(exp, "0"));
  if (!Number.isSafeInteger(minor)) throw new RangeError(`Amount too large: ${major}`);
  return minor;
}

/** 848800 USD → "8488.00" (exact string; no float arithmetic). */
export function fromMinor(amountMinor: number, currency: Currency): string {
  const exp: number = CURRENCY_EXPONENTS[currency];
  if (!Number.isSafeInteger(amountMinor)) throw new RangeError(`Not an integer amount: ${amountMinor}`);
  const sign = amountMinor < 0 ? "-" : "";
  const digits = Math.abs(amountMinor)
    .toString()
    .padStart(exp + 1, "0");
  return exp === 0 ? sign + digits : `${sign}${digits.slice(0, -exp)}.${digits.slice(-exp)}`;
}

/** Display formatting, e.g. formatMoney({amountMinor: 848800, currency: "USD"}) → "US$8,488". */
export function formatMoney(money: Money, opts: { locale?: string; showCents?: boolean } = {}): string {
  const exp: number = CURRENCY_EXPONENTS[money.currency];
  const showCents = opts.showCents ?? money.amountMinor % 10 ** exp !== 0;
  return new Intl.NumberFormat(opts.locale ?? "en-US", {
    style: "currency",
    currency: money.currency,
    minimumFractionDigits: showCents ? exp : 0,
    maximumFractionDigits: showCents ? exp : 0,
  }).format(Number(fromMinor(money.amountMinor, money.currency)));
}
