import React from "react";
import { Check, Minus } from "lucide-react";
import aboutImage from "../../../assets/images/about-rb.png";

interface AboutSectionProps {
  badgeLabel?: string;
  heading?: string;
  intro?: string;
  description?: string;
  buttonLabel?: string;
  imageSrc?: string;
  imageAlt?: string;
  yearsBadge?: string;
  yearsLabel?: string;
  onReadMore?: () => void;
}

const defaultImage = aboutImage;

const AboutSection: React.FC<AboutSectionProps> = ({
  badgeLabel = "About The Company",
  heading = "With the experience of four generations",
  intro = "At Fresh RB Fruitech Pvt. Ltd. we strive to give our clients an exceptional experience while rising to the top of the list of reliable business partners for our suppliers throughout the world.",
  description = "We have extensive experience in locating the highest-quality fruits from around the globe, which we are ideally able to combine with our robust distribution network across India. We are now the top fresh fruit importer in India because to our efficient supply chain, which has allowed us to reach out to more retailers and wholesalers in the existing cities as well as frequently add new ones.",
  buttonLabel = "Read More",
  imageSrc = defaultImage,
  imageAlt = "Fresh apples",
  yearsBadge = "60+",
  yearsLabel = "Year's Experience",
  onReadMore,
}) => {
  return (
    <section className="bg-white px-6 py-16 md:px-12 lg:px-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* Hexagon + badge */}
        <div className="relative mx-auto w-[90%] max-w-sm lg:w-[90%] lg:max-w-md">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-cover"
          />

          {/* Years badge */}
          <div
            className="absolute -bottom-6 right-0 flex h-40 w-40 flex-col items-center justify-center bg-[#6f9349] text-center text-white sm:h-44 sm:w-44"
            style={{
              clipPath:
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            }}
          >
            <span className="text-4xl font-extrabold leading-none sm:text-5xl">
              {yearsBadge}
            </span>
            <span className="mt-2 text-xs font-bold uppercase tracking-wide sm:text-sm">
              {yearsLabel.split(" ").map((word, i) => (
                <React.Fragment key={i}>
                  {word}
                  {i < yearsLabel.split(" ").length - 1 && <br />}
                </React.Fragment>
              ))}
            </span>
          </div>
        </div>

        {/* Content */}
        <div>
          <span className="inline-block rounded-full bg-[#eef1e2] px-5 py-2 text-sm font-medium text-[#6f9349]">
            {badgeLabel}
          </span>

          <h2 className="mt-5 text-3xl font-extrabold leading-tight text-[#16241b] sm:text-4xl md:text-5xl">
            {heading}
          </h2>

          <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg">
            {intro}
          </p>

          <div className="mt-6 flex items-start gap-3">
            <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-[#6f9349]">
              <Check size={14} className="text-white" strokeWidth={3} />
            </span>
            <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
              {description}
            </p>
          </div>

          <button
            onClick={onReadMore}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#6f9349] px-7 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#5d7d3d]"
          >
            <Minus size={18} strokeWidth={3} />
            {buttonLabel}
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
