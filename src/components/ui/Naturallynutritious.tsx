import React from "react";
import { HeartIcon, LeafIcon, ShieldIcon } from "../shared/Icons";

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: <ShieldIcon />,
    title: "Immunity Support",
    description:
      "Exceptionally high Vitamin C content to support a robust immune system.",
  },
  {
    icon: <LeafIcon />,
    title: "Digestive Wellness",
    description:
      "Rich in dietary fiber and actinidin, an enzyme that aids natural digestion.",
  },
  {
    icon: <HeartIcon />,
    title: "Heart Health",
    description:
      "A great source of potassium, contributing to healthy cardiovascular function.",
  },
];

const NaturallyNutritious: React.FC = () => {
  return (
    <section className="bg-[#f7f8fa] px-6 py-20">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="font-serif text-4xl font-bold text-[#1f2e1a] md:text-5xl">
          Naturally Nutritious
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#3f4a3a]">
          Beyond exceptional taste, Hayat Kiwis are a vibrant source of
          vitality. Packed with essential vitamins, antioxidants, and digestive
          enzymes, they are nature&apos;s perfectly packaged daily health boost.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-2xl bg-[white] p-8 text-center shadow-sm"
            >
              <div className="mx-auto mb-5 flex h-8 w-8 items-center justify-center text-[#193768]">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-[#1f2e1a]">
                {benefit.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#5a6452]">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NaturallyNutritious;
