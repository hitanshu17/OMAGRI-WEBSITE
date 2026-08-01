import { useRef, useState, createContext, useContext } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";
import { getFruitBySlug, type FruitData, type Variety } from "../data/fruits";

// Dark backdrop derived from the primary brand navy (#193768), used in
// place of flat near-black for the varieties section and footer.
const BRAND_DARK = "#0B1526";

function BackButton() {
  const navigate = useNavigate();
  return (
    <motion.button
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      onClick={() => navigate(-1)}
      aria-label="Back"
      className="fixed z-40 flex items-center gap-1 rounded-full py-2 pl-2.5 pr-4 text-[15px] font-medium text-white backdrop-blur-md transition-transform active:scale-95 focus-visible:outline-2 focus-visible:outline-white/70"
      style={{
        top: "max(1.25rem, env(safe-area-inset-top))",
        left: "max(1.25rem, env(safe-area-inset-left))",
        background: "rgba(20,20,20,0.45)",
        border: "1px solid rgba(255,255,255,0.14)",
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M15 5l-7 7 7 7"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Back
    </motion.button>
  );
}

function FruitGlyph({ fruit, size = 1 }: { fruit: FruitData; size?: number }) {
  const { accent, deep, shape } = fruit;
  const w = 260 * size;

  if (shape === "cluster") {
    const positions: [number, number][] = [
      [0.5, 0.06],
      [0.28, 0.22],
      [0.72, 0.22],
      [0.14, 0.42],
      [0.5, 0.4],
      [0.86, 0.42],
      [0.3, 0.62],
      [0.7, 0.62],
      [0.5, 0.8],
    ];
    return (
      <div
        style={{ position: "relative", width: w, height: w * 1.15 }}
        aria-hidden="true"
      >
        <div
          style={{
            position: "absolute",
            left: "46%",
            top: 0,
            width: 3,
            height: w * 0.12,
            background: deep,
            borderRadius: 2,
          }}
        />
        {positions.map(([x, y], i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `calc(${x * 100}% - ${w * 0.11}px)`,
              top: `calc(${y * 100}% + ${w * 0.1}px)`,
              width: w * 0.22,
              height: w * 0.22,
              borderRadius: "50%",
              background: `radial-gradient(circle at 32% 28%, ${accent}, ${deep})`,
              boxShadow: "inset -4px -6px 14px rgba(0,0,0,0.35)",
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      style={{ position: "relative", width: w, height: w }}
      aria-hidden="true"
    >
      <div
        style={{
          position: "absolute",
          left: "54%",
          top: -w * 0.02,
          width: w * 0.22,
          height: w * 0.13,
          background: `linear-gradient(120deg, ${accent}55, #6B8E23)`,
          borderRadius: "0% 100% 40% 60% / 0% 100% 20% 100%",
          transform: "rotate(20deg)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius:
            shape === "citrus" ? "50%" : "48% 52% 46% 54% / 58% 54% 46% 42%",
          background: `radial-gradient(circle at 34% 30%, ${accent}, ${deep} 78%)`,
          boxShadow:
            "inset -14px -18px 40px rgba(0,0,0,0.4), 0 30px 60px -20px rgba(0,0,0,0.5)",
        }}
      />
      {shape === "citrus" && (
        <div
          style={{
            position: "absolute",
            inset: "6%",
            borderRadius: "50%",
            opacity: 0.18,
            background: `repeating-conic-gradient(${deep} 0deg 3deg, transparent 3deg 30deg)`,
          }}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  TiltLayer — wraps the hero photo/glyph, tilts it in 3D toward     */
/*  the cursor. Spring-smoothed, subtle range, mouse-only, disabled   */
/*  entirely under prefers-reduced-motion.                            */
/* ------------------------------------------------------------------ */

function TiltLayer({
  reduceMotion,
  children,
}: {
  reduceMotion: boolean;
  children: React.ReactNode;
}) {
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const springConfig = { stiffness: 140, damping: 18, mass: 0.6 };
  const rotateX = useSpring(rawRotateX, springConfig);
  const rotateY = useSpring(rawRotateY, springConfig);
  const scale = useSpring(1, springConfig);

  const MAX_DEG = 6; // subtle — keep this small, it's a texture not a gimmick

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rawRotateY.set(px * MAX_DEG * 2);
    rawRotateX.set(-py * MAX_DEG * 2);
    scale.set(1.02);
  };

  const handlePointerLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
    scale.set(1);
  };

  return (
    <div
      className="h-full w-full"
      style={{ perspective: 1200 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        className="h-full w-full"
        style={{
          rotateX: reduceMotion ? 0 : rotateX,
          rotateY: reduceMotion ? 0 : rotateY,
          scale: reduceMotion ? 1 : scale,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FruitHero — pins via sticky + scroll-linked transform. Now also    */
/*  carries the 1-2 line intro, since the story chapters are gone.     */
/* ------------------------------------------------------------------ */

function FruitHero({
  fruit,
  reduceMotion,
}: {
  fruit: FruitData;
  reduceMotion: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const [imgError, setImgError] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [1, 0.6],
  );
  const imgY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, -60],
  );
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const titleY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, -60],
  );
  const scrimOpacity = useTransform(scrollYProgress, [0, 1], [0.15, 0.55]);

  return (
    // Extra scroll room is what creates the "pin" — the inner div is
    // sticky, so it stays fixed to the viewport while this section's
    // extra height scrolls underneath it.
    <section ref={ref} style={{ height: "180vh" }} className="relative">
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center"
        style={{
          background: `radial-gradient(120% 100% at 80% 20%, ${fruit.deep}, ${BRAND_DARK} 70%)`,
        }}
      >
        <motion.div
          className="absolute right-0 top-0 h-full w-full sm:w-2/3"
          style={{ scale, y: imgY }}
        >
          <TiltLayer reduceMotion={reduceMotion}>
            {!imgError ? (
              <img
                src={fruit.heroImage}
                alt=""
                role="presentation"
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              // Fallback renders at every breakpoint, not just mobile —
              // previously this only showed below `sm`, so a 404'd photo
              // left desktop visitors with an empty gradient.
              <div className="flex h-full w-full items-center justify-center">
                <FruitGlyph fruit={fruit} size={1.3} />
              </div>
            )}
            {!imgError && (
              <div className="absolute right-[8%] top-1/2 -translate-y-1/2 sm:hidden">
                <FruitGlyph fruit={fruit} size={1.1} />
              </div>
            )}
          </TiltLayer>
        </motion.div>

        {/* Static veil: guarantees title legibility regardless of scroll
            position or how bright the photo is. The scroll-linked scrim
            below adds extra darkening as the section pins/scrolls. */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.05) 75%)",
          }}
        />
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "#000", opacity: scrimOpacity }}
        />

        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="relative z-10 max-w-4xl px-6 sm:px-10 lg:px-16"
        >
          <h1
            className="leading-[0.85] font-bold text-white"
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(3.2rem, 12vw, 8.5rem)",
              letterSpacing: "-0.02em",
            }}
          >
            {fruit.name}
          </h1>
          <p
            className="mt-6 max-w-md text-lg sm:text-xl italic text-white/70"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            {fruit.tagline}
          </p>
          <p className="mt-5 max-w-xl text-sm sm:text-base leading-relaxed text-white/55">
            {fruit.intro}
          </p>
          <div className="mt-10 flex items-center gap-4">
            <button
              className="px-6 py-3 rounded-full font-semibold text-sm text-black transition-transform hover:scale-105 focus-visible:outline-2"
              style={{ background: fruit.accent }}
            >
              Enquire about {fruit.name}
            </button>
            <span className="text-white/50 text-sm hidden sm:inline">
              Scroll to explore ↓
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  VarietiesGrid — stagger reveal, now with a photo per variety       */
/* ------------------------------------------------------------------ */

const gridContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const gridItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

function VarietyCard({
  variety,
  accent,
  reduceMotion,
}: {
  variety: Variety;
  accent: string;
  reduceMotion: boolean;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.article
      variants={reduceMotion ? undefined : gridItem}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      transition={{ duration: 0.25 }}
      className="overflow-hidden rounded-2xl border border-white/10"
      style={{ background: "rgba(255,255,255,0.03)" }}
    >
      <div className="aspect-4/3 w-full overflow-hidden bg-white/5">
        {!imgError ? (
          <img
            src={variety.image}
            alt={variety.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span
              className="h-10 w-10 rounded-full"
              style={{ background: accent }}
            />
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: accent }}
          />
          <span className="font-mono text-[10px] tracking-widest text-white/40">
            {variety.code}
          </span>
        </div>
        <h3
          className="text-white font-semibold text-lg mb-2"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          {variety.name}
        </h3>
        <p className="text-white/55 text-sm leading-relaxed">{variety.blurb}</p>
      </div>
    </motion.article>
  );
}

function VarietiesGrid({
  fruit,
  reduceMotion,
}: {
  fruit: FruitData;
  reduceMotion: boolean;
}) {
  return (
    <section
      className="px-6 sm:px-10 lg:px-20 py-24"
      style={{ background: BRAND_DARK }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs tracking-[0.25em] uppercase mb-3"
          style={{ color: fruit.accent }}
        >
          The Varieties
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-12"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          Every {fruit.name.slice(0, -1)}, catalogued.
        </motion.h2>

        <motion.div
          variants={reduceMotion ? undefined : gridContainer}
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={{ once: true, amount: 0.15 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {fruit.varieties.map((v) => (
            <VarietyCard
              key={v.code}
              variety={v}
              accent={fruit.accent}
              reduceMotion={reduceMotion}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/** Slim top-of-viewport reading-progress bar. Previously this only
 *  covered `lg:` screens as a fallback for the chapter rail; now that
 *  the story chapters (and their rail) are gone, it's the one progress
 *  indicator for the whole page, on every breakpoint. */
function ReadingProgressBar({ accent }: { accent: string }) {
  const scrollRef = useProgressScrollRef();
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <div
      className="fixed top-0 left-0 right-0 z-30 h-1 bg-white/10"
      aria-hidden="true"
    >
      <motion.div className="h-full" style={{ width, background: accent }} />
    </div>
  );
}

// Small helper so ReadingProgressBar can share the same scroll container
// ref as the page without prop-drilling a MotionValue down.
const ScrollRefContext =
  createContext<React.RefObject<HTMLDivElement | null> | null>(null);
function useProgressScrollRef() {
  const ref = useContext(ScrollRefContext);
  if (!ref) throw new Error("ReadingProgressBar must be used within FruitPage");
  return ref;
}

/* ------------------------------------------------------------------ */
/*  FruitPage — the actual /:fruitName route                          */
/* ------------------------------------------------------------------ */

/**
 * Route: /:fruitName  →  e.g. /apple, /mandarin, /kiwi
 *   { path: "/:fruitName", element: <FruitPage /> }
 * Lazy-load it at the router level (React.lazy + Suspense) so the
 * animation code only ships to visitors who land on a fruit page.
 */
export default function FruitPage() {
  const { fruitName } = useParams<{ fruitName: string }>();
  const fruit = getFruitBySlug(fruitName);

  const reduceMotion = useReducedMotion() ?? false;
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!fruit) {
    // Unknown slug — send them somewhere real instead of a blank page.
    return <Navigate to="/fruits" replace />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={fruit.slug}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        ref={scrollRef}
        className="h-dvh w-full overflow-y-auto overflow-x-hidden bg-black"
        style={{ scrollBehavior: reduceMotion ? "auto" : "smooth" }}
      >
        <ScrollRefContext.Provider value={scrollRef}>
          <BackButton />
          <ReadingProgressBar accent={fruit.accent} />

          <FruitHero fruit={fruit} reduceMotion={reduceMotion} />

          <VarietiesGrid fruit={fruit} reduceMotion={reduceMotion} />
        </ScrollRefContext.Provider>
      </motion.div>
    </AnimatePresence>
  );
}
