import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ShieldCheck, Snowflake, Gem } from "lucide-react";

import apple from "../assets/images/apple-fruit.jpg";
import orange from "../assets/images/orange-fruit.avif"
import kiwi from "../assets/images/kiwi-fruit.jpeg"
import grape from "../assets/images/grape-fruit.jpg"
import pears from "../assets/images/pears.jpg"
import avacado from "../assets/images/avacado-fruit.jpg"
import ourFruits from "../assets/images/our-fruits.jpg"

const featuredCards = [
  {
    key: "apples",
    theme: "light",
    eyebrow: "Marquee Selection",
    title: "Premium Apples",
    desc: "Sourced from the high-altitude orchards of New Zealand and Italy, ensuring unparalleled crunch and sweetness…",
    image: apple ,
    tags: ["Gala", "Fuji", "Pink Lady"],
    cta: "Explore Varieties",
  },
  {
    key: "citrus",
    theme: "dark",
    eyebrow: "Bestseller",
    title: "Global Citrus",
    desc: "Sun-drenched oranges and lemons from South Africa and Egypt, known for high juice content and vibrant essential oils.",
    image: orange,
    tags: ["Valencia", "Navel"],
    cta: "View Harvest Calendar",
  },
];

const produceCards = [
  {
    key: "kiwis",
    theme: "light",
    title: "Zesty Kiwis",
    desc: "Imported gold and green varieties with rich antioxidant density.",
    image: kiwi,
    tag: "Zespri Gold",
  },
  {
    key: "grapes",
    theme: "light",
    title: "Table Grapes",
    desc: "Crisp, seedless varieties from premium vines.",
    image: grape,
    tag: "Thompson · Crimson",
  },
  {
    key: "pears",
    theme: "light",
    title: "Heritage Pears",
    desc: "Firm-fleshed varieties with excellent shelf life and travel durability.",
    image: pears,
    tag: "Packham · Anjou",
  },
  {
    key: "avocados",
    theme: "dark",
    title: "Avocados",
    desc: "Creamy Hass avocados sourced for perfect ripeness consistency.",
    image: avacado,
    tag: "Hass Premium",
  },
];

const trustPoints = [
  {
    icon: ShieldCheck,
    title: "Global Compliance",
    desc: "Meeting international GAP standards and phytosanitary requirements.",
  },
  {
    icon: Snowflake,
    title: "Active Cold Chain",
    desc: "Continuous temperature monitoring from orchard to warehouse.",
  },
  {
    icon: Gem,
    title: "Direct Sourcing",
    desc: "Transparent supply chains and ethical trade practices with growers.",
  },
];

const FruitsPage = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section
        className="relative bg-cover bg-center px-6 py-24 md:px-16"
        style={{ backgroundImage: `url(${ourFruits})` }}
      >
        {/* Dark gradient overlay for text contrast */}
        <div className="absolute inset-0 bg-linear-to-br from-[#16241b]/95 to-[#1d2f22]/90" />

        <div className="relative mx-auto max-w-3xl text-center">
          <span className="mb-6 inline-block rounded-full border border-[#d97b3c]/40 bg-[#d97b3c]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#d97b3c]">
            Premium Selection
          </span>
          <h1 className="font-serif text-4xl font-semibold leading-tight text-white md:text-6xl">
            The Global Harvest:
            <br />
            <span className="italic text-[#d97b3c]">Excellence Sourced.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-white/60">
            Discover OMM AGRI&rsquo;s curated catalog of premium fresh produce.
            From high-altitude orchards to sun-drenched groves, we bridge the
            gap between world-class growers and your market through a
            meticulously managed cold chain.
          </p>
        </div>
      </section>

      {/* Portfolio intro */}
      <section className="px-6 pt-16 md:px-16">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#16241b] md:text-3xl">
              Our Seasonal Portfolio
            </h2>
            <p className="mt-2 text-gray-500">
              Hand-picked quality from verified global sourcing partners.
            </p>
          </div>
        </div>
      </section>

      {/* Featured cards */}
      <section className="px-6 py-10 md:px-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
          {featuredCards.map((card) => (
            <div
              key={card.key}
              className="group relative flex min-h-105 flex-col justify-between overflow-hidden rounded-2xl bg-cover bg-center p-8"
              style={{ backgroundImage: `url(${card.image})` }}
            >
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10" />

              <div className="relative">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#d97b3c]">
                  {card.eyebrow}
                </span>
              </div>

              <div className="relative">
                <h3 className="font-serif text-2xl font-bold text-white">
                  {card.title}
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">
                  {card.desc}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {/* <a
                  href="#"
                  className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#d97b3c] transition-transform duration-200 group-hover:translate-x-1"
                >
                  {card.cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </a> */}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Produce grid */}
      <section className="px-6 pb-20 md:px-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {produceCards.map((card) => (
            <div
              key={card.key}
              className="group relative flex min-h-50 flex-col justify-end overflow-hidden rounded-2xl bg-cover bg-center p-6"
              style={{ backgroundImage: `url(${card.image})` }}
            >
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-transparent" />

              <div className="relative">
                <h3 className="font-semibold text-white">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {card.desc}
                </p>
                <span className="mt-3 block text-[11px] font-semibold uppercase tracking-widest text-[#d97b3c]">
                  {card.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust band */}
      <section className="bg-[#eef1e2] px-6 py-14 md:px-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-3">
          {trustPoints.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-4">
              <Icon className="mt-1 shrink-0 text-lg text-[#d97b3c]" />
              <div>
                <h4 className="font-semibold text-[#16241b]">{title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-gray-500">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FruitsPage;
