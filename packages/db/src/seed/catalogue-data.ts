// Initial package catalogue, transcribed from the 17 partner posters in
// "Company docs/Packages/" (2026-09-25). 17 posters → 13 packages: posters for
// the same stay in different seasons are one package with one rate per season.
//
// Packages whose posters contradict each other are seeded as DRAFT with the
// most defensible reading and a `dataIssue` explaining it — they stay off the
// public API until someone confirms the numbers and publishes them.

export type FeatureRef =
  | { key: string; label?: string; footnote?: string } // library feature, optional per-package wording
  | { text: string; footnote?: string }; // free text (perks, vehicle notes, one-off notes)

export type SeedPackage = {
  slug: string;
  status: "DRAFT" | "PUBLISHED";
  title: string;
  subtitle: string;
  summary: string;
  category: string;
  destination: string;
  nights: number;
  minNights: number;
  adults: number;
  children: number;
  sortOrder: number;
  stays: { property: string; nights: number; roomType?: string }[];
  features: {
    INCLUDED?: FeatureRef[];
    PREMIUM_SERVICE?: FeatureRef[];
    HIGHLIGHT?: FeatureRef[];
    VEHICLE?: FeatureRef[];
    PERK?: FeatureRef[];
    EXCLUDED?: FeatureRef[];
    NOTE?: FeatureRef[];
  };
  rates: { season: string; priceMinor: number }[];
  addOns: {
    name: string;
    description?: string;
    unit: "PER_STAY" | "PER_NIGHT" | "PER_DAY" | "PER_PERSON";
    priceMinor: number;
  }[];
  /** Poster file names (in Company docs/Packages) this package was transcribed from. */
  sources: string[];
  /** Why a package is DRAFT: the contradiction a human must resolve before publishing. */
  dataIssue?: string;
};

export const DESTINATIONS = [
  { slug: "nairobi", name: "Nairobi", country: "KE" },
  { slug: "masai-mara", name: "Masai Mara", country: "KE" },
  { slug: "samburu", name: "Samburu", country: "KE" },
];

export const PARTNERS = [
  { slug: "giraffe-manor", name: "Giraffe Manor", tagline: "An exclusive partnership. Extraordinary experiences." },
  { slug: "the-safari-collection", name: "The Safari Collection", tagline: null },
];

export const PROPERTIES = [
  { slug: "giraffe-manor", name: "Giraffe Manor", partner: "giraffe-manor", destination: "nairobi" },
  { slug: "salas-camp", name: "Sala's Camp", partner: "the-safari-collection", destination: "masai-mara" },
  { slug: "sasaab", name: "Sasaab", partner: "the-safari-collection", destination: "samburu" },
];

export const SEASONS = [
  {
    slug: "safari-collection-savings-2026",
    name: "Savings Season 2026",
    partner: "the-safari-collection",
    ranges: [
      ["2026-01-06", "2026-05-31"],
      ["2026-11-01", "2026-12-15"],
    ],
  },
  {
    slug: "safari-collection-peak-2026",
    name: "Peak Season 2026",
    partner: "the-safari-collection",
    ranges: [
      ["2026-01-01", "2026-01-05"],
      ["2026-06-01", "2026-10-31"],
      ["2026-12-16", "2026-12-31"],
    ],
  },
  {
    // The Giraffe Manor posters carry no dates. Assumed valid for check-ins in
    // calendar 2026 until the partner confirms (see docs/packages-api-plan.md).
    slug: "giraffe-manor-2026",
    name: "2026",
    partner: "giraffe-manor",
    ranges: [["2026-01-01", "2026-12-31"]],
  },
] as const;

