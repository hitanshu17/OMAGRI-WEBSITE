// Types
export type FruitShape = "single" | "citrus" | "cluster";

export interface Variety {
  code: string;
  name: string;
  blurb: string;
  image: string;
}

export interface FruitData {
  slug: string;
  name: string;
  eyebrow: string;
  tagline: string;
  /** 1-2 sentence description shown directly on the hero */
  intro: string;
  shape: FruitShape;
  /** Hero image, used as background/foreground photography */
  heroImage: string;
  /** Small thumbnail used in listing/nav contexts */
  thumbnail: string;
  accent: string;
  deep: string;
  paper: string;
  ink: string;
  varieties: Variety[];
}

// Data

/**
 * Single source of truth for every /{fruit-name} route.
 * In production, swap this static map for a CMS fetch keyed by slug —
 * every component in FruitPage.tsx only depends on the FruitData shape,
 * not on where it came from.
 */
export const FRUITS: Record<string, FruitData> = {
  apple: {
    slug: "apple",
    name: "Apples",
    eyebrow: "CHAPTER 01 · POME FRUIT",
    tagline: "One bite, three thousand years of breeding.",
    intro:
      "Sourced from orchards across the growing calendar and held in controlled-atmosphere storage, so a September apple ships firm in April. Graded by feel, not sight — bruising shows a full day before the mark is visible.",
    shape: "single",
    heroImage: "/images/fruits/apple-hero.jpg",
    thumbnail: "/images/fruits/apple-thumb.jpg",
    accent: "#D3413A",
    deep: "#4A1210",
    paper: "#F6E4DE",
    ink: "#2A1210",
    varieties: [
      { code: "GA-01", name: "Gala", blurb: "Honeyed and crisp, the everyday apple.", image: "/images/fruits/varieties/apple-gala.jpg" },
      { code: "FJ-02", name: "Fuji", blurb: "Dense, sugar-heavy, built for long storage.", image: "/images/fruits/varieties/apple-fuji.jpg" },
      { code: "PL-03", name: "Pink Lady", blurb: "Sharp acidity under a rosy blush.", image: "/images/fruits/varieties/apple-pink-lady.jpg" },
      { code: "HC-04", name: "Honeycrisp", blurb: "Explosively juicy, bred for the bite.", image: "/images/fruits/varieties/apple-honeycrisp.jpg" },
    ],
  },

  mandarin: {
    slug: "mandarin",
    name: "Mandarins",
    eyebrow: "CHAPTER 01 · CITRUS SELECTIONS",
    tagline: "Sun held in every segment.",
    intro:
      "Peak season runs November through February, field-packed in single layers to protect the thin skin. Held at 4–7°C from pack to shelf to preserve colour and the oils that carry the fruit's scent.",
    shape: "citrus",
    heroImage: "/images/fruits/mandarin-hero.jpg",
    thumbnail: "/images/fruits/mandarin-thumb.jpg",
    accent: "#E2691C",
    deep: "#5C260C",
    paper: "#FCE9D6",
    ink: "#3A2008",
    varieties: [
      { code: "VL-01", name: "Valencia", blurb: "Juice-forward, thin-skinned, built for pressing.", image: "/images/fruits/varieties/mandarin-valencia.jpg" },
      { code: "NV-02", name: "Navel", blurb: "Seedless and sweet, the table favourite.", image: "/images/fruits/varieties/mandarin-navel.jpg" },
      { code: "SC-03", name: "Satsuma", blurb: "Cold-hardy, loose skin, almost no seeds.", image: "/images/fruits/varieties/mandarin-satsuma.jpg" },
      { code: "CL-04", name: "Clementine", blurb: "Small, glossy, and reliably sweet.", image: "/images/fruits/varieties/mandarin-clementine.jpg" },
    ],
  },

  kiwi: {
    slug: "kiwi",
    name: "Kiwis",
    eyebrow: "CHAPTER 01 · BERRY FRUIT",
    tagline: "Emerald flesh, borrowed name.",
    intro:
      "Always harvested hard and unripe, then brought to eating-ripe in controlled ethylene rooms. That deliberate timing is why a fruit with one short local season shows up on shelves nearly year-round.",
    shape: "single",
    heroImage: "/images/fruits/kiwi-hero.jpg",
    thumbnail: "/images/fruits/kiwi-thumb.jpg",
    accent: "#7A9A2E",
    deep: "#2B3610",
    paper: "#EDF0D9",
    ink: "#20260C",
    varieties: [
      { code: "ZG-01", name: "Zespri Gold", blurb: "Smooth skin, tropical sweetness.", image: "/images/fruits/varieties/kiwi-zespri-gold.jpg" },
      { code: "HW-02", name: "Hayward", blurb: "The classic fuzzy green, sharp and bright.", image: "/images/fruits/varieties/kiwi-hayward.jpg" },
      { code: "RB-03", name: "Red Kiwi", blurb: "A crimson ring around a golden core.", image: "/images/fruits/varieties/kiwi-red.jpg" },
    ],
  },

  grape: {
    slug: "grape",
    name: "Grapes",
    eyebrow: "CHAPTER 01 · VINE FRUIT",
    tagline: "Bred by the cluster, not the fruit.",
    intro:
      "Packed by the stem, never loose — the pale bloom on each berry is a natural wax the vine produces to seal in moisture. Northern and southern-hemisphere harvests overlap to keep a fragile fruit permanently in season.",
    shape: "cluster",
    heroImage: "/images/fruits/grape-hero.jpg",
    thumbnail: "/images/fruits/grape-thumb.jpg",
    accent: "#6C4396",
    deep: "#241536",
    paper: "#EDE3F2",
    ink: "#1F1330",
    varieties: [
      { code: "TH-01", name: "Thompson", blurb: "Seedless, thin-skinned, classic green.", image: "/images/fruits/varieties/grape-thompson.jpg" },
      { code: "CR-02", name: "Crimson", blurb: "Firm, late-season, deep red.", image: "/images/fruits/varieties/grape-crimson.jpg" },
      { code: "MS-03", name: "Muscat", blurb: "Floral and intensely aromatic.", image: "/images/fruits/varieties/grape-muscat.jpg" },
    ],
  },

  pear: {
    slug: "pear",
    name: "Pears",
    eyebrow: "CHAPTER 01 · POME FRUIT",
    tagline: "The only fruit that ripens from the inside out.",
    intro:
      "Picked firm and green on purpose — ripening on the tree turns the flesh gritty. That deliberate hardness at harvest lets pears tolerate a longer supply chain, then ripen in days once they reach room temperature.",
    shape: "single",
    heroImage: "/images/fruits/pear-hero.jpg",
    thumbnail: "/images/fruits/pear-thumb.jpg",
    accent: "#96A63A",
    deep: "#333813",
    paper: "#F1F2DC",
    ink: "#262A0D",
    varieties: [
      { code: "PK-01", name: "Packham", blurb: "Bumpy skin, buttery texture when ripe.", image: "/images/fruits/varieties/pear-packham.jpg" },
      { code: "AJ-02", name: "Anjou", blurb: "Dense and mild, holds its shape when cooked.", image: "/images/fruits/varieties/pear-anjou.jpg" },
      { code: "BC-03", name: "Bartlett", blurb: "Classic pear flavour, bell-shaped.", image: "/images/fruits/varieties/pear-bartlett.jpg" },
    ],
  },

  avocado: {
    slug: "avocado",
    name: "Avocados",
    eyebrow: "CHAPTER 01 · STONE FRUIT",
    tagline: "A single seed, engineered by nothing left alive.",
    intro:
      "An avocado left on the tree can stay hard for months and only begins to soften once picked — growers use that quirk as living cold storage. Fruit ships mature but hard, then ripens in staged batches to order.",
    shape: "single",
    heroImage: "/images/fruits/avocado-hero.jpg",
    thumbnail: "/images/fruits/avocado-thumb.jpg",
    accent: "#4C6B34",
    deep: "#1D2A13",
    paper: "#E8EDDD",
    ink: "#141C0B",
    varieties: [
      { code: "HS-01", name: "Hass", blurb: "Pebbled skin, the global standard.", image: "/images/fruits/varieties/avocado-hass.jpg" },
      { code: "FT-02", name: "Fuerte", blurb: "Smooth-skinned, milder and lighter.", image: "/images/fruits/varieties/avocado-fuerte.jpg" },
      { code: "RD-03", name: "Reed", blurb: "Round, extra-large, thick-fleshed.", image: "/images/fruits/varieties/avocado-reed.jpg" },
    ],
  },
};

export const FRUIT_SLUGS = Object.keys(FRUITS);

export function getFruitBySlug(slug: string | undefined): FruitData | undefined {
  if (!slug) return undefined;
  return FRUITS[slug.toLowerCase()];
}