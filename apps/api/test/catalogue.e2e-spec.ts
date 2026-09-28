import { INestApplication } from "@nestjs/common";
import { PrismaClient, seedCatalogue, uuidv7 } from "@arlink28/db";
import { DestinationList, PackageDetail, PackageList, PartnerList, Quote } from "@arlink28/shared";
import request from "supertest";
import { TEST_TODAY, boot } from "./boot";
import { TEST_DATABASE_URL } from "./test-db";

// The public catalogue against the real poster seed, with the clock pinned to
// TEST_TODAY (2026-09-28). Every body is also parsed with the shared zod
// contract, so the API can't drift from what web/admin compile against.

const PUBLISHED = [
  "sala-mara-escape",
  "salas-classic-safari",
  "ultimate-safari-collection-journey",
  "giraffe-manor-signature-escape",
  "giraffe-manor-grand-escape",
  "giraffe-manor-luxury-escape",
  "giraffe-manor-family-experience",
  "giraffe-manor-family-celebration",
  "giraffe-manor-family-celebration-3-children",
  "giraffe-and-nairobi-wildlife-escape",
];
const DRAFTS = ["salas-extended-mara-experience", "salas-family-safari", "safari-collection-explorer"];

describe("public catalogue API", () => {
  let app: INestApplication;
  const http = () => request(app.getHttpServer());

  beforeAll(async () => {
    const prisma = new PrismaClient({ datasourceUrl: TEST_DATABASE_URL });
    try {
      await seedCatalogue(prisma, { today: TEST_TODAY });
    } finally {
      await prisma.$disconnect();
    }
    app = await boot();
  });
  afterAll(() => app?.close());

  describe("GET /v1/packages", () => {
    it("lists only published packages, in sort order, with FROM prices", async () => {
      const res = await http().get("/v1/packages").expect(200);
      const body = PackageList.parse(res.body);
      expect(body.items.map((p) => p.slug)).toEqual(PUBLISHED);
      expect(body.nextCursor).toBeNull();
      expect(res.headers["cache-control"]).toBe("public, max-age=60, stale-while-revalidate=300");

      const grand = body.items.find((p) => p.slug === "giraffe-manor-grand-escape")!;
      expect(grand).toMatchObject({
        nights: 3,
        party: { adults: 2, children: 0 },
        fromPrice: { amountMinor: 848_800, currency: "USD" },
        destination: { slug: "nairobi" },
        partners: [{ slug: "giraffe-manor", name: "Giraffe Manor" }],
      });
      // Two-season package: FROM is the cheaper season that still has upcoming dates.
      expect(body.items.find((p) => p.slug === "ultimate-safari-collection-journey")!.fromPrice).toEqual({
        amountMinor: 3_088_900,
        currency: "USD",
      });
    });

    it("pages with an opaque cursor without skipping or repeating", async () => {
      const seen: string[] = [];
      let cursor: string | null = null;
      let pages = 0;
      do {
        const res = await http()
          .get("/v1/packages")
          .query({ limit: 4, ...(cursor ? { cursor } : {}) })
          .expect(200);
        const body = PackageList.parse(res.body);
        seen.push(...body.items.map((p) => p.slug));
        cursor = body.nextCursor;
        pages++;
      } while (cursor);
      expect(pages).toBe(3);
      expect(seen).toEqual(PUBLISHED);
    });

    it.each([
      [{ destination: "nairobi" }, 7],
      [{ destination: "masai-mara" }, 3],
      [{ partner: "the-safari-collection" }, 3],
      [{ partner: "giraffe-manor" }, 7],
      [{ category: "LODGE" }, 6],
      [{ adults: 2, children: 2 }, 2],
      [{ adults: 2, children: 3 }, 1],
      [{ featured: "true" }, 0],
    ])("filters by %j", async (query, count) => {
      const res = await http().get("/v1/packages").query(query).expect(200);
      expect(PackageList.parse(res.body).items).toHaveLength(count);
    });

    it("rejects bad filters and cursors with the shared 422 envelope", async () => {
      const bad = await http().get("/v1/packages").query({ adults: 0 }).expect(422);
      expect(bad.body.error.code).toBe("VALIDATION_FAILED");
      const cursor = await http().get("/v1/packages").query({ cursor: "garbage" }).expect(422);
      expect(cursor.body.error.details).toEqual([{ path: "cursor", message: "Malformed cursor" }]);
    });
  });

  describe("GET /v1/packages/:slug", () => {
    it("returns the full Grand Escape as on the poster", async () => {
      const res = await http().get("/v1/packages/giraffe-manor-grand-escape").expect(200);
      const p = PackageDetail.parse(res.body);
      expect(p.stays).toEqual([
        {
          property: {
            slug: "giraffe-manor",
            name: "Giraffe Manor",
            destination: { slug: "nairobi", name: "Nairobi", country: "KE" },
            media: [],
          },
          nights: 3,
          roomType: null,
        },
      ]);
      expect(p.features.INCLUDED.map((f) => f.label)).toContain("AFEW Giraffe Centre entry");
      expect(p.features.INCLUDED.find((f) => f.label.startsWith("Arrival & departure"))).toEqual({
        label: "Arrival & departure transfers – Karen & Langata area",
        icon: "van-shuttle",
        footnote: "Subject to applicable collection and departure times.",
      });
      expect(p.features.PREMIUM_SERVICE).toHaveLength(3);
      expect(p.features.EXCLUDED).toHaveLength(7);
      expect(p.features.PERK).toEqual([]);
      expect(p.seasons).toEqual([
        {
          id: expect.any(String),
          name: "2026",
          ranges: [{ start: "2026-01-01", end: "2026-12-31" }],
          prices: [{ amountMinor: 848_800, currency: "USD" }],
        },
      ]);
      expect(p.media).toEqual([]);
      expect(p.hero).toBeNull();
    });

    it("shows only upcoming season ranges, each with its price", async () => {
      const res = await http().get("/v1/packages/ultimate-safari-collection-journey").expect(200);
      const p = PackageDetail.parse(res.body);
      expect(p.seasons.map((s) => [s.name, s.ranges, s.prices[0].amountMinor])).toEqual([
        ["Savings Season 2026", [{ start: "2026-11-01", end: "2026-12-15" }], 3_088_900],
        [
          "Peak Season 2026",
          [
            { start: "2026-06-01", end: "2026-10-31" },
            { start: "2026-12-16", end: "2026-12-31" },
          ],
          4_484_800,
        ],
      ]);
      expect(p.stays.map((s) => [s.property.slug, s.nights])).toEqual([
        ["salas-camp", 5],
        ["sasaab", 5],
      ]);
      expect(p.partners.map((x) => x.slug)).toEqual(["the-safari-collection"]);
      expect(p.features.PERK).toHaveLength(1);
      expect(p.addOns).toEqual([
        expect.objectContaining({
          name: "Private exclusive vehicle",
          unit: "PER_DAY",
          price: { amountMinor: 49_000, currency: "USD" },
        }),
      ]);
    });

    it.each([...DRAFTS, "no-such-package"])("hides %s (draft or unknown) as 404", async (slug) => {
      const res = await http().get(`/v1/packages/${slug}`).expect(404);
      expect(res.body.error.code).toBe("NOT_FOUND");
    });
  });

  describe("GET /v1/packages/:slug/quote", () => {
    it("quotes the Grand Escape at exactly US$8,488 (M1 acceptance)", async () => {
      const res = await http()
        .get("/v1/packages/giraffe-manor-grand-escape/quote")
        .query({ checkIn: "2026-11-10" })
        .expect(200);
      const q = Quote.parse(res.body);
      expect(q).toMatchObject({
        packageSlug: "giraffe-manor-grand-escape",
        checkIn: "2026-11-10",
        checkOut: "2026-11-13",
        nights: 3,
        party: { adults: 2, children: 0 },
        season: { name: "2026" },
        total: { amountMinor: 848_800, currency: "USD" },
        availability: "ON_REQUEST",
      });
    });

    it("prices by check-in season and adds the private vehicle per day", async () => {
      const detail = PackageDetail.parse(
        (await http().get("/v1/packages/ultimate-safari-collection-journey").expect(200)).body,
      );
      const vehicle = detail.addOns[0].id;

      const peak = Quote.parse(
        (
          await http()
            .get("/v1/packages/ultimate-safari-collection-journey/quote")
            .query({ checkIn: "2026-10-05" })
            .expect(200)
        ).body,
      );
      expect(peak.total.amountMinor).toBe(4_484_800);

      const savings = Quote.parse(
        (
          await http()
            .get("/v1/packages/ultimate-safari-collection-journey/quote")
            .query({ checkIn: "2026-11-10", addOns: `${vehicle}:1` })
            .expect(200)
        ).body,
      );
      expect(savings.lines.map((l) => [l.kind, l.quantity, l.amount.amountMinor])).toEqual([
        ["PACKAGE", 1, 3_088_900],
        ["ADD_ON", 10, 490_000],
      ]);
      expect(savings.total.amountMinor).toBe(3_578_900);
    });

    it.each([
      [{ checkIn: "2026-09-01" }, "CHECK_IN_IN_PAST"],
      [{ checkIn: "2027-03-01" }, "NO_RATE_FOR_DATE"],
      [{ checkIn: "2026-11-10", nights: 2 }, "BELOW_MIN_NIGHTS"],
      [{ checkIn: "2026-11-10", nights: 4 }, "EXTRA_NIGHTS_NOT_SOLD"],
      [{ checkIn: "2026-11-10", currency: "NGN" }, "CURRENCY_NOT_AVAILABLE"],
      [{ checkIn: "2026-11-10", addOns: "0192a0b2-0000-7000-8000-000000000001:1" }, "UNKNOWN_ADD_ON"],
      [{ checkIn: "2026-02-30" }, "VALIDATION_FAILED"],
      [{}, "VALIDATION_FAILED"],
    ])("refuses %j with %s", async (query, code) => {
      const res = await http().get("/v1/packages/giraffe-manor-grand-escape/quote").query(query).expect(422);
      expect(res.body.error.code).toBe(code);
      expect(res.body.error.requestId).toEqual(expect.any(String));
    });

    it("won't quote a draft package", async () => {
      await http().get("/v1/packages/salas-family-safari/quote").query({ checkIn: "2026-11-10" }).expect(404);
    });
  });

  describe("reference data", () => {
    it("lists destinations and partners", async () => {
      const d = DestinationList.parse((await http().get("/v1/destinations").expect(200)).body);
      expect(d.items).toEqual(
        expect.arrayContaining([
          { slug: "masai-mara", name: "Masai Mara", country: "KE" },
          { slug: "nairobi", name: "Nairobi", country: "KE" },
          { slug: "samburu", name: "Samburu", country: "KE" },
        ]),
      );
      const p = PartnerList.parse((await http().get("/v1/partners").expect(200)).body);
      expect(p.items.map((x) => x.slug)).toEqual(expect.arrayContaining(["giraffe-manor", "the-safari-collection"]));
    });
  });

  // Runs after the read tests above, which rely on the seed having no media.
  describe("media", () => {
    const prisma = new PrismaClient({ datasourceUrl: TEST_DATABASE_URL });
    let pkgId: string;
    let lodgeId: string;
    const photo = (path: string) => ({ id: uuidv7(), path, alt: `Alt for ${path}`, width: 1600, height: 1067 });

    beforeAll(async () => {
      pkgId = (await prisma.package.findUniqueOrThrow({ where: { slug: "giraffe-manor-grand-escape" } })).id;
      lodgeId = (await prisma.property.findUniqueOrThrow({ where: { slug: "giraffe-manor" } })).id;
      // Inserted out of order so the API's ordering is what's under test.
      await prisma.packageMedia.createMany({
        data: [
          { ...photo(`packages/${pkgId}/poster.jpg`), packageId: pkgId, role: "POSTER", sortKey: "a" },
          { ...photo(`packages/${pkgId}/dining.jpg`), packageId: pkgId, role: "GALLERY", sortKey: "b" },
          {
            ...photo(`packages/${pkgId}/breakfast-video.jpg`),
            packageId: pkgId,
            role: "GALLERY",
            sortKey: "a",
            caption: "Breakfast with the giraffes",
            videoProvider: "YOUTUBE",
            videoId: "dQw4w9WgXcQ",
          },
          { ...photo(`packages/${pkgId}/hero.jpg`), packageId: pkgId, role: "HERO", sortKey: "m" },
        ],
      });
      await prisma.propertyMedia.createMany({
        data: [
          { ...photo(`properties/${lodgeId}/suite.jpg`), propertyId: lodgeId, sortKey: "b" },
          {
            ...photo(`properties/${lodgeId}/tour-video.jpg`),
            propertyId: lodgeId,
            sortKey: "a",
            videoProvider: "VIMEO",
            videoId: "123456789:abcdef1234",
          },
        ],
      });
    });
    afterAll(() => prisma.$disconnect());

    it("puts the HERO photo on the package card and nowhere else", async () => {
      const body = PackageList.parse((await http().get("/v1/packages").expect(200)).body);
      const withHero = body.items.filter((p) => p.hero !== null);
      expect(withHero.map((p) => p.slug)).toEqual(["giraffe-manor-grand-escape"]);
      expect(withHero[0].hero).toEqual({
        alt: `Alt for packages/${pkgId}/hero.jpg`,
        caption: null,
        src: `/media/packages/${pkgId}/hero.jpg`,
        width: 1600,
        height: 1067,
        video: null,
      });
    });

    it("orders package media HERO, GALLERY, POSTER and embeds videos by id", async () => {
      const p = PackageDetail.parse((await http().get("/v1/packages/giraffe-manor-grand-escape").expect(200)).body);
      expect(p.media.map((m) => [m.role, m.src.split("/").pop()])).toEqual([
        ["HERO", "hero.jpg"],
        ["GALLERY", "breakfast-video.jpg"],
        ["GALLERY", "dining.jpg"],
        ["POSTER", "poster.jpg"],
      ]);
      expect(p.media[1]).toMatchObject({
        caption: "Breakfast with the giraffes",
        video: {
          provider: "YOUTUBE",
          id: "dQw4w9WgXcQ",
          embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
        },
      });
    });

    it("shows the lodge's gallery on every package that stays there", async () => {
      for (const slug of ["giraffe-manor-grand-escape", "giraffe-manor-signature-escape"]) {
        const p = PackageDetail.parse((await http().get(`/v1/packages/${slug}`).expect(200)).body);
        const lodge = p.stays[0].property.media;
        expect(lodge.map((m) => m.src.split("/").pop())).toEqual(["tour-video.jpg", "suite.jpg"]);
        expect(lodge[0].video?.embedUrl).toBe("https://player.vimeo.com/video/123456789?dnt=1&h=abcdef1234");
      }
      const other = PackageDetail.parse((await http().get("/v1/packages/sala-mara-escape").expect(200)).body);
      expect(other.media).toEqual([]);
      expect(other.stays.flatMap((s) => s.property.media)).toEqual([]);
    });
  });

  describe("OpenAPI", () => {
    it("documents every catalogue route, its query parameters and response schemas", async () => {
      const spec = (await http().get("/docs/openapi.json").expect(200)).body;
      expect(Object.keys(spec.paths)).toEqual(
        expect.arrayContaining([
          "/v1/packages",
          "/v1/packages/{slug}",
          "/v1/packages/{slug}/quote",
          "/v1/destinations",
          "/v1/partners",
        ]),
      );
      const quoteOp = spec.paths["/v1/packages/{slug}/quote"].get;
      expect(quoteOp.parameters.map((p: { name: string }) => p.name)).toEqual(
        expect.arrayContaining(["slug", "checkIn", "nights", "currency", "addOns"]),
      );
      expect(quoteOp.parameters.find((p: { name: string }) => p.name === "checkIn").required).toBe(true);
      expect(quoteOp.responses["200"].content["application/json"].schema).toEqual({
        $ref: "#/components/schemas/Quote",
      });
      expect(Object.keys(spec.components.schemas)).toEqual(
        expect.arrayContaining(["PackageList", "PackageDetail", "Quote", "DestinationList", "PartnerList"]),
      );
    });
  });
});
