import React from "react";
import { CheckBadgeIcon } from "../shared/Icons";

interface TrustBadge {
  label: string;
}

const badges: TrustBadge[] = [
  { label: "Leading Retailers" },
  { label: "Fine Dining Chefs" },
  { label: "Premium Exporters" },
];

const TrustedByProfessionals: React.FC = () => {
  return (
    <section className="bg-[#f7f8fa] px-6 py-20">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="font-serif text-4xl font-bold text-[#1f2e1a] md:text-5xl">
          Trusted by Professionals
        </h2>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {badges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 text-lg font-semibold text-[#4a5a45]"
            >
              <span className="text-[#6b7a5e]">
                <CheckBadgeIcon />
              </span>
              {badge.label}
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-3xl bg-[#193768] px-8 py-16 md:px-16">
          <h3 className="font-serif text-3xl font-bold leading-tight text-white md:text-5xl">
            Premium by Nature.
            <br />
            Trusted Worldwide.
          </h3>
          <p className="mx-auto mt-6 max-w-2xl text-base text-[#c9d0bf] md:text-lg">
            Experience the Hayat promise of uncompromising quality, from the
            world&apos;s finest orchards to your table.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustedByProfessionals;