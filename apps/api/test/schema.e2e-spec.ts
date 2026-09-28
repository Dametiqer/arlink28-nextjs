import { PrismaClient, uuidv7 } from "@arlink28/db";
import { TEST_DATABASE_URL } from "./test-db";

// Proves the hand-written CHECK constraints in the migration are really
// enforced by this MySQL server (MySQL < 8.0.16 parses and silently ignores them).
describe("database invariants", () => {
  const prisma = new PrismaClient({ datasourceUrl: TEST_DATABASE_URL });
  afterAll(() => prisma.$disconnect());

  async function destination() {
    return prisma.destination.create({
      data: { id: uuidv7(), slug: `dest-${uuidv7()}`, name: "Nairobi", country: "KE" },
    });
  }

  function pkg(destinationId: string, overrides: Record<string, unknown> = {}) {
    return prisma.package.create({
      data: {
        id: uuidv7(),
        slug: `pkg-${uuidv7()}`,
        title: "Giraffe Manor Grand Escape",
        summary: "Test",
        category: "SAFARI",
        destinationId,
        nights: 3,
        minNights: 3,
        adults: 2,
        ...overrides,
      },
    });
  }

  it("stores every application table in InnoDB (FKs, transactions, row locks)", async () => {
    const rows = await prisma.$queryRaw<{ name: string; engine: string }[]>`
      SELECT TABLE_NAME AS name, ENGINE AS engine FROM information_schema.TABLES
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME <> '_prisma_migrations'`;
    expect(rows.length).toBeGreaterThan(0);
    expect(rows.filter((r) => r.engine !== "InnoDB")).toEqual([]);
  });

  it("accepts a valid package with BIGINT money beyond 32 bits", async () => {
    const d = await destination();
    const p = await pkg(d.id, { fromPriceMinor: 5_000_000_000n, baseCurrency: "NGN" });
    expect(p.fromPriceMinor).toBe(5_000_000_000n);
  });

  it.each([
    ["minNights above nights", { nights: 2, minNights: 3 }],
    ["zero minNights", { nights: 3, minNights: 0 }],
    ["no adults", { adults: 0 }],
    ["negative from-price", { fromPriceMinor: -1n }],
  ])("rejects %s", async (_label, overrides) => {
    const d = await destination();
    await expect(pkg(d.id, overrides)).rejects.toThrow(/check constraint/i);
  });

  it("rejects a season range that ends before it starts", async () => {
    const season = await prisma.season.create({
      data: { id: uuidv7(), slug: `season-${uuidv7()}`, name: "Savings 2026" },
    });
    await expect(
      prisma.seasonRange.create({
        data: {
          id: uuidv7(),
          seasonId: season.id,
          startDate: new Date("2026-05-31"),
          endDate: new Date("2026-01-06"),
        },
      }),
    ).rejects.toThrow(/check constraint/i);
  });

  it("enforces unique slugs", async () => {
    const d = await destination();
    const p = await pkg(d.id);
    await expect(pkg(d.id, { slug: p.slug })).rejects.toMatchObject({ code: "P2002" });
  });
});
