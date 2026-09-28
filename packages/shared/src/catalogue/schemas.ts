import { z } from "zod";
import { IsoDate } from "../dates";
import { Currency, Money } from "../money";
import { PageQuery, pageOf } from "../pagination";
import { AddOnUnit, FEATURE_SECTIONS, FeatureSection, ImageRole, PricingBasis } from "./enums";

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

export const PackageImageItem = z.object({
  role: ImageRole,
  alt: z.string(),
  src: z.string(),
  width: z.number().int(),
  height: z.number().int(),
});
export type PackageImageItem = z.infer<typeof PackageImageItem>;

export const PackageDetail = PackageCard.extend({
  description: z.string().nullable(),
  seo: z.object({ title: z.string().nullable(), description: z.string().nullable() }),
  stays: z.array(
    z.object({
      property: z.object({ slug: z.string(), name: z.string(), destination: DestinationSummary }),
      nights: z.number().int(),
      roomType: z.string().nullable(),
    }),
  ),
  features: PackageFeatures,
  seasons: z.array(PackageSeason),
  addOns: z.array(PackageAddOnItem),
  /** Filled from M4 (image uploads); empty until then. */
  images: z.array(PackageImageItem),
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
