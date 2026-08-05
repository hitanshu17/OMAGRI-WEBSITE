import React, { useEffect, useState } from "react";

/**
 * Fruit availability calendar rendered inside a popup/modal.
 * Drop <FruitCalendarPopup /> anywhere; it renders its own trigger button.
 */

type Level = "none" | "limited" | "available" | "plenty" | "peak";

interface FruitRow {
  name: string;
  emoji: string;
  window: string;
  months: Level[]; // Jan..Dec, length 12
}

const FRUITS: FruitRow[] = [
  {
    name: "Mandarins",
    emoji: "🍊",
    window: "February — October",
    months: [
      "none",
      "limited",
      "available",
      "plenty",
      "plenty",
      "peak",
      "plenty",
      "plenty",
      "available",
      "limited",
      "none",
      "none",
    ],
  },
  {
    name: "Apples",
    emoji: "🍎",
    window: "Year-round",
    months: [
      "available",
      "available",
      "available",
      "available",
      "available",
      "available",
      "available",
      "available",
      "available",
      "available",
      "available",
      "available",
    ],
  },
  {
    name: "Pears",
    emoji: "🍐",
    window: "January — September",
    months: [
      "limited",
      "available",
      "plenty",
      "plenty",
      "peak",
      "plenty",
      "plenty",
      "available",
      "limited",
      "none",
      "none",
      "none",
    ],
  },
  {
    name: "Grapes",
    emoji: "🍇",
    window: "July — November",
    months: [
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "limited",
      "available",
      "peak",
      "available",
      "limited",
      "none",
    ],
  },
  {
    name: "Oranges",
    emoji: "🍊",
    window: "January — September",
    months: [
      "limited",
      "available",
      "plenty",
      "plenty",
      "peak",
      "plenty",
      "plenty",
      "available",
      "limited",
      "none",
      "none",
      "none",
    ],
  },
  {
    name: "Grapefruit",
    emoji: "🍊",
    window: "February — August",
    months: [
      "none",
      "limited",
      "available",
      "plenty",
      "peak",
      "plenty",
      "available",
      "limited",
      "none",
      "none",
      "none",
      "none",
    ],
  },
  {
    name: "Kiwis",
    emoji: "🥝",
    window: "April — December",
    months: [
      "none",
      "none",
      "none",
      "limited",
      "available",
      "plenty",
      "plenty",
      "peak",
      "plenty",
      "plenty",
      "available",
      "limited",
    ],
  },
  {
    name: "Dragon Fruit",
    emoji: "🐲",
    window: "Year-round",
    months: [
      "available",
      "available",
      "available",
      "available",
      "available",
      "available",
      "available",
      "available",
      "available",
      "available",
      "available",
      "available",
    ],
  },
  {
    name: "Avocados",
    emoji: "🥑",
    window: "March — November",
    months: [
      "none",
      "none",
      "limited",
      "available",
      "plenty",
      "plenty",
      "peak",
      "plenty",
      "plenty",
      "available",
      "limited",
      "none",
    ],
  },
  {
    name: "Plums",
    emoji: "🍑",
    window: "November — April",
    months: [
      "peak",
      "peak",
      "available",
      "limited",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "limited",
      "available",
    ],
  },
  {
    name: "Wet Dates",
    emoji: "🌴",
    window: "August — October",
    months: [
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "limited",
      "peak",
      "limited",
      "none",
      "none",
    ],
  },
  {
    name: "Cherries",
    emoji: "🍒",
    window: "November — February",
    months: [
      "peak",
      "limited",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "limited",
      "peak",
    ],
  },
];

const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const LEVEL_STYLES: Record<Level, string> = {
  none: "bg-slate-50 text-slate-300",
  limited: "bg-amber-50 text-amber-500",
  available: "bg-blue-50 text-blue-600",
  plenty: "bg-emerald-50 text-emerald-600",
  peak: "bg-orange-50 text-orange-500",
};

function Cell({ level }: { level: Level }) {
  const content: Record<Level, React.ReactNode> = {
    none: <span className="text-slate-300">–</span>,
    limited: <span className="text-amber-500">•</span>,
    available: <span className="text-blue-600 font-semibold">✓</span>,
    plenty: <span className="text-emerald-600">•</span>,
    peak: <span className="text-orange-500">★</span>,
  };
  return (
    <td
      className={`h-14 w-full text-center align-middle text-sm ${LEVEL_STYLES[level]}`}
    >
      {content[level]}
    </td>
  );
}

function LegendItem({
  symbol,
  label,
  className,
}: {
  symbol: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-slate-500">
      <span
        className={`inline-flex h-4 w-4 items-center justify-center ${className ?? ""}`}
      >
        {symbol}
      </span>
      <span>{label}</span>
    </div>
  );
}

function FruitCalendarModal({ onClose }: { onClose: () => void }) {
  // close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Fruit availability calendar"
    >
      <div className="flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              12 fruits · 12 months
            </p>
            <h2 className="mt-0.5 text-2xl font-bold text-[#1e3a5f]">
              Seasonal availability
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close calendar"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-slate-100 px-6 py-3">
          <LegendItem symbol="–" label="Not in season" />
          <LegendItem symbol="•" label="Limited" className="text-amber-500" />
          <LegendItem
            symbol="✓"
            label="Available"
            className="text-blue-600 font-semibold"
          />
          <LegendItem
            symbol="•"
            label="Plenty available"
            className="text-emerald-600"
          />
          <LegendItem
            symbol="★"
            label="Best time / Peak"
            className="text-orange-500"
          />
        </div>

        {/* Table */}
        <div className="overflow-auto">
          <table className="w-full min-w-225 border-collapse">
            <thead>
              <tr className="bg-[#1e3a5f]">
                <th className="sticky left-0 z-10 bg-[#1e3a5f] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-white">
                  Fruit
                </th>
                {MONTHS.map((m) => (
                  <th
                    key={m}
                    className="min-w-16 px-2 py-3 text-center text-xs font-semibold uppercase tracking-wide text-white"
                  >
                    {m}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FRUITS.map((fruit, i) => (
                <tr
                  key={fruit.name}
                  className={i % 2 === 0 ? "bg-white" : "bg-slate-50/40"}
                >
                  <td className="sticky left-0 z-10 min-w-48 border-r border-slate-100 bg-inherit px-4 py-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl leading-none">
                        {fruit.emoji}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {fruit.name}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {fruit.window}
                        </p>
                      </div>
                    </div>
                  </td>
                  {fruit.months.map((level, idx) => (
                    <Cell key={idx} level={level} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer note */}
        <div className="border-t border-slate-100 px-6 py-3">
          <p className="text-[11px] leading-relaxed text-slate-400">
            Availability levels are planning guidance derived from each fruit's
            stated seasonal window. Actual supply may change with origin, crop
            conditions, and logistics. Contact our team to confirm current
            availability.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FruitCalendarPopup() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[#193768] cursor-pointer"
      >
        View fruit calendar
      </button>

      {open && <FruitCalendarModal onClose={() => setOpen(false)} />}
    </>
  );
}
