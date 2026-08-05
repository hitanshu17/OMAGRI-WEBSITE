import React from "react";

interface PromisePoint {
  id: string;
  text: string;
}

const PROMISE_POINTS: PromisePoint[] = [
  { id: "maturity", text: "Hand-selected for optimal maturity and peak flavor." },
  { id: "sweetness", text: "Naturally sweet, developed slowly in ideal climates." },
  { id: "standards", text: "Adherence strictly to rigorous international agricultural standards." },
];

const KIWI_IMAGE_URL =
  "https://images.unsplash.com/photo-1679065103638-7360cb935fac?fm=jpg&q=80&w=1200&auto=format&fit=crop";

const CheckIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="h-5 w-5 shrink-0"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9.25" stroke="#193768" strokeWidth="1.5" />
    <path
      d="M8 12.5l2.5 2.5 5.5-6"
      stroke="#193768"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BadgeIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="h-3.5 w-3.5 shrink-0"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="8.5" stroke="white" strokeWidth="1.4" />
    <path
      d="M9 12.3l2 2 4-4.6"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HayatPromise: React.FC = () => {
  return (
    <section className="bg-white px-6 py-16 sm:px-10 lg:px-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Image */}
        <div className="overflow-hidden rounded-3xl shadow-sm">
          <img
            src={KIWI_IMAGE_URL}
            alt="Two halves of a ripe kiwi fruit, sliced to show the green flesh and seeds"
            className="h-120 w-full object-cover sm:h-140"
          />
        </div>

        {/* Content */}
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#193768] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
            <BadgeIcon />
            The Hayat Promise
          </span>

          <h2 className="mt-6 text-4xl font-bold leading-[1.15] text-[#1F2E1A] sm:text-[2.75rem]">
            Uncompromising Quality in Every Bite
          </h2>

          <p className="mt-6 text-[15px] leading-relaxed text-[#4B5245] sm:text-base">
            Our promise is simple yet profound: to deliver kiwis of
            exceptional quality. This means hand-selected maturity, ensuring
            each fruit is picked at the precise moment of natural sweetness.
            We adhere strictly to international standards, guaranteeing a
            premium experience that honors the natural perfection of the
            fruit.
          </p>

          <ul className="mt-8 space-y-4">
            {PROMISE_POINTS.map((point) => (
              <li key={point.id} className="flex items-start gap-3">
                <CheckIcon />
                <span className="text-[15px] text-[#333A2E] sm:text-base">
                  {point.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HayatPromise;