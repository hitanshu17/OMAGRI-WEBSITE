import { useRef, useState, useEffect, createContext } from "react";
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

/* ------------------------------------------------------------------ */
/*  Palette — warm, light theme (matches the "Apples" reference).      */
/*  Everything else stays keyed off fruit.accent so each fruit still   */
/*  gets its own character without a full re-theme per page.           */
/* ------------------------------------------------------------------ */

const PAGE_BG = "#FBF3EE";
const INK = "#152238"; // brand navy, used for all headline/body text
const INK_SOFT = "rgba(21,34,56,0.62)";
const INK_FAINT = "rgba(21,34,56,0.38)";

// BackButton
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
      {" "}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        {" "}
        <path
          d="M15 5l-7 7 7 7"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />{" "}
      </svg>{" "}
      Back{" "}
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/*  TiltLayer — unchanged behaviour, still wraps the hero photo.       */
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

  const MAX_DEG = 6;

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
/*  JuiceBurst — a handful of small dots that fly outward and fade,    */
/*  fired on tap/click of the hero photo.                              */
/*                                                                      */
/*  Randomness lives OUTSIDE render: `burst` is fully-computed particle */
/*  data built inside the click handler (an event, not a render pass), */
/*  then passed in as a plain prop. JuiceBurst itself only ever reads   */
/*  that data — it never calls Math.random() itself, so the component  */
/*  stays pure/idempotent no matter how many times React re-renders it. */
/* ------------------------------------------------------------------ */

type JuiceParticle = { angle: number; dist: number; size: number };
type JuiceBurstData = { id: number; particles: JuiceParticle[] };

const JUICE_PARTICLE_COUNT = 7;

// Called from the click handler (an event callback), never from render.
function createJuiceBurst(): JuiceBurstData {
  const particles: JuiceParticle[] = Array.from(
    { length: JUICE_PARTICLE_COUNT },
    (_, i) => ({
      angle: (i / JUICE_PARTICLE_COUNT) * Math.PI * 2,
      dist: 55 + Math.random() * 35,
      size: 5 + Math.random() * 6,
    }),
  );
  return { id: Date.now(), particles };
}

