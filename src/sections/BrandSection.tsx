import React from "react";

// --- Customer logos ---
import c1 from "../assets/images/customer-1.webp";
import c2 from "../assets/images/customer-2.webp";
import c3 from "../assets/images/customer-3.webp";
import c4 from "../assets/images/customer-4.webp";
import c5 from "../assets/images/customer-5.webp";
import c6 from "../assets/images/customer-6.webp";
import c7 from "../assets/images/customer-7.webp";
import c8 from "../assets/images/customer-8.webp";
import c9 from "../assets/images/customer-9.webp";

// --- Exporter logos ---
import e1 from "../assets/images/exporter-1.webp";
import e2 from "../assets/images/exporter-2.webp";
import e3 from "../assets/images/exporter-3.webp";
import e4 from "../assets/images/exporter-4.webp";
import e5 from "../assets/images/exporter-5.webp";
import e6 from "../assets/images/exporter-6.webp";
import e7 from "../assets/images/exporter-7.webp";
import e8 from "../assets/images/exporter-8.webp";
import e9 from "../assets/images/exporter-9.webp";
import e10 from "../assets/images/exporter-10.webp";
import e11 from "../assets/images/exporter-11.webp";

interface Logo {
  src: string;
  alt: string;
}

const customerLogos: Logo[] = [
  { src: c1, alt: "Star Bazaar" },
  { src: c2, alt: "bigbasket" },
  { src: c3, alt: "Nature's Basket" },
  { src: c4, alt: "More" },
  { src: c5, alt: "Reliance Fresh" },
  { src: c6, alt: "Metro Cash & Carry" },
  { src: c7, alt: "Flipkart" },
  { src: c8, alt: "Flipkart" },
  { src: c9, alt: "Flipkart" },
];

const exporterLogos: Logo[] = [
  { src: e1, alt: "RIOblanco" },
  { src: e2, alt: "Subsole" },
  { src: e3, alt: "Zestfruit" },
  { src: e4, alt: "Ideafruit" },
  { src: e5, alt: "The Fresh Connection" },
  { src: e6, alt: "BARFF" },
  { src: e7, alt: "Nova Fruit" },
  { src: e8, alt: "Distrimex" },
  { src: e9, alt: "Jana Fresh" },
  { src: e10, alt: "Good Farmer" },
  { src: e11, alt: "Good Farmer" },
];

interface InfiniteLogoCarouselProps {
  logos: Logo[];
  direction?: "left" | "right";
  speed?: number; // seconds for one full loop — lower is faster
  fadeFrom?: "white" | "gray";
}

const InfiniteLogoCarousel: React.FC<InfiniteLogoCarouselProps> = ({
  logos,
  direction = "left",
  speed = 30,
  fadeFrom = "white",
}) => {
  const animationName = direction === "left" ? "scroll-left" : "scroll-right";
  const fadeClass =
    fadeFrom === "gray"
      ? { l: "from-gray-100", r: "from-gray-100" }
      : { l: "from-white", r: "from-white" };

  return (
    <div className="group relative w-full overflow-hidden">
      {/* Edge fades so logos don't hard-cut at the container edge */}
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-linear-to-r ${fadeClass.l} to-transparent sm:w-16 md:w-24 lg:w-32`}
      />
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-linear-to-l ${fadeClass.r} to-transparent sm:w-16 md:w-24 lg:w-32`}
      />

      <div
        className="flex w-max items-center gap-8 sm:gap-12 md:gap-16 lg:gap-20 group-hover:[animation-play-state:paused]"
        style={{ animation: `${animationName} ${speed}s linear infinite` }}
      >
        {/* Logos rendered twice back-to-back for a seamless loop */}
        {[...logos, ...logos].map((logo, i) => (
          <div
            key={`${logo.alt}-${i}`}
            className="relative z-0 flex h-10 shrink-0 items-center justify-center transition-transform duration-300 ease-out hover:z-20 hover:scale-125 sm:h-14 md:h-16 lg:h-20"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="max-h-full w-auto object-contain transition duration-300 ease-out"
              draggable={false}
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

interface LogoSectionProps {
  eyebrow: string;
  heading: string;
  logos: Logo[];
  direction?: "left" | "right";
  speed?: number;
  background?: "white" | "gray";
}

const LogoSection: React.FC<LogoSectionProps> = ({
  eyebrow,
  heading,
  logos,
  direction = "left",
  speed = 30,
  background = "white",
}) => {
  return (
    <section
      className={`px-4 py-10 sm:px-6 sm:py-12 md:px-12 md:py-16 lg:px-20 ${
        background === "gray" ? "bg-gray-100" : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-7xl text-center">
        {/* Eyebrow */}
        <div className="mb-2 flex items-center justify-center gap-2 sm:mb-3 sm:gap-3">
          <span className="h-0.5 w-6 bg-[#193768] sm:w-8" />
          <span className="text-sm font-semibold tracking-wide text-[#193768] sm:text-base">
            {eyebrow}
          </span>
          <span className="h-0.5 w-6 bg-[#193768] sm:w-8" />
        </div>

        {/* Heading */}
        <h2 className="mb-8 text-2xl font-extrabold text-slate-900 sm:mb-10 sm:text-3xl md:mb-14 md:text-4xl lg:text-5xl">
          {heading}
        </h2>

        {/* Infinite carousel */}
        <InfiniteLogoCarousel
          logos={logos}
          direction={direction}
          speed={speed}
          fadeFrom={background}
        />
      </div>
    </section>
  );
};

const BrandSection: React.FC = () => {
  return (
    <>
      <LogoSection
        eyebrow="Partner Brands"
        heading="Our Customers"
        logos={customerLogos}
        direction="left"
        speed={28}
        background="white"
      />

      <LogoSection
        eyebrow="Farmers"
        heading="Our Exporters"
        logos={exporterLogos}
        direction="right"
        speed={34}
        background="gray"
      />
    </>
  );
};

export default BrandSection;