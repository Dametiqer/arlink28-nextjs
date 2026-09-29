import { Currency, fromPrice, type PricingSeason } from "@arlink28/shared";
import type { Prisma, PrismaClient } from "@prisma/client";
import { uuidv7 } from "../ids";
import { DESTINATIONS, FEATURES, PACKAGES, PARTNERS, PROPERTIES, SEASONS, type SeedPackage } from "./catalogue-data";

export type SeedSummary = {
  packages: { slug: string; status: string; action: "created" | "updated" }[];
  drafts: { slug: string; dataIssue: string }[];
};

type Tx = Prisma.TransactionClient;
const BASE_CURRENCY: Currency = "USD";

const toDate = (iso: string) => new Date(`${iso}T00:00:00Z`);

/**
 * Validates the seed against the catalogue invariants (docs/packages-api-plan.md §3)
 * before touching the database, so a bad transcription fails loudly instead of
 * publishing a wrong price.
 */
export function validateSeed(packages: SeedPackage[] = PACKAGES): void {
  const problems: string[] = [];
  const featureKeys = new Set(FEATURES.map((f) => f.key));
  const seasons = new Map<string, readonly (readonly [string, string])[]>(SEASONS.map((s) => [s.slug, s.ranges]));
  const properties = new Set(PROPERTIES.map((p) => p.slug));
  const destinations = new Set(DESTINATIONS.map((d) => d.slug));
  const slugs = new Set<string>();

  for (const p of packages) {
    const where = `package ${p.slug}`;
    if (slugs.has(p.slug)) problems.push(`${where}: duplicate slug`);
    slugs.add(p.slug);
    if (!destinations.has(p.destination)) problems.push(`${where}: unknown destination ${p.destination}`);
    if (p.minNights < 1 || p.nights < p.minNights) problems.push(`${where}: nights/minNights out of order`);
    const stayNights = p.stays.reduce((n, s) => n + s.nights, 0);
    if (p.stays.length && stayNights !== p.nights)
      problems.push(`${where}: stays sum to ${stayNights}, not ${p.nights}`);
    for (const s of p.stays) if (!properties.has(s.property)) problems.push(`${where}: unknown property ${s.property}`);
    for (const items of Object.values(p.features)) {
      for (const f of items ?? [])
        if ("key" in f && !featureKeys.has(f.key)) problems.push(`${where}: unknown feature ${f.key}`);
    }
    if (p.rates.length === 0) problems.push(`${where}: no rates`);
    if (p.status === "DRAFT" && !p.dataIssue) problems.push(`${where}: DRAFT without a dataIssue`);

    // Invariant 3: one base-currency price per check-in date.
    const ranges = p.rates.flatMap((r) => {
      const found = seasons.get(r.season);
      if (!found) problems.push(`${where}: unknown season ${r.season}`);
      return (found ?? []).map(([start, end]) => ({ season: r.season, start, end }));
    });
    for (const a of ranges) {
      for (const b of ranges) {
        if (a !== b && a.season !== b.season && a.start <= b.end && b.start <= a.end) {
          problems.push(`${where}: seasons ${a.season} and ${b.season} overlap`);
        }
      }
    }
  }
  if (problems.length) throw new Error(`Invalid catalogue seed:\n- ${[...new Set(problems)].join("\n- ")}`);
}

async function upsertBySlug<T extends { id: string }>(
  find: () => Promise<T | null>,
  create: (id: string) => Promise<T>,
  update: (existing: T) => Promise<T>,
): Promise<T> {
  const existing = await find();
  return existing ? update(existing) : create(uuidv7());
}

async function seedReferenceData(tx: Tx) {
  const destinations = new Map<string, string>();
  for (const d of DESTINATIONS) {
    const row = await upsertBySlug(
      () => tx.destination.findUnique({ where: { slug: d.slug } }),
      (id) => tx.destination.create({ data: { id, ...d } }),
      (e) => tx.destination.update({ where: { id: e.id }, data: { name: d.name, country: d.country } }),
    );
    destinations.set(d.slug, row.id);
  }

  const partners = new Map<string, string>();
  for (const p of PARTNERS) {
    const row = await upsertBySlug(
      () => tx.partner.findUnique({ where: { slug: p.slug } }),
      (id) => tx.partner.create({ data: { id, ...p } }),
      (e) => tx.partner.update({ where: { id: e.id }, data: { name: p.name, tagline: p.tagline } }),
    );
    partners.set(p.slug, row.id);
  }

  const properties = new Map<string, string>();
  for (const p of PROPERTIES) {
    const data = { name: p.name, partnerId: partners.get(p.partner)!, destinationId: destinations.get(p.destination)! };
    const row = await upsertBySlug(
      () => tx.property.findUnique({ where: { slug: p.slug } }),
      (id) => tx.property.create({ data: { id, slug: p.slug, ...data } }),
      (e) => tx.property.update({ where: { id: e.id }, data }),
    );
    properties.set(p.slug, row.id);
  }

  const features = new Map<string, string>();
  for (const f of FEATURES) {
    const row = await upsertBySlug(
      () => tx.feature.findUnique({ where: { key: f.key } }),
      (id) => tx.feature.create({ data: { id, ...f } }),
      (e) => tx.feature.update({ where: { id: e.id }, data: { label: f.label, icon: f.icon } }),
    );
    features.set(f.key, row.id);
  }

  const seasons = new Map<string, PricingSeason>();
  for (const s of SEASONS) {
    const data = { name: s.name, partnerId: partners.get(s.partner)! };
    const row = await upsertBySlug(
      () => tx.season.findUnique({ where: { slug: s.slug } }),
      (id) => tx.season.create({ data: { id, slug: s.slug, ...data } }),
      (e) => tx.season.update({ where: { id: e.id }, data }),
    );
    await tx.seasonRange.deleteMany({ where: { seasonId: row.id } });
    await tx.seasonRange.createMany({
      data: s.ranges.map(([start, end]) => ({
        id: uuidv7(),
        seasonId: row.id,
        startDate: toDate(start),
        endDate: toDate(end),
      })),
    });
    seasons.set(s.slug, { id: row.id, name: s.name, ranges: s.ranges.map(([start, end]) => ({ start, end })) });
  }

  return { destinations, properties, features, seasons };
}