function JuiceBurst({
  accent,
  burst,
}: {
  accent: string;
  burst: JuiceBurstData | null;
}) {
  if (!burst) return null;
  return (
    <AnimatePresence>
      <motion.div
        key={burst.id}
        className="pointer-events-none absolute inset-0 z-20"
        aria-hidden="true"
      >
        {burst.particles.map((p, i) => (
          <motion.span
            key={i}
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{ width: p.size, height: p.size, background: accent }}
            initial={{ x: "-50%", y: "-50%", opacity: 0.95, scale: 1 }}
            animate={{
              x: `calc(-50% + ${Math.cos(p.angle) * p.dist}px)`,
              y: `calc(-50% + ${Math.sin(p.angle) * p.dist + 18}px)`, // slight gravity drift
              opacity: 0,
              scale: 0.4,
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  FruitHero — light theme: breadcrumb, chapter label, bold sans      */
/*  headline, oversized accent tagline, glow-ringed photo, pill CTA.   */
/*  The photo itself now idles, follows the cursor with a warm glow,   */
/*  and reacts to a tap with a squeeze + juice burst.                  */
/* ------------------------------------------------------------------ */

function FruitHero({
  fruit,
  reduceMotion,
  varietiesRef,
}: {
  fruit: FruitData;
  reduceMotion: boolean;
  varietiesRef: React.RefObject<HTMLElement | null>;
}) {
  const ref = useRef<HTMLElement>(null);
  const [, setImgError] = useState(false);
  const [burst, setBurst] = useState<JuiceBurstData | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [1, 0.72],
  );
  const imgY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, -50],
  );
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, -40],
  );

  // cursor-tracked warm glow behind the photo
  const glowRawX = useMotionValue(0);
  const glowRawY = useMotionValue(0);
  const glowX = useSpring(glowRawX, { stiffness: 100, damping: 20 });
  const glowY = useSpring(glowRawY, { stiffness: 100, damping: 20 });

  const handleStageMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    glowRawX.set((e.clientX - rect.left - rect.width / 2) * 0.15);
    glowRawY.set((e.clientY - rect.top - rect.height / 2) * 0.15);
  };

  const scrollToVarieties = () => {
    varietiesRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <section ref={ref} style={{ height: "170vh" }} className="relative">
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{
          background: `radial-gradient(120% 90% at 82% 12%, color-mix(in srgb, ${fruit.accent} 10%, ${PAGE_BG}), ${PAGE_BG} 62%)`,
          backgroundColor: PAGE_BG,
        }}
      >
        {/* faint graph-paper texture, echoes the reference screenshot */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `linear-gradient(${INK_FAINT} 1px, transparent 1px), linear-gradient(90deg, ${INK_FAINT} 1px, transparent 1px)`,
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(80% 60% at 50% 30%, black 0%, transparent 75%)",
            opacity: 0.05,
          }}
          aria-hidden="true"
        />

        <BackButton />

        <div className="relative z-10 flex h-full w-full items-center px-6 pb-16 pt-6 sm:px-10 lg:px-16">
          <div className="grid w-full items-center gap-10 lg:grid-cols-2">
            {/* ---------------- left: copy ---------------- */}
            <motion.div
              style={{ opacity: contentOpacity, y: contentY }}
              className="max-w-xl"
            >
              <div className="mb-4 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-px w-8"
                  style={{ background: fruit.accent }}
                />
                <p
                  className="font-mono text-xs font-semibold tracking-[0.25em] uppercase"
                  style={{ color: fruit.accent }}
                >
                  {fruit.eyebrow ?? "The Collection"}
                </p>
              </div>

              <h1
                className="font-extrabold leading-[0.9]"
                style={{
                  color: INK,
                  fontFamily:
                    "'Inter', ui-sans-serif, system-ui, sans-serif",
                  fontSize: "clamp(3.2rem, 9vw, 6.5rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                {fruit.name}
              </h1>

              <p
                className="mt-6 max-w-md text-base leading-relaxed sm:text-lg"
                style={{ color: INK_SOFT }}
              >
                {fruit.intro}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-5">
                <button
                  className="flex items-center gap-3 rounded-full py-2 pl-6 pr-2 text-sm font-semibold transition-transform hover:scale-[1.03] active:scale-95 focus-visible:outline-2"
                  style={{ background: fruit.accent, color: INK }}
                >
                  Enquire about {fruit.name}
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white"
                    aria-hidden="true"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M7 17L17 7M17 7H8M17 7V16"
                        stroke={INK}
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>

                <button
                  onClick={scrollToVarieties}
                  className="flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70 focus-visible:outline-2"
                  style={{ color: INK_SOFT }}
                >
                  See the varieties
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 5v14M12 19l-6-6M12 19l6-6"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </motion.div>

            {/* ---------------- right: photo + tagline ---------------- */}
            <div
              className="relative hidden h-[70vh] items-center justify-center sm:flex"
              onPointerMove={handleStageMove}
            >
              {/* cursor-tracked warm glow, sits behind everything */}
              {!reduceMotion && (
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute rounded-full blur-3xl"
                  style={{
                    width: "60%",
                    aspectRatio: "1 / 1",
                    background: `radial-gradient(circle, color-mix(in srgb, ${fruit.accent} 40%, transparent), transparent 70%)`,
                    x: glowX,
                    y: glowY,
                  }}
                />
              )}

              {/* breathing ring — subtle pulse instead of static */}
              <motion.div
                aria-hidden="true"
                className="absolute rounded-full"
                style={{
                  width: "78%",
                  aspectRatio: "1 / 1",
                  border: `1px solid color-mix(in srgb, ${fruit.accent} 35%, transparent)`,
                }}
                animate={
                  reduceMotion
                    ? undefined
                    : { scale: [1, 1.03, 1], opacity: [0.6, 1, 0.6] }
                }
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {fruit.tagline && (
                <p
                  className="absolute left-0 top-[8%] max-w-xs text-2xl font-bold leading-snug sm:text-3xl"
                  style={{
                    color: fruit.accent,
                    fontFamily: "'Fraunces', serif",
                  }}
                >
                  {fruit.tagline}
                </p>
              )}

              {/* outer: one-shot "bloom" entrance — from nothing to full,   */}
              {/* fires on mount (this whole component remounts per fruit    */}
              {/* via the AnimatePresence key={fruit.slug} up in FruitPage)  */}
              <motion.div
                className="relative"
                style={{ width: "58%", aspectRatio: "1 / 1" }}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.25 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.9,
                  delay: 0.15,
                  ease: [0.34, 1.56, 0.64, 1], // slight overshoot — a soft "pop" as it blooms
                }}
              >
                {/* inner: unchanged — scroll-linked scale/y, idle float loop, */}
                {/* tap-to-squeeze, juice burst. Idle loop is delayed until    */}
                {/* the bloom above has finished so it doesn't fight it.       */}
                <motion.div
                  className="relative h-full w-full"
                  style={{ scale, y: imgY }}
                  animate={
                    reduceMotion
                      ? undefined
                      : { y: [0, -10, 0], rotate: [0, 1.2, 0, -1.2, 0] }
                  }
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: reduceMotion ? 0 : 1.1,
                  }}
                  whileTap={reduceMotion ? undefined : { scale: 0.94 }}
                  onClick={() => setBurst(createJuiceBurst())}
                >
                  <TiltLayer reduceMotion={reduceMotion}>
                    <div
                      className="h-full w-full cursor-pointer overflow-hidden rounded-full shadow-2xl"
                      style={{
                        boxShadow: `0 30px 60px -20px color-mix(in srgb, ${fruit.deep ?? fruit.accent} 45%, transparent)`,
                      }}
                    >
                      <img
                        src={fruit.heroImage}
                        alt={fruit.name}
                        fetchPriority="high"
                        loading="eager"
                        decoding="async"
                        className="h-full w-full object-cover"
                        onError={() => setImgError(true)}
                      />
                    </div>
                  </TiltLayer>
                  <JuiceBurst accent={fruit.accent} burst={burst} />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SectionRail — light equivalent of the numbered chapter rail in     */
