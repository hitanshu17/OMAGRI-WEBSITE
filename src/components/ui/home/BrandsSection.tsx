import React from "react";
import brands1 from "../../../assets/images/brands-1.jpg";
import brands2 from "../../../assets/images/brands-2.jpg";

interface LogoSectionProps {
  eyebrow: string;
  heading: string;
  logo: string;
  background?: "white" | "gray";
}

const LogoSection: React.FC<LogoSectionProps> = ({
  eyebrow,
  heading,
  logo,
  background = "white",
}) => {
  return (
    <section
      className={`px-6 py-16 md:px-12 lg:px-20 ${
        background === "gray" ? "bg-gray-100" : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-7xl text-center">
        {/* Eyebrow */}
        <div className="mb-3 flex items-center justify-center gap-3">
          <span className="h-0.5 w-8 bg-[#193768]" />
          <span className="font-semibold tracking-wide text-[#193768]">
            {eyebrow}
          </span>
        </div>

        {/* Heading */}
        <h2 className="mb-14 text-4xl font-extrabold text-slate-900 sm:text-5xl">
          {heading}
        </h2>

        {/* Brand Image */}
        <div className="flex justify-center">
          <img
            src={logo}
            alt={heading}
            className="w-full max-w-6xl h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

const PartnerBrands: React.FC = () => {
  return (
    <>
      <LogoSection
        eyebrow="Partner Brands"
        heading="Our Customers"
        logo={brands1}
        background="white"
      />

      <LogoSection
        eyebrow="Farmers"
        heading="Our Exporters"
        logo={brands2}
        background="gray"
      />
    </>
  );
};

export default PartnerBrands;
