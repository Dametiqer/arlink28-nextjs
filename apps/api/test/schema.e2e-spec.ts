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

  describe("media", () => {
    async function media(overrides: Record<string, unknown>) {
      const p = await pkg((await destination()).id);
      return prisma.packageMedia.create({
        data: {
          id: uuidv7(),
          packageId: p.id,
          path: `packages/${p.id}/${uuidv7()}.jpg`,
          alt: "Giraffes at breakfast",
          width: 1600,
          height: 1067,
          sortKey: "a",
          ...overrides,
        },
      });
    }

    it("accepts a HERO photo and a GALLERY video", async () => {
      await expect(media({ role: "HERO" })).resolves.toMatchObject({ videoProvider: null });
      await expect(media({ role: "GALLERY", videoProvider: "YOUTUBE", videoId: "dQw4w9WgXcQ" })).resolves.toMatchObject(
        { videoId: "dQw4w9WgXcQ" },
      );
    });

    it.each([
      ["a video provider without an id", { videoProvider: "YOUTUBE" }],
      ["a video id without a provider", { videoId: "dQw4w9WgXcQ" }],
      ["a video as the HERO", { role: "HERO", videoProvider: "YOUTUBE", videoId: "dQw4w9WgXcQ" }],
      ["a video as a POSTER", { role: "POSTER", videoProvider: "VIMEO", videoId: "123456789" }],
      ["a zero-width photo", { width: 0 }],
    ])("rejects package media with %s", async (_label, overrides) => {
      await expect(media(overrides)).rejects.toThrow(/check constraint/i);
    });

    it("rejects lodge media with half a video reference", async () => {
      const d = await destination();
      const partner = await prisma.partner.create({ data: { id: uuidv7(), slug: `partner-${uuidv7()}`, name: "P" } });
      const property = await prisma.property.create({
        data: { id: uuidv7(), slug: `lodge-${uuidv7()}`, name: "Lodge", partnerId: partner.id, destinationId: d.id },
      });
      await expect(
        prisma.propertyMedia.create({
          data: {
            id: uuidv7(),
            propertyId: property.id,
            path: `properties/${property.id}/x.jpg`,
            alt: "Lodge",
            width: 1600,
            height: 1067,
            sortKey: "a",
            videoProvider: "VIMEO",
          },
        }),
      ).rejects.toThrow(/check constraint/i);
    });
  });

  it("enforces unique slugs", async () => {
    const d = await destination();
    const p = await pkg(d.id);
    await expect(pkg(d.id, { slug: p.slug })).rejects.toMatchObject({ code: "P2002" });
  });
});
