import type { Prisma } from "@arlink28/db";
import {
  Currency,
  FEATURE_SECTIONS,
  fromPrice,
  upcomingSeasons,
  type PackageCard,
  type PackageDetail,
  type PackageFeatures,
  type PricingPackage,
  type PricingSeason,
} from "@arlink28/shared";
import { minorToNumber } from "../common/money";

// Prisma rows → wire contracts. The only place BIGINT money and DATE columns
// cross into API types (numbers and ISO date strings).

export const cardInclude = {
  destination: true,
  stays: {
    orderBy: { sortOrder: "asc" },
    include: { property: { include: { partner: true, destination: true } } },
  },
  rates: { include: { season: { include: { ranges: { orderBy: { startDate: "asc" } } } } } },
  addOns: { orderBy: { sortOrder: "asc" } },
} satisfies Prisma.PackageInclude;

export const detailInclude = {
  ...cardInclude,
  features: { orderBy: [{ section: "asc" }, { sortOrder: "asc" }], include: { feature: true } },
  images: { orderBy: [{ role: "asc" }, { sortKey: "asc" }] },
} satisfies Prisma.PackageInclude;

export type CardRow = Prisma.PackageGetPayload<{ include: typeof cardInclude }>;
export type DetailRow = Prisma.PackageGetPayload<{ include: typeof detailInclude }>;

const isoDate = (d: Date) => d.toISOString().slice(0, 10);

/** The pure pricing view of a package (shared/catalogue/pricing.ts). */
export function toPricing(row: CardRow): PricingPackage {
  const seasons = new Map<string, PricingSeason>();
  for (const r of row.rates) {
    seasons.set(r.season.id, {
      id: r.season.id,
      name: r.season.name,
      ranges: r.season.ranges.map((x) => ({ start: isoDate(x.startDate), end: isoDate(x.endDate) })),
    });
  }
  return {
    nights: row.nights,
    minNights: row.minNights,
    adults: row.adults,
    children: row.children,
    baseCurrency: Currency.parse(row.baseCurrency),
    seasons: [...seasons.values()],
    rates: row.rates.map((r) => ({
      seasonId: r.seasonId,
      currency: Currency.parse(r.currency),
      priceMinor: minorToNumber(r.priceMinor),
      extraNightPriceMinor: r.extraNightPriceMinor === null ? null : minorToNumber(r.extraNightPriceMinor),
    })),
    addOns: row.addOns.map((a) => ({
      id: a.id,
      name: a.name,
      unit: a.unit,
      currency: Currency.parse(a.currency),
      priceMinor: minorToNumber(a.priceMinor),
    })),
  };
}

const destination = (d: { slug: string; name: string; country: string }) => ({
  slug: d.slug,
  name: d.name,
  country: d.country,
});

export function toCard(row: CardRow, today: string): PackageCard {
  const partners = new Map<string, PackageCard["partners"][number]>();
  for (const s of row.stays) {
    const p = s.property.partner;
    partners.set(p.slug, { slug: p.slug, name: p.name, tagline: p.tagline });
  }
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle,
    summary: row.summary,
    category: row.category,
    destination: destination(row.destination),
    partners: [...partners.values()],
    nights: row.nights,
    minNights: row.minNights,
    party: { adults: row.adults, children: row.children },
    pricingBasis: row.pricingBasis,
    // Computed from live seasons rather than read from from_price_minor, which only
    // gets refreshed on writes and would go stale as seasons end.
    fromPrice: fromPrice(toPricing(row), today),
    featured: row.featured,
  };
}

export function toDetail(row: DetailRow, today: string): PackageDetail {
  const pricing = toPricing(row);
  const features = Object.fromEntries(FEATURE_SECTIONS.map((s) => [s, []])) as unknown as PackageFeatures;
  for (const f of row.features) {
    features[f.section].push({
      label: f.labelOverride ?? f.feature?.label ?? "",
      icon: f.feature?.icon ?? null,
      footnote: f.footnote,
    });
  }
  return {
    ...toCard(row, today),
    description: row.description,
    seo: { title: row.seoTitle, description: row.seoDescription },
    stays: row.stays.map((s) => ({
      property: { slug: s.property.slug, name: s.property.name, destination: destination(s.property.destination) },
      nights: s.nights,
      roomType: s.roomType,
    })),
    features,
    seasons: upcomingSeasons(pricing.seasons, today).map((s) => ({
      ...s,
      prices: pricing.rates
        .filter((r) => r.seasonId === s.id)
        .map((r) => ({ amountMinor: r.priceMinor, currency: r.currency })),
    })),
    addOns: row.addOns.map((a, i) => ({
      id: a.id,
      name: a.name,
      description: a.description,
      unit: a.unit,
      price: { amountMinor: pricing.addOns[i].priceMinor, currency: pricing.addOns[i].currency },
    })),
    images: row.images.map((img) => ({
      role: img.role,
      alt: img.alt,
      src: `/media/${img.path}`,
      width: img.width,
      height: img.height,
    })),
  };
}
