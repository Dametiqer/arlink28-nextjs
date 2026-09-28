import { minorToNumber, numberToMinor } from "./money";

describe("minor-unit conversion at the DB boundary", () => {
  it("round-trips realistic amounts, including large NGN values", () => {
    for (const n of [0, 848_800, 3_398_500, 5_000_000_000]) {
      expect(minorToNumber(numberToMinor(n))).toBe(n);
    }
  });

  it("refuses bigints that would lose precision as JSON numbers", () => {
    expect(() => minorToNumber(BigInt(Number.MAX_SAFE_INTEGER) + 1n)).toThrow(RangeError);
  });

  it("refuses non-integer numbers", () => {
    expect(() => numberToMinor(8488.5)).toThrow(RangeError);
  });
});