/*  the reference. This page only has two sections (Overview /         */
/*  Varieties), so it's a compact 2-stop version rather than the       */
/*  9-item rail, which belonged to a multi-chapter layout this data    */
/*  model doesn't have.                                                */
/* ------------------------------------------------------------------ */

function SectionRail({
  accent,
  activeIndex,
  onJump,
}: {
  accent: string;
  activeIndex: 0 | 1;
  onJump: (index: 0 | 1) => void;
}) {
  const items = [
    { label: "Overview", n: "01" },
    { label: "Varieties", n: "02" },
  ];
  return (
    <div
      className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex"
      aria-label="Section navigation"
    >
      {items.map((item, i) => (
        <button
          key={item.n}
          onClick={() => onJump(i as 0 | 1)}
          className="group flex h-8 w-8 items-center justify-center rounded-full font-mono text-[11px] font-semibold transition-all focus-visible:outline-2"
          style={{
            background: activeIndex === i ? accent : "transparent",
            color: activeIndex === i ? INK : INK_FAINT,
            border: activeIndex === i ? "none" : `1px solid ${INK_FAINT}`,
          }}
          aria-current={activeIndex === i ? "true" : undefined}
          title={item.label}
        >
          {item.n}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  VarietiesGrid — light cards on the cream background.               */
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
      className="overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_-12px_rgba(21,34,56,0.15)]"
    >
      <div className="aspect-4/3 w-full overflow-hidden bg-black/5">
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
        <div className="mb-3 flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: accent }}
            aria-hidden="true"
          />
          <span
            className="font-mono text-[10px] tracking-widest"
            style={{ color: INK_FAINT }}
          >
            {variety.code}
          </span>
        </div>
        <h3
          className="mb-2 text-lg font-semibold"
          style={{ color: INK, fontFamily: "'Fraunces', serif" }}
        >
          {variety.name}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: INK_SOFT }}>
          {variety.blurb}
        </p>
      </div>
    </motion.article>
  );
}

function VarietiesGrid({
  fruit,
  reduceMotion,
  sectionRef,
}: {
  fruit: FruitData;
  reduceMotion: boolean;
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  return (
    <section
      ref={sectionRef}
      className="px-6 py-24 sm:px-10 lg:px-16"
      style={{ background: PAGE_BG }}
    >
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-3 font-mono text-xs uppercase tracking-[0.25em]"
          style={{ color: fruit.accent }}
        >
          The Varieties
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-3xl font-bold sm:text-4xl"
          style={{ color: INK, fontFamily: "'Fraunces', serif" }}
        >
          Every {fruit.name.slice(0, -1)}, catalogued.
        </motion.h2>

        <motion.div
          variants={reduceMotion ? undefined : gridContainer}
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
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

const ScrollRefContext =
  createContext<React.RefObject<HTMLDivElement | null> | null>(null);

/* ------------------------------------------------------------------ */
/*  FruitPage — the /:fruitName route                                  */
/* ------------------------------------------------------------------ */

export default function FruitPage() {
  const { fruitName } = useParams<{ fruitName: string }>();
  const fruit = getFruitBySlug(fruitName);

  const reduceMotion = useReducedMotion() ?? false;
  const scrollRef = useRef<HTMLDivElement>(null);
  const varietiesRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState<0 | 1>(0);

  useEffect(() => {
    const container = scrollRef.current;
    const target = varietiesRef.current;
    if (!container || !target) return;

    const onScroll = () => {
      const containerTop = container.getBoundingClientRect().top;
      const targetTop = target.getBoundingClientRect().top;
      setActiveSection(targetTop - containerTop < window.innerHeight / 2 ? 1 : 0);
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, [fruit?.slug]);

  if (!fruit) {
    return <Navigate to="/" replace />;
  }

  const jumpTo = (index: 0 | 1) => {
    if (index === 0) {
      scrollRef.current?.scrollTo({
        top: 0,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    } else {
      varietiesRef.current?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={fruit.slug}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        ref={scrollRef}
        className="h-dvh w-full overflow-y-auto overflow-x-hidden"
        style={{ scrollBehavior: reduceMotion ? "auto" : "smooth", background: PAGE_BG }}
      >
        <ScrollRefContext.Provider value={scrollRef}>
          <SectionRail
            accent={fruit.accent}
            activeIndex={activeSection}
            onJump={jumpTo}
          />

          <FruitHero
            fruit={fruit}
            reduceMotion={reduceMotion}
            varietiesRef={varietiesRef}
          />

          <VarietiesGrid
            fruit={fruit}
            reduceMotion={reduceMotion}
            sectionRef={varietiesRef}
          />
        </ScrollRefContext.Provider>
      </motion.div>
    </AnimatePresence>
  );
}