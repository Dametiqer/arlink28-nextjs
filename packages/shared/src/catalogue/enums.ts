import { z } from "zod";

// Mirrors of the Prisma enums in packages/db. They are redeclared here because
// this package is browser-safe and must not import the database package;
// apps/api/src/catalogue/enums.spec.ts fails if the two ever drift apart.

export const FEATURE_SECTIONS = [
  "INCLUDED",
  "PREMIUM_SERVICE",
  "HIGHLIGHT",
  "VEHICLE",
  "PERK",
  "EXCLUDED",
  "NOTE",
] as const;
export const FeatureSection = z.enum(FEATURE_SECTIONS);
export type FeatureSection = z.infer<typeof FeatureSection>;

export const AddOnUnit = z.enum(["PER_STAY", "PER_NIGHT", "PER_DAY", "PER_PERSON"]);
export type AddOnUnit = z.infer<typeof AddOnUnit>;

export const PricingBasis = z.enum(["PER_PARTY", "PER_PERSON"]);
export type PricingBasis = z.infer<typeof PricingBasis>;

export const ImageRole = z.enum(["HERO", "GALLERY", "POSTER"]);
export type ImageRole = z.infer<typeof ImageRole>;
