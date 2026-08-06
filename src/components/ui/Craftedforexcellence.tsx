import React from "react";
import { ClipboardCheckIcon, SnowflakeIcon } from "../shared/Icons";
import kiwiBelt from "../../assets/images/kiwi-belt.jpeg";

const KIWI_LINE_IMAGE_URL = kiwiBelt;

const CraftedForExcellence: React.FC = () => {
  return (
    <section className="bg-white px-6 py-16 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-[#1F2E1A] sm:text-4xl">
            Crafted for Excellence
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] text-[#6B6F5F] sm:text-base">
            Our meticulous process ensures that only the finest fruit reaches
            your hands.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Card 1: Rigorous Selection */}
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <ClipboardCheckIcon />
            <h3 className="mt-5 text-xl font-bold text-[#1F2E1A]">
              Rigorous Selection
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-[#5B6153]">
              Every Hayat Kiwi undergoes a stringent selection process. We
              assess size, shape, color, and brix (sugar content) to ensure
              uniformity and perfection.
            </p>
            <div className="mt-6 overflow-hidden rounded-xl">
              <img
                src={KIWI_LINE_IMAGE_URL}
                alt="Kiwi fruit moving along a steel processing line"
                className="h-56 w-full object-cover"
              />
            </div>
          </div>

          {/* Card 2: Cold-Chain Preservation */}
          <div className="flex flex-col rounded-2xl bg-white p-8 shadow-sm">
            <SnowflakeIcon />
            <h3 className="mt-5 text-xl font-bold text-[#1F2E1A]">
              Cold-Chain Preservation
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-[#5B6153]">
              Temperature is meticulously controlled from orchard to delivery.
              Our unbroken cold chain preserves the fruit&apos;s integrity,
              crunch, and nutritional value.
            </p>

            <div className="mt-auto pt-8">
              <div className="flex items-center justify-between rounded-xl bg-[#193768] px-5 py-4">
                <span className="font-mono text-xs font-bold tracking-widest text-white">
                  OPTIMAL TEMP
                </span>
                <span className="font-mono text-sm font-bold text-white">
                  0.0°C
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CraftedForExcellence;
