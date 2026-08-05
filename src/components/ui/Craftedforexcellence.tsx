import React from "react";

const KIWI_LINE_IMAGE_URL =
  "https://images.unsplash.com/photo-1548197465-d9c95d3d13ba?fm=jpg&q=80&w=1400&auto=format&fit=crop";

const ClipboardCheckIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="h-7 w-7"
    stroke="#193768"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="3.5" width="16" height="18" rx="2" />
    <path d="M8 7.5h5" />
    <path d="M8 11.5h4" />
    <path d="M7.5 15.2l1.6 1.6 3-3.4" />
  </svg>
);

const SnowflakeIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="h-7 w-7"
    stroke="#193768"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2v20" />
    <path d="M4.5 6.5l15 11" />
    <path d="M19.5 6.5l-15 11" />
    <path d="M12 2l-2 2M12 2l2 2" />
    <path d="M12 22l-2-2M12 22l2-2" />
    <path d="M4.5 6.5l2.7-.4M4.5 6.5l.4 2.7" />
    <path d="M19.5 17.5l-2.7.4M19.5 17.5l-.4-2.7" />
    <path d="M19.5 6.5l-2.7.4M19.5 6.5l-.4 2.7" />
    <path d="M4.5 17.5l2.7-.4M4.5 17.5l.4-2.7" />
  </svg>
);

const CraftedForExcellence: React.FC = () => {
  return (
    <section className="bg-[#f7f8fa] px-6 py-16 sm:px-10 lg:px-20">
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
          <div className="rounded-2xl bg-white p-8">
            <ClipboardCheckIcon />
            <h3 className="mt-5 font-serif text-xl font-bold text-[#1F2E1A]">
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
          <div className="flex flex-col rounded-2xl  bg-white  p-8">
            <SnowflakeIcon />
            <h3 className="mt-5 font-serif text-xl font-bold text-[#1F2E1A]">
              Cold-Chain Preservation
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-[#5B6153]">
              Temperature is meticulously controlled from orchard to
              delivery. Our unbroken cold chain preserves the fruit&apos;s
              integrity, crunch, and nutritional value.
            </p>

            <div className="mt-auto pt-8">
              <div className="flex items-center justify-between rounded-xl bg-[#E4E9CF] px-5 py-4">
                <span className="font-mono text-xs font-bold tracking-widest text-[#3C5A2A]">
                  OPTIMAL TEMP
                </span>
                <span className="font-mono text-sm font-bold text-[#6B8F52]">
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