/** Reusable inclusion/exclusion items; icons are Font Awesome 6 (free) names, already loaded site-wide. */
export const FEATURES = [
  // stay
  { key: "luxury-tent-plunge-pool", label: "Luxury tent with private plunge pool", icon: "bed" },
  { key: "nights-at-property", label: "Nights at the property", icon: "bed" },
  { key: "luxury-accommodation", label: "Luxury accommodation", icon: "house" },
  // food & drink
  { key: "all-meals", label: "All meals", icon: "utensils" },
  { key: "house-wines", label: "House wines", icon: "wine-glass" },
  { key: "house-soft-drinks", label: "House soft drinks", icon: "glass-water" },
  { key: "house-beers", label: "House beers", icon: "beer-mug-empty" },
  { key: "house-spirits", label: "House spirits", icon: "martini-glass" },
  { key: "house-drinks", label: "House wines, soft drinks, beers & spirits", icon: "wine-glass" },
  { key: "bush-meals", label: "Bush meals", icon: "bell-concierge" },
  { key: "sundowners", label: "Sundowners", icon: "sun" },
  { key: "orchid-house-dining", label: "Orchid House dining", icon: "utensils" },
  // activities
  { key: "game-drives", label: "Game drives", icon: "car-side" },
  { key: "nature-walks", label: "Nature walks", icon: "person-hiking" },
  { key: "bush-volleyball", label: "Seasonal bush volleyball", icon: "volleyball" },
  { key: "childrens-activities", label: "Children's activities", icon: "children" },
  { key: "camp-activities", label: "Other camp activities", icon: "binoculars" },
  { key: "afew-giraffe-centre", label: "AFEW Giraffe Centre entry", icon: "ticket" },
  { key: "boules-croquet", label: "Boules & croquet", icon: "baseball-bat-ball" },
  { key: "retreat-access", label: "Access to The Retreat during check-in & check-out", icon: "spa" },
  { key: "park-fees", label: "Park fees", icon: "ticket" },
  // services
  { key: "laundry", label: "Laundry", icon: "shirt" },
  { key: "wifi", label: "Wi-Fi", icon: "wifi" },
  { key: "vat", label: "VAT", icon: "receipt" },
  // transfers
  { key: "keekorok-transfers", label: "Transfers from Keekorok Airstrip", icon: "plane-arrival" },
  { key: "camp-airstrip-transfers", label: "Camp and airstrip transfers", icon: "plane-arrival" },
  { key: "airport-transfers", label: "Airport transfers", icon: "plane-arrival" },
  {
    key: "karen-langata-transfers",
    label: "Arrival & departure transfers – Karen & Langata area",
    icon: "van-shuttle",
  },
  // ARLink28 premium services
  { key: "vip-home-to-airport", label: "VIP transfer from home to airport", icon: "car" },
  { key: "vip-airport-to-resort", label: "VIP transfer from airport to resort", icon: "plane" },
  { key: "meet-and-greet", label: "Meet & greet service from the airport to the destination", icon: "people-group" },
  // accommodation highlights
  { key: "private-plunge-pools", label: "All tents have private plunge pools", icon: "water-ladder" },
  { key: "ensuite-bath", label: "En suite bathrooms with a bath", icon: "bath" },
  { key: "flushing-toilet", label: "Flushing toilet", icon: "toilet" },
  { key: "plumbed-shower", label: "Plumbed shower", icon: "shower" },
  // exclusions
  { key: "champagne", label: "Champagne", icon: "champagne-glasses" },
  { key: "luxury-spirits", label: "Luxury spirits", icon: "wine-bottle" },
  { key: "selected-wines", label: "Selected wines", icon: "wine-glass-empty" },
  { key: "cigars", label: "Cigars", icon: "smoking" },
  { key: "tips", label: "Tips", icon: "hand-holding-dollar" },
  { key: "evacuation-insurance", label: "Travel emergency evacuation insurance", icon: "kit-medical" },
  { key: "health-insurance", label: "Health insurance", icon: "notes-medical" },
  { key: "massage-treatments", label: "Massage treatments", icon: "spa" },
  { key: "personal-effects", label: "Personal effects", icon: "suitcase" },
];

// ---- shared bundles (the posters repeat these verbatim) -------------------------

const k = (key: string, label?: string, footnote?: string): FeatureRef => ({ key, label, footnote });

