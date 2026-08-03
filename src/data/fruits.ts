// Pear
import pear from "../assets/images/pear-png-38680.png";
import vermont from "../assets/images/vermont-pear.webp";
import forelle from "../assets/images/forelle-pears.png";
import packham from "../assets/images/Packham-s-Triumph-Pear.jpg";
import redanjou from "../assets/images/redanjou.jpg";
import willum from "../assets/images/willumpears.webp";
import cheeky from "../assets/images/Cheeky.jpeg";


// Kiwi
import hkiwi from "../assets/images/Big-Kiwi.png";
import haywardKiwi from "../assets/images/kiwi-hayward.webp";
import goldenKiwi from "../assets/images/kiwi-golden.jpg";

// Orange
import oranges from "../assets/images/oranges.png";
import orange from "../assets/images/Orange-big.jpg";
import valencia from "../assets/images/valencia.webp";
import midVal from "../assets/images/midnight-valencia.avif";

// Apple
import apple from "../assets/images/apple.png";
import redDelApple from "../assets/images/delicius-red.avif";
import washington from "../assets/images/washington.jpg";
import fuji from "../assets/images/Apfel-Fuji.jpg";
import gala from "../assets/images/gala.jpg";
import queen from "../assets/images/queen.jpeg";
import pinkLady from "../assets/images/Pink-Lady-Apple.jpg";
import green from "../assets/images/green.jpg";

// mandarins
import mandarin from "../assets/images/mandarin-tr.webp"
import nodorcott from "../assets/images/nodorcott.jpg"
import rhm from "../assets/images/royalhoney.avif"
import nova from "../assets/images/nova.webp"
import tango from "../assets/images/tango.webp"

// grapes
import grape1 from "../assets/images/grape-1.webp";
import redglobe from "../assets/images/redglobe.jpg";
import autumn from "../assets/images/autumn.jpeg";
import shineMuscat from "../assets/images/shinemuscat.webp";
import blackGrape from "../assets/images/black-grape.jpg";
import scarlet from "../assets/images/scarlet-grapes.jpeg"


// Cherry
import cherry from "../assets/images/cherry0.png"
import cherry2 from "../assets/images/cherry-2.webp"
import cherry3 from "../assets/images/cherry-3.jpg"
import cherry4 from "../assets/images/cherry-3.jpeg"

// Plums
import plums from "../assets/images/plums.webp";
import blackPlum from "../assets/images/black-plum.jpg";
import redPlum from "../assets/images/red-plum.jpg";


// Avacado
import avacado1 from "../assets/images/avacado-1.webp";
import avacado2 from "../assets/images/Avocado-hass.webp";

// Blueberry
import blueberry from "../assets/images/blueberries-1.png";
import blueBerry2 from "../assets/images/blueberry-2.jpeg";

// Dragon fruit
import dragonFruit from "../assets/images/dragonfruit-1.png";
import redFlesh from "../assets/images/red-flesh.png";
import whiteFlesh from "../assets/images/white-flesh.jpg";