async function seedPackage(
  tx: Tx,
  p: SeedPackage,
  refs: Awaited<ReturnType<typeof seedReferenceData>>,
  today: string,
): Promise<"created" | "updated"> {
  const from = fromPrice(
    {
      baseCurrency: BASE_CURRENCY,
      seasons: p.rates.map((r) => refs.seasons.get(r.season)!),
      rates: p.rates.map((r) => ({
        seasonId: refs.seasons.get(r.season)!.id,
        currency: BASE_CURRENCY,
        priceMinor: r.priceMinor,
        extraNightPriceMinor: null,
      })),
    },
    today,
  );
  const scalars = {
    status: p.status,
    title: p.title,
    subtitle: p.subtitle,
    summary: p.summary,
    category: p.category,
    destinationId: refs.destinations.get(p.destination)!,
    nights: p.nights,
    minNights: p.minNights,
    adults: p.adults,
    children: p.children,
    baseCurrency: BASE_CURRENCY,
    fromPriceMinor: from ? BigInt(from.amountMinor) : null,
    sortOrder: p.sortOrder,
  };

  const existing = await tx.package.findUnique({ where: { slug: p.slug } });
  const publishedAt = p.status === "PUBLISHED" ? (existing?.publishedAt ?? new Date()) : null;
  const row = existing
    ? await tx.package.update({
        where: { id: existing.id },
        data: { ...scalars, publishedAt, version: { increment: 1 } },
      })
    : await tx.package.create({ data: { id: uuidv7(), slug: p.slug, ...scalars, publishedAt } });

  // Child lists are replaced wholesale, the same way the admin API's PUTs will (plan D5).
  const packageId = row.id;
  await tx.packageStay.deleteMany({ where: { packageId } });
  await tx.packageFeature.deleteMany({ where: { packageId } });
  await tx.packageRate.deleteMany({ where: { packageId } });
  await tx.packageAddOn.deleteMany({ where: { packageId } });

  await tx.packageStay.createMany({
    data: p.stays.map((s, i) => ({
      id: uuidv7(),
      packageId,
      propertyId: refs.properties.get(s.property)!,
      nights: s.nights,
      roomType: s.roomType ?? null,
      sortOrder: i,
    })),
  });
  await tx.packageFeature.createMany({
    data: Object.entries(p.features).flatMap(([section, items]) =>
      (items ?? []).map((f, i) => ({
        id: uuidv7(),
        packageId,
        section: section as keyof SeedPackage["features"],
        featureId: "key" in f ? refs.features.get(f.key)! : null,
        labelOverride: "key" in f ? (f.label ?? null) : f.text,
        footnote: f.footnote ?? null,
        sortOrder: i,
      })),
    ),
  });
  await tx.packageRate.createMany({
    data: p.rates.map((r) => ({
      id: uuidv7(),
      packageId,
      seasonId: refs.seasons.get(r.season)!.id,
      currency: BASE_CURRENCY,
      priceMinor: BigInt(r.priceMinor),
    })),
  });
  await tx.packageAddOn.createMany({
    data: p.addOns.map((a, i) => ({
      id: uuidv7(),
      packageId,
      name: a.name,
      description: a.description ?? null,
      unit: a.unit,
      currency: BASE_CURRENCY,
      priceMinor: BigInt(a.priceMinor),
      sortOrder: i,
    })),
  });

  await tx.auditLog.create({
    data: {
      id: uuidv7(),
      actorId: null,
      action: existing ? "seed.package.update" : "seed.package.create",
      entityType: "package",
      entityId: packageId,
      after: { slug: p.slug, status: p.status, rates: p.rates, sources: p.sources },
    },
  });
  return existing ? "updated" : "created";
}

/**
 * Loads the poster catalogue. Idempotent: rows are matched by natural key
 * (slug/key), and each seeded package's child lists are replaced, so re-running
 * resets those packages to the poster data. Packages not in the seed are untouched.
 */
export async function seedCatalogue(prisma: PrismaClient, opts: { today: string }): Promise<SeedSummary> {
  validateSeed();
  return prisma.$transaction(
    async (tx) => {
      const refs = await seedReferenceData(tx);
      const summary: SeedSummary = { packages: [], drafts: [] };
      for (const p of PACKAGES) {
        const action = await seedPackage(tx, p, refs, opts.today);
        summary.packages.push({ slug: p.slug, status: p.status, action });
        if (p.dataIssue) summary.drafts.push({ slug: p.slug, dataIssue: p.dataIssue });
      }
      return summary;
    },
    { timeout: 60_000 },
  );
}