const SAFARI_DRINKS_AND_MEALS = [
  k("all-meals"),
  k("house-wines"),
  k("house-soft-drinks"),
  k("house-beers"),
  k("house-spirits"),
];
const SAFARI_ACTIVITIES = [k("game-drives"), k("bush-meals"), k("sundowners")];
const SAFARI_EXTRAS = [
  k("laundry"),
  k("bush-volleyball"),
  k("nature-walks"),
  k("childrens-activities"),
  k("camp-activities"),
];

const salaIncluded = (nights: number): FeatureRef[] => [
  k("luxury-tent-plunge-pool", `${nights} nights in a luxury tent with private plunge pool`),
  ...SAFARI_DRINKS_AND_MEALS,
  ...SAFARI_ACTIVITIES,
  k("keekorok-transfers"),
  ...SAFARI_EXTRAS,
];

const multiCampIncluded = (stays: [string, number][]): FeatureRef[] => [
  ...stays.map(([name, n]) => k("nights-at-property", `${n} nights in ${name}`)),
  k("luxury-accommodation"),
  ...SAFARI_DRINKS_AND_MEALS,
  ...SAFARI_ACTIVITIES,
  k("camp-airstrip-transfers"),
  ...SAFARI_EXTRAS,
];

const SAFARI_PREMIUM = [k("vip-home-to-airport"), k("vip-airport-to-resort"), k("meet-and-greet")];
const SALA_HIGHLIGHTS = [k("private-plunge-pools"), k("ensuite-bath"), k("flushing-toilet"), k("plumbed-shower")];
const MULTI_HIGHLIGHTS = [
  k("private-plunge-pools", "Private plunge pools"),
  k("ensuite-bath"),
  k("flushing-toilet"),
  k("plumbed-shower"),
];
const SAFARI_EXCLUDED = [
  "champagne",
  "luxury-spirits",
  "selected-wines",
  "cigars",
  "tips",
  "evacuation-insurance",
  "personal-effects",
].map((key) => k(key));

const salaVehicle = (packageName: string, party: string): FeatureRef[] => [
  {
    text: `For ${party}: ${packageName} guests staying in the standard Keekorok Tent with Pool or Forest Tent with Pool receive shared game-drive vehicle use.`,
  },
  { text: "Private exclusive vehicle use is available at an extra charge of $490 per day." },
];
const multiVehicle = (packageName: string): FeatureRef[] => [
  { text: `For two adults, ${packageName} guests receive shared game-drive vehicle use.` },
  { text: "Private exclusive vehicle use is available at an extra charge of $490 per day." },
];
const RETREAT_PERK: FeatureRef[] = [
  {
    text: "Eligibility for a complimentary retreat day pass and 30% off the retreat day room or early bed & breakfast package.",
  },
];
const PRIVATE_VEHICLE = {
  name: "Private exclusive vehicle",
  description: "Exclusive use of a game-drive vehicle for your party, charged per day of your stay.",
  unit: "PER_DAY" as const,
  priceMinor: 49_000,
};

const GM_INCLUDED = [
  k("all-meals"),
  k("house-drinks"),
  k("laundry", "Laundry service"),
  k("wifi"),
  k("afew-giraffe-centre"),
  k("orchid-house-dining"),
  k("retreat-access"),
  k("boules-croquet"),
  k("vat"),
  k("karen-langata-transfers", undefined, "Subject to applicable collection and departure times."),
];
const GM_PREMIUM = [
  k("vip-home-to-airport", "VIP transfer from home to airport", "If required"),
  k("meet-and-greet", "Meet & greet service at the airport"),
  k("vip-airport-to-resort"),
];
const GM_EXCLUDED = [
  "champagne",
  "luxury-spirits",
  "selected-wines",
  "tips",
  "health-insurance",
  "massage-treatments",
  "personal-effects",
].map((key) => k(key));

const SALA_SUMMARY = "Luxury tent stay with curated safari inclusions and added premium ARLink28 travel services.";
const MULTI_SUMMARY =
  "Luxury multi-destination travel with curated safari inclusions and added premium ARLink28 travel services.";
