import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import apple from "../assets/images/apple-fruit.jpg";
import orange from "../assets/images/orange-fruit.avif";
import kiwi from "../assets/images/kiwi-fruit.jpeg";
import grape from "../assets/images/grape-fruit.jpg";
import pears from "../assets/images/pears.jpg";
import avacado from "../assets/images/avacado-fruit.jpg";

const featuredCards = [
  {
    key: "apples",
    slug: "apple",
    theme: "light",
    eyebrow: "Marquee Selection",
    title: "Premium Apples",
    desc: "Sourced from the high-altitude orchards of New Zealand and Italy, ensuring unparalleled crunch and sweetness…",
    image: apple,
    tags: ["Gala", "Fuji", "Pink Lady"],
    cta: "Explore Varieties",
  },
  {
    key: "citrus",
    slug: "mandarin",
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
    slug: "kiwi",
    theme: "light",
    title: "Zesty Kiwis",
    desc: "Imported gold and green varieties with rich antioxidant density.",
    image: kiwi,
    tag: "Zespri Gold",
  },
  {
    key: "grapes",
    slug: "grapes",
    theme: "light",
    title: "Table Grapes",
    desc: "Crisp, seedless varieties from premium vines.",
    image: grape,
    tag: "Thompson · Crimson",
  },
  {
    key: "pears",
    slug: "pear",
    theme: "light",
    title: "Heritage Pears",
    desc: "Firm-fleshed varieties with excellent shelf life and travel durability.",
    image: pears,
    tag: "Packham · Anjou",
  },
  {
    key: "avocados",
    slug: "avocado",
    theme: "dark",
    title: "Avocados",
    desc: "Creamy Hass avocados sourced for perfect ripeness consistency.",
    image: avacado,
    tag: "Hass Premium",
  },
];

const OurProducts = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div id="our-products" className="bg-white">
      {/* Portfolio intro */}
      <section className="px-6 pt-16 md:px-16">
        <div className="mb-10 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-0.5 w-8 bg-[#193768]" />
            <span className="font-semibold tracking-wide text-[#193768]">
              Wide range of Imported Fruits
            </span>
            <span className="w-8 h-0.5 bg-[#193768]" />
          </div>

          <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
            Our Fruit Family
          </h2>
        </div>
      </section>

      {/* Featured cards */}
      <section className="px-6 py-10 md:px-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
          {featuredCards.map((card) => (
            <Link
              to={`/${card.slug}`}
              key={card.key}
              className="group relative flex min-h-105 flex-col justify-between overflow-hidden rounded-2xl bg-cover bg-center"
            >
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
                  <h3 className="text-2xl font-bold text-white">
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
            </Link>
          ))}
        </div>
      </section>

      {/* Produce grid */}
      <section className="px-6 pb-20 md:px-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {produceCards.map((card) => (
            <Link
              to={`/${card.slug}`}
              key={card.key}
              className="group relative flex min-h-50 flex-col justify-end overflow-hidden rounded-2xl bg-cover bg-center"
            >
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
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default OurProducts;
