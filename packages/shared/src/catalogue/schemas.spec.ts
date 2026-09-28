import { addDays, isIsoDate } from "../dates";
import { PackageListQuery, QuoteQuery } from "./schemas";

describe("dates", () => {
  it("accepts only real calendar dates", () => {
    expect(isIsoDate("2026-02-28")).toBe(true);
    expect(isIsoDate("2026-02-29")).toBe(false); // not a leap year
    expect(isIsoDate("2026-2-1")).toBe(false);
    expect(isIsoDate("2026-11-10T00:00:00Z")).toBe(false);
  });

  it("adds days across month and year ends", () => {
    expect(addDays("2026-12-28", 10)).toBe("2027-01-07");
    expect(addDays("2028-02-28", 1)).toBe("2028-02-29");
  });
});

describe("QuoteQuery", () => {
  const id = "0192a0b2-0000-7000-8000-000000000001";

  it("coerces query-string values", () => {
    expect(QuoteQuery.parse({ checkIn: "2026-11-10", nights: "3", currency: "USD" })).toEqual({
      checkIn: "2026-11-10",
      nights: 3,
      currency: "USD",
    });
  });

  it("parses add-on selections with a default quantity of 1", () => {
    expect(QuoteQuery.parse({ checkIn: "2026-11-10", addOns: `${id}:2,${id}` }).addOns).toEqual([
      { id, quantity: 2 },
      { id, quantity: 1 },
    ]);
  });

  it.each([`${id}:0`, `${id}:11`, `${id}:x`, "not-a-uuid:1"])("rejects the add-on selection %s", (addOns) => {
    expect(QuoteQuery.safeParse({ checkIn: "2026-11-10", addOns }).success).toBe(false);
  });

  it("rejects bad dates and unsupported currencies", () => {
    expect(QuoteQuery.safeParse({ checkIn: "2026-13-01" }).success).toBe(false);
    expect(QuoteQuery.safeParse({ checkIn: "2026-11-10", currency: "BTC" }).success).toBe(false);
  });
});

describe("PackageListQuery", () => {
  it("coerces filters and applies the default page size", () => {
    expect(PackageListQuery.parse({ adults: "2", children: "0", featured: "true", destination: "masai-mara" })).toEqual(
      {
        adults: 2,
        children: 0,
        featured: true,
        destination: "masai-mara",
        limit: 20,
      },
    );
  });

  it("rejects malformed slugs and absurd party sizes", () => {
    expect(PackageListQuery.safeParse({ destination: "Masai Mara" }).success).toBe(false);
    expect(PackageListQuery.safeParse({ adults: "0" }).success).toBe(false);
  });
});
