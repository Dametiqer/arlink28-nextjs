import { z } from "zod";
import { IsoDate } from "../dates";
import { Currency, Money } from "../money";
import { PageQuery, pageOf } from "../pagination";
import { AddOnUnit, FEATURE_SECTIONS, FeatureSection, MediaRole, PricingBasis, VideoProvider } from "./enums";

// Wire contracts for the public catalogue API (GET /v1/packages*, /v1/destinations,
// /v1/partners). apps/api validates requests and documents responses with these;
// apps/web consumes the inferred types.

export const Slug = z
  .string()
  .max(120)
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Expected a lowercase-hyphenated slug");

const Uuid = z.string().uuid();

// ---- requests ----------------------------------------------------------------

const BooleanString = z.enum(["true", "false"]).transform((v) => v === "true");

export const PackageListQuery = PageQuery.extend({
  destination: Slug.optional(),
  partner: Slug.optional(),
  category: z.string().max(40).optional(),
  adults: z.coerce.number().int().min(1).max(20).optional(),
  children: z.coerce.number().int().min(0).max(20).optional(),
  featured: BooleanString.optional(),
});
export type PackageListQuery = z.infer<typeof PackageListQuery>;

/** `addOns=<id>:<qty>,<id>:<qty>` — qty defaults to 1 (e.g. number of private vehicles). */
const AddOnSelection = z
  .string()
  .max(1000)
  .transform((raw, ctx) => {
    const out: { id: string; quantity: number }[] = [];
    for (const part of raw.split(",").filter(Boolean)) {
      const [id, qty = "1"] = part.split(":");
      const quantity = Number(qty);
      if (!Uuid.safeParse(id).success || !Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Invalid add-on selection "${part}" (expected <id>:<1-10>)`,
        });
        return z.NEVER;
      }
      out.push({ id, quantity });
    }
    return out;
  });

export const QuoteQuery = z.object({
  checkIn: IsoDate,
  nights: z.coerce.number().int().min(1).max(60).optional(),
  currency: Currency.optional(),
  addOns: AddOnSelection.optional(),
});
export type QuoteQuery = z.infer<typeof QuoteQuery>;

// ---- responses ---------------------------------------------------------------

export const DestinationSummary = z.object({
  slug: z.string(),
  name: z.string(),
  country: z.string().length(2),
});
export type DestinationSummary = z.infer<typeof DestinationSummary>;

export const PartnerSummary = z.object({
  slug: z.string(),
  name: z.string(),
  tagline: z.string().nullable(),
});
export type PartnerSummary = z.infer<typeof PartnerSummary>;

export const Party = z.object({ adults: z.number().int(), children: z.number().int() });

/**
 * A photo, or a video shown as its thumbnail photo until played. `src` is always
 * a photo on our host; `video` says what to embed when the viewer presses play.
 */
export const MediaItem = z.object({
  alt: z.string(),
  caption: z.string().nullable(),
  src: z.string(),
  width: z.number().int(),
  height: z.number().int(),
  video: z.object({ provider: VideoProvider, id: z.string(), embedUrl: z.string().url() }).nullable(),
});
export type MediaItem = z.infer<typeof MediaItem>;

export const PackageCard = z.object({
  id: Uuid,
  slug: z.string(),
  title: z.string(),
  subtitle: z.string().nullable(),
  summary: z.string(),
  category: z.string(),
  destination: DestinationSummary,
  partners: z.array(PartnerSummary),
  nights: z.number().int(),
  minNights: z.number().int(),
  party: Party,
  pricingBasis: PricingBasis,
  /** Cheapest bookable base-currency rate; null when no season has upcoming dates. */
  fromPrice: Money.nullable(),
  featured: z.boolean(),
  /** The package's HERO photo; null until one is uploaded (publishing will require it from M3). */
  hero: MediaItem.nullable(),
});
export type PackageCard = z.infer<typeof PackageCard>;

export const PackageList = pageOf(PackageCard);
export type PackageList = z.infer<typeof PackageList>;

export const PackageFeatureItem = z.object({
  label: z.string(),
  /** Font Awesome icon name; null for free-text items (perks, notes). */
  icon: z.string().nullable(),
  footnote: z.string().nullable(),
});
export type PackageFeatureItem = z.infer<typeof PackageFeatureItem>;

/** Every section is always present (possibly empty), so clients never null-check. */
export const PackageFeatures = z.object(
  Object.fromEntries(FEATURE_SECTIONS.map((s) => [s, z.array(PackageFeatureItem)])) as Record<
    FeatureSection,
    z.ZodArray<typeof PackageFeatureItem>
  >,
);
export type PackageFeatures = z.infer<typeof PackageFeatures>;

export const PackageSeason = z.object({
  id: Uuid,
  name: z.string(),
  /** Inclusive check-in date ranges, upcoming only. */
  ranges: z.array(z.object({ start: IsoDate, end: IsoDate })),
  prices: z.array(Money),
});
export type PackageSeason = z.infer<typeof PackageSeason>;

export const PackageAddOnItem = z.object({
  id: Uuid,
  name: z.string(),
  description: z.string().nullable(),
  unit: AddOnUnit,
  price: Money,
});
export type PackageAddOnItem = z.infer<typeof PackageAddOnItem>;

export const PackageMediaItem = MediaItem.extend({ role: MediaRole });
export type PackageMediaItem = z.infer<typeof PackageMediaItem>;

export const PackageDetail = PackageCard.extend({
  description: z.string().nullable(),
  seo: z.object({ title: z.string().nullable(), description: z.string().nullable() }),
  stays: z.array(
    z.object({
      property: z.object({
        slug: z.string(),
        name: z.string(),
        destination: DestinationSummary,
        /** The lodge's own gallery, shared by every package that stays there. */
        media: z.array(MediaItem),
      }),
      nights: z.number().int(),
      roomType: z.string().nullable(),
    }),
  ),
  features: PackageFeatures,
  seasons: z.array(PackageSeason),
  addOns: z.array(PackageAddOnItem),
  /** HERO, then GALLERY (photos and videos in admin order), then POSTER. Filled from M4. */
  media: z.array(PackageMediaItem),
});
export type PackageDetail = z.infer<typeof PackageDetail>;

export const QuoteLine = z.object({
  kind: z.enum(["PACKAGE", "EXTRA_NIGHTS", "ADD_ON"]),
  addOnId: Uuid.optional(),
  label: z.string(),
  quantity: z.number().int(),
  unitPrice: Money,
  amount: Money,
});

export const Quote = z.object({
  packageSlug: z.string(),
  checkIn: IsoDate,
  checkOut: IsoDate,
  nights: z.number().int(),
  party: Party,
  season: z.object({ id: Uuid, name: z.string() }),
  lines: z.array(QuoteLine),
  total: Money,
  /** Prices are advisory; availability is confirmed with the property before payment. */
  availability: z.literal("ON_REQUEST"),
});
export type Quote = z.infer<typeof Quote>;

export const DestinationList = z.object({ items: z.array(DestinationSummary) });
export const PartnerList = z.object({ items: z.array(PartnerSummary) });
