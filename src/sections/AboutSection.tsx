import React from "react";
import { Check, Mail, Phone } from "lucide-react";
import aboutImage from "../assets/images/about-fruit.png";
import { missionVisionData } from "../data/mission";
import { leaders } from "../data/aboutContent";
import map from "../assets/images/world-map2.webp";
import PresenceInIndia from "../components/ui/Presence";
import indiaMap from "../assets/images/India.png";
import WhyChooseUs from "../components/ui/WhyChooseUs";

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
  intro = "OMM AGRI VILLA LLP stands as a premier trusted importer and trader of premium global fruits. Rooted in a true dedication to integrity and excellence, we are able to prioritize the finest produce from international orchards to serve the diverse needs of the Indian market.",
  description = "Our philosophy combines the traditional value of honesty and commitment with modern, forward-looking techniques. Adopting the gap between physical growers and local distributors, one trusted relationship at a time.",
  // buttonLabel = "Read More",
  imageSrc = defaultImage,
  imageAlt = "Fresh apples",
  yearsBadge = "30+",
  yearsLabel = "Year's Experience",
  // onReadMore,
}) => {
  return (
    <section id="about-us" className="bg-white">
      {/* About intro */}
      <div className="px-6 py-16 md:px-12 lg:px-20">
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
              className="absolute -bottom-6 right-0 flex h-40 w-40 flex-col items-center justify-center bg-[#193768] text-center text-white sm:h-44 sm:w-44"
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
            <span className="inline-block rounded-full bg-[#193768] px-5 py-2 text-md font-medium text-white">
              {badgeLabel}
            </span>

            <h2 className="mt-5 text-3xl font-extrabold leading-tight text-[#16241b] sm:text-4xl md:text-5xl">
              {heading}
            </h2>

            <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg">
              {intro}
            </p>

            <div className="mt-6 flex items-start gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-[#193768]">
                <Check size={14} className="text-white" strokeWidth={3} />
              </span>
              <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
                {description}
              </p>
            </div>

            {/* <button
              onClick={onReadMore}
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#6f9349] px-7 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#5d7d3d]"
            >
              <Minus size={18} strokeWidth={3} />
              {buttonLabel}
            </button> */}
          </div>
        </div>
      </div>

      {/* Leadership */}
      <div className="bg-[#f7f8fa] px-6 py-20 md:px-16">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="mb-3 text-3xl font-bold text-[#0f1e33] md:text-4xl">
            Leadership &amp; Vision
          </h2>
          <p className="text-gray-500">
            Guiding the next generation of agri-trade with a lasting commitment
            to national expansion.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {leaders.map((leader) => (
            <div
              key={leader.name}
              className="flex flex-col overflow-hidden rounded-2xl border border-[#193768]/10 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Header */}
              <div className="flex flex-col items-center px-8 pt-8 pb-6 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#193768] text-base font-semibold text-white ring-4 ring-[#193768]/10">
                  {leader.initials}
                </div>
                <h3 className="text-lg font-semibold text-[#0f1e33]">
                  {leader.name}
                </h3>
                <span className="mt-1 text-xs font-semibold uppercase tracking-widest text-[#b5622f]">
                  {leader.title}
                </span>
                <p className="mt-4 text-sm leading-relaxed text-gray-500">
                  {leader.bio}
                </p>
              </div>

              {/* Contact footer */}
              <div className="mt-auto space-y-2.5 border-t border-[#193768]/10 bg-[#193768]/3 px-8 py-5 text-left">
                <div className="flex items-center gap-3 text-sm text-[#344054]">
                  <Phone className="h-4 w-4 shrink-0 text-[#193768]" />
                  <span>{leader.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#344054]">
                  <Mail className="h-4 w-4 shrink-0 text-[#193768]" />
                  <span className="truncate">{leader.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
          {missionVisionData.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex h-full flex-col rounded-2xl bg-white p-8 shadow-md sm:p-10"
              >
                <div className="mb-6 flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#193768]">
                  <Icon size={36} className="text-white" strokeWidth={1.5} />
                </div>

                <h3 className="mb-4 text-2xl font-extrabold text-[#16241b]">
                  {item.title}
                </h3>

                <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Why choose us */}
      <WhyChooseUs />

      {/* Our Network */}
      <section className="px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Our Network
          </h2>

          <p className="mt-8 text-base leading-relaxed text-gray-500 sm:text-lg">
            In order to become the most dependable business partner for our
            suppliers throughout the world, OMM AGRI VILLA LLP aims to
            deliver an exceptional client experience.
          </p>

          <p className="mt-6 text-base leading-relaxed text-gray-500 sm:text-lg">
            By keeping the cost of imported fresh fruits affordable while
            retaining their exceptional quality, our company&apos;s mission is
            to combine a perfect balance of client happiness. In order to ensure
            environmental purity and excellent health, we encourage sustainable
            agriculture methods among our farmers and suppliers.
          </p>
        </div>
        <img src={map} />
      </section>

      {/* Our Presence */}
      <PresenceInIndia
        eyebrow="Presence"
        heading="OMM AGRI VILLA LLP in India"
        listLabel="States Covered"
        image={indiaMap}
        imageAlt="Illustrated map of India with cultural icons"
      />
    </section>
  );
};

export default AboutSection;
