import React from "react";
import { Globe, UtensilsCrossed, Star, Truck, type LucideIcon } from "lucide-react";

interface Advantage {
  id: string;
  icon: LucideIcon;
  specCode: string;
  label: string;
  description: string;
}

const ADVANTAGES: Advantage[] = [
  {
    id: "origins",
    icon: Globe,
    specCode: "Origin",
    label: "Global Origins",
    description: "Sourced exclusively from world-renowned kiwi-growing regions.",
  },
  {
    id: "flavor",
    icon: UtensilsCrossed,
    specCode: "Brix",
    label: "Rich & Sweet",
    description: "Consistently high brix levels for a reliably sweet flavor profile.",
  },
  {
    id: "grading",
    icon: Star,
    specCode: "Grade A+",
    label: "Premium Grading",
    description: "Visually flawless fruit, sorted to exact specifications.",
  },
  {
    id: "supply",
    icon: Truck,
    specCode: "Supply",
    label: "Reliable Supply",
    description: "Consistent volume availability for commercial partners.",
  },
];

const HayatAdvantage: React.FC = () => {
  return (
    <section className="bg-white px-6 py-24 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p
            className="text-xs font-medium uppercase tracking-[0.3em] text-[#193768]"
            style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}
          >
            Certified Quality
          </p>
          <h2
            className="mt-4 text-3xl font-bold text-[#1B2A1C] sm:text-4xl"
            style={{ fontFamily: "'Fraunces', ui-serif, Georgia, serif" }}
          >
            The Hayat Advantage
          </h2>
          <div className="mx-auto mt-5 h-px w-16 bg-[#193768]" aria-hidden="true" />
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {ADVANTAGES.map(({ id, icon: Icon, specCode, label, description }, i) => (
            <div
              key={id}
              className={`px-0 py-8 sm:px-8 sm:py-0 ${
                i !== 0 ? "border-t border-dashed border-[#c9bb98] sm:border-t-0 sm:border-l" : ""
              } ${i === 2 ? "sm:border-t sm:border-t-dashed lg:border-t-0" : ""} ${
                i === 3 ? "sm:border-t sm:border-t-dashed lg:border-t-0" : ""
              }`}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-sm border-[1.5px] border-[#1B2A1C] bg-[#193768]">
                <Icon className="h-6 w-6 text-white" strokeWidth={1.75} />
              </div>

              <p
                className="mt-5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#193768]"
                style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}
              >
                Spec — {specCode}
              </p>
              <h3
                className="mt-1.5 text-lg font-bold text-[#1B2A1C]"
                style={{ fontFamily: "'IBM Plex Sans', system-ui, sans-serif" }}
              >
                {label}
              </h3>
              <p
                className="mt-3 text-[15px] leading-relaxed text-[#5a5347]"
                style={{ fontFamily: "'IBM Plex Sans', system-ui, sans-serif" }}
              >
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HayatAdvantage;