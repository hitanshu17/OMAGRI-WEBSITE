import React from "react";
import { Globe, UtensilsCrossed, Star, Truck, type LucideIcon } from "lucide-react";

interface Advantage {
  id: string;
  icon: LucideIcon;
  label: string;
  description: string;
}

const ADVANTAGES: Advantage[] = [
  {
    id: "origins",
    icon: Globe,
    label: "Global Origins",
    description: "Sourced exclusively from world-renowned kiwi-growing regions.",
  },
  {
    id: "flavor",
    icon: UtensilsCrossed,
    label: "Rich & Sweet",
    description: "Consistently high brix levels for a reliably sweet flavor profile.",
  },
  {
    id: "grading",
    icon: Star,
    label: "Premium Grading",
    description: "Visually flawless fruit, sorted to exact specifications.",
  },
  {
    id: "supply",
    icon: Truck,
    label: "Reliable Supply",
    description: "Consistent volume availability for commercial partners.",
  },
];

const HayatAdvantage: React.FC = () => {
  return (
    <section className="bg-white px-6 py-16 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold text-[#1F2E1A] sm:text-4xl">
          The Hayat Advantage
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {ADVANTAGES.map(({ id, icon: Icon, label, description }) => (
            <div key={id}>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#193768]">
                <Icon className="h-6 w-6 text-white" strokeWidth={1.75} />
              </div>
              <h3 className="mt-5 font-mono text-xs font-bold uppercase tracking-widest text-[#1F2E1A]">
                {label}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#5B6153]">
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