import React from "react";
import { Testimonials } from "../../data/testimonials";
import { QuoteIcon } from "../shared/Icons";

const CustomerReviews: React.FC = () => {
  return (
    <section className="bg-white py-16 px-6 sm:px-10 sm:py-20 lg:px-16">
      <div className="mx-auto max-w-6xl">
        {/* Eyebrow */}
        <div className="mb-12 flex flex-col items-center">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-0.5 w-8 bg-[#193768]" />
            <span className="text-sm font-semibold tracking-wide text-[#193768] sm:text-base">
              Testimonials
            </span>
            <span className="h-0.5 w-8 bg-[#193768]" />
          </div>

          <h2 className="text-center text-3xl font-extrabold text-[#0f1e33] sm:text-4xl lg:text-5xl">
            Customer Reviews
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
          {Testimonials.map((t) => (
            <div
              key={t.name}
              className="flex h-full flex-col rounded-2xl border border-[#193768]/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-10"
            >
              <div className="mb-5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full">
                <QuoteIcon />
              </div>

              <h3 className="text-xl font-bold text-[#193768] sm:text-2xl">
                {t.title}
              </h3>

              <p className="mt-4 flex-1 text-base leading-relaxed text-gray-500 sm:text-lg">
                {t.quote}
              </p>

              <div className="mt-8 flex items-center gap-3 border-t border-[#193768]/10 pt-5 sm:mt-10">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#193768] text-sm font-semibold text-white">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <p className="text-base font-bold text-[#0f1e33] sm:text-lg">
                  {t.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;