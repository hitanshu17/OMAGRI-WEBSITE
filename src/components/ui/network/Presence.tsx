import React from "react";
import { CheckCircle2 } from "lucide-react";
import { defaultStates, type PresenceInIndiaProps } from "../../../data/States";

const PresenceInIndia: React.FC<PresenceInIndiaProps> = ({
  eyebrow = "Presence",
  heading = "RB Fruitech in India",
  listLabel = "States Covered",
  states = defaultStates,
  image = "/images/india-map.png",
  imageAlt = "Illustrated map of India with cultural icons",
  backgroundColor = "bg-[#6ba244]",
}) => {
  // Split the states into two columns, filling the first column first
  // (matches the layout in the reference design).
  const half = Math.ceil(states.length / 2);
  const columnOne = states.slice(0, half);
  const columnTwo = states.slice(half);

  return (
    <section className={`w-full ${backgroundColor} py-16 px-6 md:px-12 lg:px-20`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-white/70" aria-hidden="true" />
            <span className="text-white font-semibold tracking-wide">
              {eyebrow}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            {heading}
          </h2>
        </div>

        {/* Content: states list + illustration */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-8">
          {/* States list */}
          <div className="w-full lg:w-1/2">
            <h3 className="text-white text-xl font-bold mb-6">{listLabel}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
              <ul className="flex flex-col gap-3">
                {columnOne.map((state) => (
                  <li key={state} className="flex items-center gap-2">
                    <CheckCircle2
                      className="w-4 h-4 text-white shrink-0"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    <span className="text-white text-sm">{state}</span>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col gap-3">
                {columnTwo.map((state) => (
                  <li key={state} className="flex items-center gap-2">
                    <CheckCircle2
                      className="w-4 h-4 text-white shrink-0"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    <span className="text-white text-sm">{state}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Illustration */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <img
              src={image}
              alt={imageAlt}
              className="w-full max-w-md h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PresenceInIndia;