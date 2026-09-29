import { z } from "zod";

// Calendar dates travel as ISO "YYYY-MM-DD" strings, never Date objects: a
// check-in date has no time zone, and string comparison orders them correctly.

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function isIsoDate(value: string): boolean {
  if (!ISO_DATE.test(value)) return false;
  const d = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
}

export const IsoDate = z.string().refine(isIsoDate, { message: "Expected a calendar date as YYYY-MM-DD" });

/** "2026-11-10" + 3 → "2026-11-13" (UTC arithmetic, so no DST drift). */
export function addDays(date: string, days: number): string {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** The UTC calendar date of an instant — what the API treats as "today". */
export function isoDateOf(instant: Date): string {
  return instant.toISOString().slice(0, 10);
}