const SALA_ROOM = "Keekorok Tent with Pool or Forest Tent with Pool";
const SAVINGS = "safari-collection-savings-2026";
const PEAK = "safari-collection-peak-2026";
const GM_2026 = "giraffe-manor-2026";

export const PACKAGES: SeedPackage[] = [
  // ---- The Safari Collection: Sala's Camp, Masai Mara ---------------------------
  {
    slug: "sala-mara-escape",
    status: "PUBLISHED",
    title: "Sala Mara Escape",
    subtitle: "2-Night Fully Inclusive Luxury Masai Mara Safari Experience for Two Adults",
    summary: SALA_SUMMARY,
    category: "SAFARI",
    destination: "masai-mara",
    nights: 2,
    minNights: 2,
    adults: 2,
    children: 0,
    sortOrder: 10,
    stays: [{ property: "salas-camp", nights: 2, roomType: SALA_ROOM }],
    features: {
      INCLUDED: salaIncluded(2),
      PREMIUM_SERVICE: SAFARI_PREMIUM,
      HIGHLIGHT: SALA_HIGHLIGHTS,
      VEHICLE: salaVehicle("Sala Mara Escape", "two adults"),
      EXCLUDED: SAFARI_EXCLUDED,
    },
    rates: [{ season: SAVINGS, priceMinor: 747_200 }],
    addOns: [PRIVATE_VEHICLE],
    sources: ["WhatsApp Image 2026-09-25 at 02.19.33.jpeg"],
  },
  {
    slug: "salas-classic-safari",
    status: "PUBLISHED",
    title: "Sala's Classic Safari",
    subtitle: "3-Night Fully Inclusive Luxury Masai Mara Safari Experience for Two Adults",
    summary: SALA_SUMMARY,
    category: "SAFARI",
    destination: "masai-mara",
    nights: 3,
    minNights: 3,
    adults: 2,
    children: 0,
    sortOrder: 20,
    stays: [{ property: "salas-camp", nights: 3, roomType: SALA_ROOM }],
    features: {
      INCLUDED: salaIncluded(3),
      PREMIUM_SERVICE: SAFARI_PREMIUM,
      HIGHLIGHT: SALA_HIGHLIGHTS,
      VEHICLE: salaVehicle("Sala's Classic Safari", "two adults"),
      EXCLUDED: SAFARI_EXCLUDED,
    },
    rates: [{ season: PEAK, priceMinor: 1_775_000 }],
    addOns: [PRIVATE_VEHICLE],
    sources: ["WhatsApp Image 2026-09-25 at 02.19.33 (1).jpeg"],
  },
  {
    slug: "salas-extended-mara-experience",
    status: "DRAFT",
    title: "Sala's Extended Mara Experience",
    subtitle: "4-Night Fully Inclusive Luxury Masai Mara Safari Experience for Two Adults",
    summary: SALA_SUMMARY,
    category: "SAFARI",
    destination: "masai-mara",
    nights: 4,
    minNights: 4,
    adults: 2,
    children: 0,
    sortOrder: 30,
    stays: [{ property: "salas-camp", nights: 4, roomType: SALA_ROOM }],
    features: {
      INCLUDED: salaIncluded(4),
      PREMIUM_SERVICE: SAFARI_PREMIUM,
      HIGHLIGHT: SALA_HIGHLIGHTS,
      VEHICLE: salaVehicle("Sala's Extended Mara Experience", "two adults"),
      EXCLUDED: SAFARI_EXCLUDED,
    },
    rates: [
      { season: SAVINGS, priceMinor: 1_494_400 },
      { season: PEAK, priceMinor: 2_366_600 },
    ],
    addOns: [PRIVATE_VEHICLE],
    sources: ["WhatsApp Image 2026-09-25 at 02.19.33 (2).jpeg", "WhatsApp Image 2026-09-25 at 02.19.33 (3).jpeg"],
    dataIssue:
      "Both posters say 'Savings Season' with the same dates but show $14,944 and $23,666. $23,666 matches the peak " +
      "per-night rate of Sala's Classic Safari ($17,750 / 3 × 4), so it is seeded as the peak rate. Confirm with the partner.",
  },
  {
    slug: "salas-family-safari",
    status: "DRAFT",
    title: "Sala's Family Safari",
    subtitle: "4-Night Fully Inclusive Luxury Masai Mara Safari Experience for Two Adults & Two Children",
    summary: SALA_SUMMARY,
    category: "SAFARI",
    destination: "masai-mara",
    nights: 4,
    minNights: 4,
    adults: 2,
    children: 2,
    sortOrder: 40,
    stays: [{ property: "salas-camp", nights: 4, roomType: SALA_ROOM }],
    features: {
      INCLUDED: salaIncluded(4),
      PREMIUM_SERVICE: SAFARI_PREMIUM,
      HIGHLIGHT: SALA_HIGHLIGHTS,
      VEHICLE: salaVehicle("Sala's Family Safari", "two adults and two children"),
      EXCLUDED: SAFARI_EXCLUDED,
    },
    rates: [
      { season: SAVINGS, priceMinor: 2_688_400 },
      { season: PEAK, priceMinor: 3_788_200 },
    ],
    addOns: [PRIVATE_VEHICLE],
    sources: ["WhatsApp Image 2026-09-25 at 02.19.33 (4).jpeg", "WhatsApp Image 2026-09-25 at 02.19.34 (4).jpeg"],
    dataIssue:
      "Both posters show the PEAK season dates but different prices ($37,882 and $26,884). The lower price is seeded as " +
      "the savings rate by analogy with the other two-season packages, which is a guess. Confirm with the partner.",
  },
  // ---- The Safari Collection: multi-camp ----------------------------------------
  {
    slug: "safari-collection-explorer",
    status: "DRAFT",
    title: "Safari Collection Explorer",
    subtitle: "7-Night Luxury Multi-Destination Safari for Two Adults",
    summary: MULTI_SUMMARY,
    category: "SAFARI",
    destination: "masai-mara",
    nights: 7,
    minNights: 7,
    adults: 2,
    children: 0,
    sortOrder: 50,
    stays: [
      { property: "salas-camp", nights: 4 },
      { property: "sasaab", nights: 3 },
    ],
    features: {
      INCLUDED: multiCampIncluded([
        ["Sala's Camp", 4],
        ["Sasaab", 3],
      ]),
      PREMIUM_SERVICE: SAFARI_PREMIUM,
      HIGHLIGHT: MULTI_HIGHLIGHTS,
      VEHICLE: multiVehicle("Safari Collection Explorer"),
      PERK: RETREAT_PERK,
      EXCLUDED: SAFARI_EXCLUDED,
    },
    rates: [
      { season: SAVINGS, priceMinor: 1_936_900 },
      { season: PEAK, priceMinor: 3_398_500 },
    ],
    addOns: [PRIVATE_VEHICLE],
    sources: ["WhatsApp Image 2026-09-25 at 02.19.34 (2).jpeg", "WhatsApp Image 2026-09-25 at 02.19.34 (3).jpeg"],
    dataIssue:
      "The savings poster ($19,369) is 4 nights Sasaab + 3 nights Sala's Camp; the peak poster ($33,985) is 4 nights " +
      "Sala's Camp + 3 nights Sasaab. One package has one itinerary: seeded with the peak split. Confirm whether these " +
      "are two different products.",
  },
  {
    slug: "ultimate-safari-collection-journey",
    status: "PUBLISHED",
    title: "Ultimate Safari Collection Journey",
    subtitle: "10-Night Premium Long-Stay Safari for Two Adults",
    summary: MULTI_SUMMARY,
    category: "SAFARI",
    destination: "masai-mara",
    nights: 10,
    minNights: 10,
    adults: 2,
    children: 0,
    sortOrder: 60,
    stays: [
      { property: "salas-camp", nights: 5 },
      { property: "sasaab", nights: 5 },
    ],
    features: {
      INCLUDED: multiCampIncluded([
        ["Sala's Camp", 5],
        ["Sasaab", 5],
      ]),
      PREMIUM_SERVICE: SAFARI_PREMIUM,
      HIGHLIGHT: MULTI_HIGHLIGHTS,
      VEHICLE: multiVehicle("Ultimate Safari Collection Journey"),
      PERK: RETREAT_PERK,
      EXCLUDED: SAFARI_EXCLUDED,
    },
    rates: [
      { season: SAVINGS, priceMinor: 3_088_900 },
      { season: PEAK, priceMinor: 4_484_800 },
    ],
    addOns: [PRIVATE_VEHICLE],
    sources: ["WhatsApp Image 2026-09-25 at 02.19.34.jpeg", "WhatsApp Image 2026-09-25 at 02.19.34 (1).jpeg"],
  },
  // ---- Giraffe Manor, Nairobi ---------------------------------------------------
  {
    slug: "giraffe-manor-signature-escape",
    status: "PUBLISHED",
    title: "Giraffe Manor Signature Escape",
    subtitle: "2 Nights / 3 Days for Two Adults",
    summary: "Step into elegance, where heritage, wildlife and warm hospitality create unforgettable moments.",
    category: "LODGE",
    destination: "nairobi",
    nights: 2,
    minNights: 2,
    adults: 2,
    children: 0,
    sortOrder: 110,
    stays: [{ property: "giraffe-manor", nights: 2 }],
    features: { INCLUDED: GM_INCLUDED, PREMIUM_SERVICE: GM_PREMIUM, EXCLUDED: GM_EXCLUDED },
    rates: [{ season: GM_2026, priceMinor: 589_600 }],
    addOns: [],
    sources: ["WhatsApp Image 2026-09-25 at 02.19.35 (3).jpeg"],
  },
  {
    slug: "giraffe-manor-grand-escape",
    status: "PUBLISHED",
    title: "Giraffe Manor Grand Escape",
    subtitle: "3 Nights / 4 Days for Two Adults",
    summary: "Step into elegance, where heritage, wildlife and warm hospitality create unforgettable moments.",
    category: "LODGE",
    destination: "nairobi",
    nights: 3,
    minNights: 3,
    adults: 2,
    children: 0,
    sortOrder: 120,
    stays: [{ property: "giraffe-manor", nights: 3 }],
    features: { INCLUDED: GM_INCLUDED, PREMIUM_SERVICE: GM_PREMIUM, EXCLUDED: GM_EXCLUDED },
    rates: [{ season: GM_2026, priceMinor: 848_800 }],
    addOns: [],
    sources: ["WhatsApp Image 2026-09-25 at 02.19.35 (2).jpeg"],
  },
  {
    slug: "giraffe-manor-luxury-escape",
    status: "PUBLISHED",
    title: "Giraffe Manor Luxury Escape",
    subtitle: "4 Nights / 5 Days for Two Adults",
    summary: "Indulge in sophisticated comfort, exceptional service and extraordinary moments at Giraffe Manor.",
    category: "LODGE",
    destination: "nairobi",
    nights: 4,
    minNights: 4,
    adults: 2,
    children: 0,
    sortOrder: 130,
    stays: [{ property: "giraffe-manor", nights: 4 }],
    features: { INCLUDED: GM_INCLUDED, PREMIUM_SERVICE: GM_PREMIUM, EXCLUDED: GM_EXCLUDED },
    rates: [{ season: GM_2026, priceMinor: 1_136_800 }],
    addOns: [],
    sources: ["WhatsApp Image 2026-09-25 at 02.19.35.jpeg"],
  },
  {
    slug: "giraffe-manor-family-experience",
    status: "PUBLISHED",
    title: "Giraffe Manor Family Experience",
    subtitle: "2 Nights / 3 Days for Two Adults + Two Children",
    summary:
      "Create timeless moments together, surrounded by elegance, heritage and the gentle giants of Giraffe Manor.",
    category: "LODGE",
    destination: "nairobi",
    nights: 2,
    minNights: 2,
    adults: 2,
    children: 2,
    sortOrder: 140,
    stays: [{ property: "giraffe-manor", nights: 2 }],
    features: { INCLUDED: GM_INCLUDED, PREMIUM_SERVICE: GM_PREMIUM, EXCLUDED: GM_EXCLUDED },
    rates: [{ season: GM_2026, priceMinor: 968_500 }],
    addOns: [],
    sources: ["WhatsApp Image 2026-09-25 at 02.19.35 (1).jpeg"],
  },
  {
    slug: "giraffe-manor-family-celebration",
    status: "PUBLISHED",
    title: "Giraffe Manor Family Celebration",
    subtitle: "3 Nights / 4 Days for Two Adults + Two Children",
    summary: "Create unforgettable family memories with extraordinary experiences at Giraffe Manor.",
    category: "LODGE",
    destination: "nairobi",
    nights: 3,
    minNights: 3,
    adults: 2,
    children: 2,
    sortOrder: 150,
    stays: [{ property: "giraffe-manor", nights: 3 }],
    features: { INCLUDED: GM_INCLUDED, PREMIUM_SERVICE: GM_PREMIUM, EXCLUDED: GM_EXCLUDED },
    rates: [{ season: GM_2026, priceMinor: 1_459_900 }],
    addOns: [],
    sources: ["WhatsApp Image 2026-09-25 at 02.19.36.jpeg"],
  },
  {
    slug: "giraffe-manor-family-celebration-3-children",
    status: "PUBLISHED",
    title: "Giraffe Manor Family Celebration (3 Children)",
    subtitle: "2 Nights / 3 Days for Two Adults + Three Children",
    summary: "Create unforgettable family memories with extraordinary experiences at Giraffe Manor.",
    category: "LODGE",
    destination: "nairobi",
    nights: 2,
    minNights: 2,
    adults: 2,
    children: 3,
    sortOrder: 160,
    stays: [{ property: "giraffe-manor", nights: 2 }],
    features: { INCLUDED: GM_INCLUDED, PREMIUM_SERVICE: GM_PREMIUM, EXCLUDED: GM_EXCLUDED },
    rates: [{ season: GM_2026, priceMinor: 1_180_900 }],
    addOns: [],
    sources: ["WhatsApp Image 2026-09-25 at 02.19.36 (1).jpeg"],
  },
  {
    slug: "giraffe-and-nairobi-wildlife-escape",
    status: "PUBLISHED",
    title: "Giraffe and Nairobi Wildlife Escape",
    subtitle: "2 Nights / 3 Days for Two Adults",
    summary: "Experience the best of Nairobi's wildlife and iconic landscapes.",
    category: "SAFARI",
    destination: "nairobi",
    nights: 2,
    minNights: 2,
    adults: 2,
    children: 0,
    sortOrder: 170,
    stays: [{ property: "giraffe-manor", nights: 2 }],
    features: {
      INCLUDED: [
        k("all-meals"),
        k("house-drinks"),
        k("laundry", "Laundry service"),
        k("wifi"),
        k("game-drives"),
        k("park-fees"),
        k("airport-transfers"),
      ],
      PREMIUM_SERVICE: [
        k("vip-home-to-airport", "VIP transfer from home to airport", "If required"),
        k("meet-and-greet", "Meet & greet service at the airport"),
        k("vip-airport-to-resort"),
      ],
      EXCLUDED: GM_EXCLUDED,
      // Verbatim from the poster, although INCLUDED also lists "Park fees" — flagged for the owner.
      NOTE: [{ text: "Nairobi National Park fees are not included." }],
    },
    rates: [{ season: GM_2026, priceMinor: 658_900 }],
    addOns: [],
    sources: ["WhatsApp Image 2026-09-25 at 02.19.37.jpeg"],
  },
];