// Tamarind
import tamarind from "../assets/images/Tamarind.png";
import sweetTamarind from "../assets/images/sweetTamarind.webp";

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
export const FRUITS: Record<string, FruitData> = {
  apple: {
    slug: "apple",
    name: "Apples",
    eyebrow: "CHAPTER 01 · POME FRUIT",
    tagline: "One bite, three thousand years of breeding.",
    intro:
      "Sourced from orchards across the growing calendar and held in controlled-atmosphere storage, so a September apple ships firm in April. Graded by feel, not sight — bruising shows a full day before the mark is visible.",
    shape: "single",
    heroImage: apple,
    thumbnail: "/images/fruits/apple-thumb.jpg",
    accent: "#D3413A",
    deep: "#4A1210",
    paper: "#F6E4DE",
    ink: "#2A1210",
    varieties: [
      {
        code: "RD-01",
        name: "Red Delicious",
        blurb:
          "Deep ruby skin over sweet, mellow flesh — the archetypal apple.",
        image: redDelApple,
      },
      {
        code: "WA-02",
        name: "Washington",
        blurb: "Grown in the heart of apple country, all-purpose and crisp.",
        image: washington,
      },
      {
        code: "FJ-03",
        name: "Fuji",
        blurb: "Dense, sugar-heavy, built for long storage.",
        image: fuji,
      },
      {
        code: "GA-04",
        name: "Gala",
        blurb: "Explosively juicy, bred for the bite.",
        image: gala,
      },
      {
        code: "QN-05",
        name: "Queen",
        blurb:
          "Firm enough to hold its shape at oven temperature, which is why it ends up in pies more than fruit bowls.",
        image: queen,
      },
      {
        code: "PL-06",
        name: "Pink Lady",
        blurb: "Sharp acidity under a rosy blush.",
        image: pinkLady,
      },
      {
        code: "GS-07",
        name: "Granny Smith",
        blurb: "Tart and green, the baker's apple.",
        image: green,
      },
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
    heroImage: pear,
    thumbnail: pear,
    accent: "#96A63A",
    deep: "#333813",
    paper: "#F1F2DC",
    ink: "#262A0D",
    varieties: [
      {
        code: "VB-01",
        name: "Vermont Beauty",
        blurb: "A New England heirloom, blushed red over gold.",
        image: vermont,
      },
      {
        code: "FR-02",
        name: "Forelle",
        blurb: "Small, bell-shaped, and speckled like a trout.",
        image: forelle,
      },
      {
        code: "PT-03",
        name: "Packham's Triumph",
        blurb: "Bumpy skin, buttery texture when ripe.",
        image: packham,
      },
      {
        code: "RA-04",
        name: "Red Anjou",
        blurb: "Dense and mild, holds its shape when cooked, in crimson skin.",
        image: redanjou,
      },
      {
        code: "WM-05",
        name: "William Pear",
        blurb: "Classic pear flavour, bell-shaped, sweet from the skin in.",
        image: willum,
      },
      {
        code: "CK-06",
        name: "Cheeky",
        blurb: "A newer, low-acid variety bred to be eaten young and crisp.",
        image: cheeky,
      },
    ],
  },

  orange: {
    slug: "orange",
    name: "Oranges",
    eyebrow: "CHAPTER 01 · CITRUS SELECTIONS",
    tagline: "Sun held in every segment.",
    intro:
      "Peak season runs November through February, field-packed in single layers to protect the thin skin. Held at 4-7°C from pack to shelf to preserve colour and the oils that carry the fruit's scent.",
    shape: "citrus",
    heroImage: oranges,
    thumbnail: "/images/fruits/orange-thumb.jpg",
    accent: "#E2691C",
    deep: "#5C260C",
    paper: "#FCE9D6",
    ink: "#3A2008",
    varieties: [
      {
        code: "VL-01",
        name: "Valencia",
        blurb: "Juice-forward, thin-skinned, built for pressing.",
        image: valencia,
      },
      {
        code: "NV-02",
        name: "Navel",
        blurb: "Seedless and sweet, the table favourite.",
        image: orange,
      },
      {
        code: "MV-03",
        name: "Midnight Valencia",
        blurb: "A late-season Valencia, deep-coloured and extra sweet.",
        image: midVal,
      },
    ],
  },

  mandarin: {
    slug: "mandarin",
    name: "Mandarins",
    eyebrow: "CHAPTER 01 · CITRUS SELECTIONS",
    tagline: "Small fruit, big sweetness, no fuss to peel.",
    intro:
      "Picked by hand and never washed too hard — the loose, fragrant skin bruises if it's handled like an orange. Season runs early autumn through winter across overlapping varieties bred for different weeks of the calendar.",
    shape: "citrus",
    heroImage: mandarin,
    thumbnail: "/images/fruits/mandarin-thumb.jpg",
    accent: "#EA8C1D",
    deep: "#5E3208",
    paper: "#FDEEDA",
    ink: "#3D2408",
    varieties: [
      {
        code: "ND-01",
        name: "Nadorcott",
        blurb: "Easy-peel and seedless, a late-season mandarin.",
        image: nodorcott,
      },
      {
        code: "RM-02",
        name: "Royal Honey Murcott",
        blurb: "Honeyed sweetness under a thin, glossy skin.",
        image: rhm,
      },
      {
        code: "NV-03",
        name: "Nova",
        blurb: "An early mandarin, tangy and bright.",
        image: nova,
      },
      {
        code: "TG-04",
        name: "Tango",
        blurb: "Seedless by design, bred for the lunchbox.",
        image: tango,
      },
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
    heroImage: grape1,
    thumbnail: "/images/fruits/grape-thumb.jpg",
    accent: "#6C4396",
    deep: "#241536",
    paper: "#EDE3F2",
    ink: "#1F1330",
    varieties: [
      {
        code: "RG-01",
        name: "Red Globe",
        blurb:
          "Large, thick-skinned berries bred to survive long-distance shipping without splitting.",
        image: redglobe,
      },
      {
        code: "SM-02",
        name: "Shine Muscat",
        blurb: "Pale green, floral, and famously crisp.",
        image: shineMuscat,
      },
      {
        code: "SR-03",
        name: "Scarlet Royal",
        blurb: "Large, firm, deep red berries built for late season.",
        image: scarlet,
      },
      {
        code: "AR-04",
        name: "Autumn Royal",
        blurb: "Seedless and jet-black, harvested late in the season.",
        image: autumn,
      },
      {
        code: "BS-05",
        name: "Black Seedless",
        blurb: "Sweet, dark-skinned, no seeds to slow you down.",
        image: blackGrape,
      },
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
    heroImage: hkiwi,
    thumbnail: hkiwi,
    accent: "#7A9A2E",
    deep: "#2B3610",
    paper: "#EDF0D9",
    ink: "#20260C",
    varieties: [
      {
        code: "HW-01",
        name: "Hayward Kiwi",
        blurb: "The classic fuzzy green, sharp and bright.",
        image: haywardKiwi,
      },
      {
        code: "GD-02",
        name: "Golden Kiwi",
        blurb: "Smooth skin, tropical sweetness.",
        image: goldenKiwi,
      },
    ],
  },

  plum: {
    slug: "plum",
    name: "Plums",
    eyebrow: "CHAPTER 01 · STONE FRUIT",
    tagline: "A single stone, wrapped in colour.",
    intro:
      "Picked at a firm 'breaker' stage and finished at ambient temperature, since a tree-ripened plum bruises before it can travel. Skin colour is a rough guide to variety, not ripeness — the giveaway is a gentle give at the seam.",
    shape: "single",
    heroImage: plums,
    thumbnail: "/images/fruits/plum-thumb.jpg",
    accent: "#7B3F61",
    deep: "#2E1220",
    paper: "#F1DEE8",
    ink: "#210D18",
    varieties: [
      {
        code: "BA-01",
        name: "Black Amber Plum",
        blurb: "Deep purple-black skin over amber-gold flesh.",
        image: blackPlum,
      },
      {
        code: "SR-02",
        name: "Red Plum / Santa Rosa",
        blurb: "Tart red skin, sweet flesh — the classic backyard plum.",
        image: redPlum,
      },
    ],
  },

  cherry: {
    slug: "cherry",
    name: "Cherries",
    eyebrow: "CHAPTER 01 · STONE FRUIT",
    tagline: "Six weeks of season, chased around the globe.",
    intro:
      "Cut from the tree by the stem, never pulled — a torn stem opens the fruit to rot within days. Cold-chained from orchard to shelf almost immediately, since cherries don't ripen further once picked.",
    shape: "cluster",
    heroImage: cherry,
    thumbnail: "/images/fruits/cherry-thumb.jpg",
    accent: "#9B1B30",
    deep: "#3A0A12",
    paper: "#F6DCE0",
    ink: "#2A0810",
    varieties: [
      {
        code: "BG-01",
        name: "Bing",
        blurb: "Deep red-black, firm, the standard-bearer of sweet cherries.",
        image: cherry2,
      },
      {
        code: "RG-02",
        name: "Regina",
        blurb: "Late-season and firm, resistant to splitting in the rain.",
        image: cherry3,
      },
      {
        code: "ST-03",
        name: "Santina",
        blurb: "Early-season, glossy black-red, and self-fertile on the tree.",
        image: cherry2,
      },
      {
        code: "LP-04",
        name: "Lapins",
        blurb: "Large, dark, and sweet — a self-pollinating variety.",
        image: cherry4,
      },
    ],
  },

  dragonfruit: {
    slug: "dragonfruit",
    name: "Dragon Fruit",
    eyebrow: "CHAPTER 01 · EXOTIC FRUIT",
    tagline: "A cactus blossom, harvested as fruit.",
    intro:
      "Grown on a climbing cactus and picked only after the leathery skin turns fully pink, since the fruit doesn't ripen further once cut. Flesh colour has nothing to do with skin colour — it's a separate trait bred into each variety.",
    shape: "single",
    heroImage: dragonFruit,
    thumbnail: "/images/fruits/dragonfruit-thumb.jpg",
    accent: "#C43C7A",
    deep: "#3A0F22",
    paper: "#F7DEE9",
    ink: "#2A0A18",
    varieties: [
      {
        code: "WF-01",
        name: "White Flesh",
        blurb: "Mild and melon-like, studded with tiny edible black seeds.",
        image: whiteFlesh,
      },
      {
        code: "RF-02",
        name: "Red Flesh",
        blurb: "Deeper in colour and sweetness, with a faint berry note.",
        image: redFlesh,
      },
    ],
  },

  tamarind: {
    slug: "tamarind",
    name: "Sweet Tamarind",
    eyebrow: "CHAPTER 01 · EXOTIC FRUIT",
    tagline: "The pod that trades sour for sweet.",
    intro:
      "A sweeter cousin of the culinary tamarind used in sauces and pastes, bred to be eaten fresh from the pod rather than cooked down. The brittle shell peels away by hand to reveal a dense, date-like pulp around the seeds.",
    shape: "single",
    heroImage: tamarind,
    thumbnail: "/images/fruits/tamarind-thumb.jpg",
    accent: "#8B5A2B",
    deep: "#3A230D",
    paper: "#F2E6D6",
    ink: "#2A1A08",
    varieties: [
      {
        code: "SW-01",
        name: "Sweet Tamarind",
        blurb: "Dense, honeyed pulp with a mild tang, low in acidity.",
        image: sweetTamarind,
      },
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
    heroImage: avacado1,
    thumbnail: "/images/fruits/avocado-thumb.jpg",
    accent: "#4C6B34",
    deep: "#1D2A13",
    paper: "#E8EDDD",
    ink: "#141C0B",
    varieties: [
      {
        code: "HS-01",
        name: "Hass",
        blurb: "Pebbled skin, the global standard.",
        image: avacado2,
      },
    ],
  },

  blueberry: {
    slug: "blueberry",
    name: "Blueberries",
    eyebrow: "CHAPTER 01 · BERRY FRUIT",
    tagline: "The whole punnet ripens at once, or not at all.",
    intro:
      "Machine and hand harvested depending on end use — hand-picked fruit holds its bloom and goes to the fresh punnet, machine-picked goes to processing. Kept cold within the hour, since bruised fruit weeps and spoils the whole tray.",
    shape: "cluster",
    heroImage: blueberry,
    thumbnail: "/images/fruits/blueberry-thumb.jpg",
    accent: "#3B4A8C",
    deep: "#141A33",
    paper: "#DEE3F1",
    ink: "#0D1020",
    varieties: [
      {
        code: "BL-01",
        name: "Blueberry",
        blurb:
          "Wild-hearted and thin-skinned, at their best straight from the punnet.",
        image: blueBerry2,
      },
    ],
  },
};

export const FRUIT_SLUGS = Object.keys(FRUITS);

export function getFruitBySlug(
  slug: string | undefined,
): FruitData | undefined {
  if (!slug) return undefined;
  return FRUITS[slug.toLowerCase()];
}
