import React from "react";
import { CultivationIcon, GradingIcon, HarvestIcon, MarketIcon } from "../shared/Icons";

interface Step {
  icon: React.ReactNode;
  stage: string;
  title: string;
  description: string;
  rotate: string;
}

const steps: Step[] = [
  {
    icon: <CultivationIcon />,
    stage: "Stage 01",
    title: "Cultivation",
    description: "Nurtured across sun-mapped micro-climates by growers who know every row by name.",
    rotate: "-rotate-2",
  },
  {
    icon: <HarvestIcon />,
    stage: "Stage 02",
    title: "Harvest",
    description: "Hand-picked at the precise hour of maturity, never a day early.",
    rotate: "rotate-1",
  },
  {
    icon: <GradingIcon />,
    stage: "Stage 03",
    title: "Grading",
    description: "Sorted and stamped for size, shape, and internal quality before a single crate ships.",
    rotate: "-rotate-1",
  },
  {
    icon: <MarketIcon />,
    stage: "Stage 04",
    title: "Market",
    description: "Delivered fresh through an unbroken, meticulously logged cold chain.",
    rotate: "rotate-2",
  },
];

const FromOrchardToMarket: React.FC = () => {
  return (
    <section className="bg-[#f7f8fa] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p
            className="text-xs font-medium uppercase tracking-[0.3em]"
            style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}
          >
            The Route
          </p>
          <h2
            className="mt-4 text-4xl font-bold md:text-5xl"
            style={{ fontFamily: "'Fraunces', ui-serif, Georgia, serif" }}
          >
            From Orchard to Market
          </h2>
        </div>

        <div className="relative mt-20">
          {/* route line: horizontal on desktop, vertical on mobile */}
          <div
            className="absolute left-1/2 top-0 hidden h-full w-px border-l border-dashed border-[#5a6e52] md:left-0 md:top-8 md:block md:h-px md:w-full md:border-l-0 md:border-t"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 gap-16 md:grid-cols-4 md:gap-6">
            {steps.map((step) => (
              <div key={step.title} className="relative flex flex-col items-center text-center">
                <div
                  className={`relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-[#C99A45] bg-[#193768] text-[#F3ECDC] ${step.rotate}`}
                >
                  {step.icon}
                </div>

                <div
                  className={`w-full max-w-58 rounded-sm border border-[#e4dcc4] bg-white p-6 shadow-[3px_3px_0_#00000022] ${step.rotate}`}
                >
                  <p
                    className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#193768]"
                    style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}
                  >
                    {step.stage}
                  </p>
                  <h3
                    className="mt-1 text-xl font-bold text-[#241F1A]"
                    style={{ fontFamily: "'Fraunces', ui-serif, Georgia, serif" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="mt-3 text-sm leading-relaxed text-[#5a5347]"
                    style={{ fontFamily: "'IBM Plex Sans', system-ui, sans-serif" }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FromOrchardToMarket;