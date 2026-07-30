import React from "react";
import { Testimonials } from "../../../data/testimonials";
import { QuoteIcon } from "../../shared/Icons";

const CustomerReviews: React.FC = () => {
  return (
    <section className="bg-white py-20 px-6 sm:px-10 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-0.5 bg-[#193768]" />
          <span className="text-[#193768] font-semibold tracking-wide">
            Testimonials
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-12">
          Customer Reviews
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-green-50/60 rounded-3xl p-10 flex flex-col"
            >
              <QuoteIcon />

              <h3 className="mt-6 text-2xl font-bold text-green-700">
                {t.title}
              </h3>

              <p className="mt-4 text-slate-500 leading-relaxed text-lg">
                {t.quote}
              </p>

              <p className="mt-10 text-xl font-bold text-slate-900">{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
