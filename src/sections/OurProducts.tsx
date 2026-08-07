import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import apple from "../assets/images/Pink-Lady-Apple.jpg";
import orange from "../assets/images/oranges.png";
import kiwi from "../assets/images/kiwi-hayward.webp";
import grape from "../assets/images/grape-1.webp";
import pears from "../assets/images/pear-png-38680.png";
import avacado from "../assets/images/avacado-1.webp";
import mandarin from "../assets/images/mandarin-tr.webp";
import plum from "../assets/images/red-plum.jpg";
import cherry from "../assets/images/cherry-1.jpg";
import blueberry from "../assets/images/blueberries-1.png";
import dragonfruit from "../assets/images/red-flesh.png";
import tamarind from "../assets/images/Tamarind.png";

import FruitCalendarPopup from "../components/ui/FruitCalendarPopup";

const featuredCards = [
  {
    key: "kiwi",
    slug: "kiwi",
    theme: "dark",
    eyebrow: "Hayat Kiwi",
    title: "Kiwi",
    desc: "Grown under the Hayat label and ripened on a fixed schedule rather than in transit, for a tender core and consistent sweetness in every crate.",
    image: kiwi,
    tags: ["Hayward Kiwi", "Golden Kiwi"],
    cta: "Explore Varieties",
  },
  {
    key: "citrus",
    slug: "orange",
    theme: "dark",
    eyebrow: "Bestseller",
    title: "Citrus",
    desc: "Sun-drenched oranges from South Africa and Egypt, known for high juice content and vibrant essential oils.",
    image: orange,
    tags: ["Valencia", "Navel", "Midnight Valencia"],
    cta: "View Harvest Calendar",
  },
];

const produceCards = [
  {
    key: "apples",
    slug: "apple",
    theme: "light",
    title: "Apples",
    desc: "Firm, cold-stored apples available year round across sweet and tart varieties.",
    image: apple,
    tag: "Gala · Fuji · Pink Lady",
  },
  {
    key: "mandarins",
    slug: "mandarin",
    theme: "light",
    title: "Mandarins",
    desc: "Loose-skinned, easy-peel mandarins bred for a long, overlapping season.",
    image: mandarin,
    tag: "Nadorcott · Murcott · Tango",
  },
  {
    key: "grapes",
    slug: "grape",
    theme: "light",
    title: "Grapes",
    desc: "Crisp, seedless varieties from premium vines.",
    image: grape,
    tag: "Red Globe · Shine Muscat",
  },
  {
    key: "pears",
    slug: "pear",
    theme: "light",
    title: "Pears",
    desc: "Firm-fleshed varieties with excellent shelf life and travel durability.",
    image: pears,
    tag: "Packham's Triumph · Red Anjou",
  },
  {
    key: "plums",
    slug: "plum",
    theme: "light",
    title: "Plums",
    desc: "Firm-picked and finished off the tree, with skin colour ranging from deep black to bright red.",
    image: plum,
    tag: "Black Amber · Santa Rosa",
  },
  {
    key: "cherries",
    slug: "cherry",
    theme: "dark",
    title: "Cherries",
    desc: "Stem-cut and cold-chained fast, spanning a full spread of early to late-season varieties.",
    image: cherry,
    tag: "Bing · Regina · Lapins",
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
  {
    key: "blueberries",
    slug: "blueberry",
    theme: "dark",
    title: "Blueberries",
    desc: "Hand-picked, thin-skinned, and cold-chained within the hour of harvest.",
    image: blueberry,
    tag: "Fresh Punnet",
  },
  {
    key: "dragonfruit",
    slug: "dragonfruit",
    theme: "dark",
    title: "Dragon Fruit",
    desc: "Cactus-grown and cut at peak colour, in both white and red-fleshed varieties.",
    image: dragonfruit,
    tag: "White Flesh · Red Flesh",
  },
  {
    key: "tamarind",
    slug: "tamarind",
    theme: "light",
    title: "Sweet Tamarind",
    desc: "A sweeter pod variety bred for eating fresh, with dense, honeyed pulp.",
    image: tamarind,
    tag: "Sweet Tamarind",
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
                className="group relative flex min-h-105 flex-col justify-between overflow-hidden rounded-2xl bg-cover bg-center p-8 transition-transform duration-500 ease-out group-hover:scale-110"
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
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Produce grid */}
      <section className="px-6 pb-20 md:px-16">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-6">
          {produceCards.map((card) => (
            <Link
              to={`/${card.slug}`}
              key={card.key}
              className="group relative flex min-h-50 w-full flex-col justify-end overflow-hidden rounded-2xl bg-cover bg-center sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]"
            >
              <div
                key={card.key}
                className="group relative flex min-h-50 flex-col justify-end overflow-hidden rounded-2xl bg-cover bg-center p-6 transition-transform duration-500 ease-out group-hover:scale-110"
                style={{ backgroundImage: `url(${card.image})` }}
              >
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-transparent" />

                <div className="relative">
                  <h3 className="font-semibold text-white">{card.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Seasonal Calendar popup */}
      <section className="px-6 pb-20 md:px-16">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl bg-linear-to-br from-[#193768] via-[#1d4079] to-[#0f2547] px-6 py-14 text-center shadow-xl shadow-[#193768]/20 sm:px-12">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-0.5 w-8 bg-[#d97b3c]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#d97b3c]">
              Seasonal Guide
            </span>
            <span className="h-0.5 w-8 bg-[#d97b3c]" />
          </div>

          <h3 className="text-2xl font-extrabold text-white sm:text-3xl">
            Not sure what's in season?
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/70">
            Check month-by-month availability across our full fruit range before
            you place an order.
          </p>

          <div className="mt-6 flex justify-center">
            <FruitCalendarPopup />
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurProducts;
