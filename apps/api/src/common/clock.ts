import { isoDateOf } from "@arlink28/shared";

/**
 * "Today" for pricing and season visibility, injected so tests can pin a date:
 * the seeded 2026 seasons would otherwise make the suite fail once they expire.
 * Days are UTC calendar dates.
 */
export interface Clock {
  today(): string;
}

export const CLOCK = Symbol("CLOCK");

export const systemClock: Clock = { today: () => isoDateOf(new Date()) };

export function fixedClock(today: string): Clock {
  return { today: () => today };
}
