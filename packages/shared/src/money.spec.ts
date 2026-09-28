import { formatMoney, fromMinor, toMinor } from "./money";

describe("toMinor", () => {
  it("parses major-unit strings exactly, without float error", () => {
    expect(toMinor("8488", "USD")).toBe(848_800);
    expect(toMinor("0.29", "USD")).toBe(29);
    expect(toMinor("30889.10", "USD")).toBe(3_088_910);
    expect(toMinor("50000000", "NGN")).toBe(5_000_000_000);
  });

  it("accepts integer numbers", () => {
    expect(toMinor(8488, "USD")).toBe(848_800);
  });

  it("rejects fractional numbers instead of rounding float error away", () => {
    // 1.005 is stored as 1.00499999…; toFixed(2) would yield "1.00" → 100.
    expect(() => toMinor(1.005, "USD")).toThrow(RangeError);
    expect(() => toMinor(8488.5, "USD")).toThrow(RangeError);
  });

  it("rejects too many decimals, signs and junk", () => {
    expect(() => toMinor("1.234", "USD")).toThrow(RangeError);
    expect(() => toMinor("-5", "USD")).toThrow(RangeError);
    expect(() => toMinor("12abc", "USD")).toThrow(RangeError);
  });
});

describe("fromMinor", () => {
  it("renders exact decimal strings", () => {
    expect(fromMinor(848_800, "USD")).toBe("8488.00");
    expect(fromMinor(5, "USD")).toBe("0.05");
    expect(fromMinor(-150, "GBP")).toBe("-1.50");
  });

  it("round-trips with toMinor", () => {
    for (const n of [0, 1, 99, 100, 3_398_500, 5_000_000_000]) {
      expect(toMinor(fromMinor(n, "NGN"), "NGN")).toBe(n);
    }
  });
});

describe("formatMoney", () => {
  it("drops cents on whole amounts, like the posters", () => {
    expect(formatMoney({ amountMinor: 848_800, currency: "USD" })).toBe("$8,488");
  });

  it("keeps cents when there are any", () => {
    expect(formatMoney({ amountMinor: 848_850, currency: "USD" })).toBe("$8,488.50");
  });
});
