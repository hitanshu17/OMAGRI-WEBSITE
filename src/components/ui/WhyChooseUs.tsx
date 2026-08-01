import React from "react";
import { motion, type Variants } from "framer-motion";

type Position = "top" | "bottom";

interface WhyChooseUsItem {
  id: string;
  number: string;
  title: string;
  description: string;
  position: Position;
}

const ITEMS: WhyChooseUsItem[] = [
  {
    id: "experience",
    number: "01",
    title: "Generational Experience",
    description:
      "Generational experience in the fruit business, giving us a deep, practical understanding of quality, sourcing and seasonality.",
    position: "bottom",
  },
  {
    id: "imports",
    number: "02",
    title: "Direct Imports",
    description:
      "Direct imports from leading international growers ensure freshness, consistency and traceability at every step.",
    position: "top",
  },
  {
    id: "quality",
    number: "03",
    title: "Premium Quality",
    description:
      "A dedicated quality team backs every consignment with premium quality assurance from sourcing to delivery.",
    position: "bottom",
  },
  {
    id: "network",
    number: "04",
    title: "Pan-India Network",
    description:
      "A strong wholesale and distribution network across India keeps our fruit moving fast, wherever you are.",
    position: "top",
  },
  {
    id: "supply",
    number: "05",
    title: "Reliable Supply",
    description:
      "Reliable, consistent supply paired with competitive pricing you can plan your business around.",
    position: "bottom",
  },
  {
    id: "customer",
    number: "06",
    title: "Customer First",
    description:
      "A customer-first approach built on trust, transparency and long-term business relationships.",
    position: "top",
  },
];

const ACCENT = "#5C7F3A"; // olive-green accent from the reference design
const ACCENT_TINT = "#EEF3E7"; // soft green tint behind each circle

/** Bracket-box icon matching the reference design's mark */
const BoxScanIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* corner brackets */}
    <path
      d="M6 16V10a4 4 0 0 1 4-4h6"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M42 16V10a4 4 0 0 0-4-4h-6"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M6 32v6a4 4 0 0 0 4 4h6"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M42 32v6a4 4 0 0 1-4 4h-6"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    {/* isometric box */}
    <path
      d="M24 15l9 5v10l-9 5-9-5V20l9-5Z"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path
      d="M15 20l9 5 9-5M24 25v10"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
  </svg>
);

/** Builds a smooth zigzag path connecting each item's x position */
function buildZigzagPath(count: number, width: number, height: number) {
  const step = width / count;

  const centerY = height / 2;
  const amplitude = 28; // adjust for more/less wave

  const points = Array.from({ length: count }, (_, i) => ({
    x: step * (i + 0.5),
    y: centerY,
  }));

  let d = `M ${points[0].x} ${centerY}`;

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];

    const midX = (prev.x + curr.x) / 2;
    const waveY = i % 2 === 0
      ? centerY - amplitude
      : centerY + amplitude;

    d += `
      C
      ${midX - step / 4} ${prev.y},
      ${midX} ${waveY},
      ${curr.x} ${curr.y}
    `;
  }

  return d;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.35,
      delayChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const pathVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: ITEMS.length * 0.35, ease: "easeInOut" },
  },
};

const PATH_WIDTH = 1200;
const PATH_HEIGHT = 160;

const WhyChooseUs: React.FC = () => {
  const pathD = buildZigzagPath(ITEMS.length, PATH_WIDTH, PATH_HEIGHT);

  return (
    <section className="w-full py-16 sm:py-20 px-4 sm:px-6">
      <h2 className="text-center text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-10 sm:mb-14">
        Why Choose Us?
      </h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-6xl mx-auto rounded-2xl bg-slate-50/80"
      >
        {/* ---------- Desktop / tablet zigzag layout ---------- */}
        <div className="hidden md:block relative px-8 lg:px-12 py-14">
          {/* dashed connector path */}
          <svg
            className="absolute left-8 right-8 lg:left-12 lg:right-12 top-1/2 -translate-y-1/2 w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)] h-40 pointer-events-none"
            viewBox={`0 0 ${PATH_WIDTH} ${PATH_HEIGHT}`}
            preserveAspectRatio="none"
            fill="none"
          >
            <motion.path
              d={pathD}
              stroke="#CBD5C7"
              strokeWidth="2"
              strokeDasharray="6 8"
              strokeLinecap="round"
              variants={pathVariants}
            />
          </svg>

          <div className="relative z-10 flex items-stretch justify-between gap-2">
            {ITEMS.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="flex flex-col items-center flex-1 min-w-0"
              >
                {/* top text slot */}
                <div className="h-36 flex items-end justify-center text-center px-1">
                  {item.position === "top" && (
                    <TextBlock
                      title={item.title}
                      description={item.description}
                    />
                  )}
                </div>

                {/* icon */}
                <div className="h-32 flex items-center justify-center">
                  <CircleIcon number={item.number} />
                </div>

                {/* bottom text slot */}
                <div className="h-36 flex items-start justify-center text-center px-1">
                  {item.position === "bottom" && (
                    <TextBlock
                      title={item.title}
                      description={item.description}
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ---------- Mobile: vertical timeline ---------- */}
        <div className="md:hidden relative px-6 py-10">
          <div
            className="absolute left-11 top-10 bottom-10 w-px"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, #CBD5C7 0 6px, transparent 6px 14px)",
            }}
          />
          <div className="flex flex-col gap-10">
            {ITEMS.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="relative flex items-start gap-5"
              >
                <div className="relative z-10 shrink-0">
                  <CircleIcon number={item.number} />
                </div>
                <div className="pt-2">
                  <h3 className="text-lg font-extrabold uppercase tracking-tight text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const TextBlock: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => (
  <div className="max-w-45 lg:max-w-50">
    <h3 className="text-sm lg:text-base font-extrabold uppercase tracking-tight text-slate-900 mb-1.5">
      {title}
    </h3>
    <p className="text-xs lg:text-[13px] text-slate-500 leading-relaxed">
      {description}
    </p>
  </div>
);

const CircleIcon: React.FC<{ number: string }> = ({ number }) => (
  <div className="group relative">
    <div
      className="w-20 h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center transition-colors duration-300 ease-out cursor-pointer"
      style={{ backgroundColor: ACCENT_TINT }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.backgroundColor = ACCENT;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.backgroundColor = ACCENT_TINT;
      }}
    >
      <BoxScanIcon className="w-8 h-8 lg:w-9 lg:h-9 text-(--icon-color) transition-colors duration-300 ease-out group-hover:text-white!" />
    </div>
    <span
      className="absolute -top-1.5 -right-1.5 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-xs font-bold text-slate-900"
      style={{ boxShadow: "0 2px 8px rgba(15, 23, 42, 0.12)" }}
    >
      {number}
    </span>
  </div>
);

export default WhyChooseUs;
