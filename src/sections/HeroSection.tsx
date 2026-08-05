import { useRef, useState, type PointerEvent } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useMotionValue,
  useSpring,
  type MotionValue,
} from "framer-motion";

import kiwiWhole from "../assets/images/Big-Kiwi.png";
import kiwiPeeled from "../assets/images/kiwi-peeled.webp";
import kiwiSliced from "../assets/images/kiwi-sliced.webp";

interface Stage {
  eyebrow: string;
  title: string;
  image: string;
}

const STAGES: Stage[] = [
  { eyebrow: "The reveal", title: "Where Nature Meets Perfection", image: kiwiWhole },
  {
    eyebrow: "Peel & protect",
    title: "Protected in every layer.",
    image: kiwiPeeled,
  },
  { eyebrow: "Every slice", title: "Perfected by nature.", image: kiwiSliced },
];

const STAGE_COUNT = STAGES.length;

const stageOpacityRange = (i: number): [number[], number[]] => {
  const step = 1 / STAGE_COUNT;
  const start = i * step;
  const end = (i + 1) * step;
  const eps = step * 0.02;

  if (i === 0) {
    return [
      [0, end - eps, end],
      [1, 1, 0],
    ];
  }
  if (i === STAGE_COUNT - 1) {
    return [
      [start, start + eps, end],
      [0, 1, 1],
    ];
  }
  return [
    [start, start + eps, end - eps, end],
    [0, 1, 1, 0],
  ];
};

// --- Floating accents ---------------------------------------------------
type Depth = "near" | "mid" | "far";

interface Droplet {
  id: string;
  top: string;
  left: string;
  size: number;
  delay: number;
  duration: number;
  depth: Depth;
}

interface Leaf {
  id: string;
  top: string;
  left: string;
  size: number;
  rotate: number;
  delay: number;
  duration: number;
  depth: Depth;
}

const DROPLETS: Droplet[] = [
  {
    id: "d1",
    top: "16%",
    left: "54%",
    size: 22,
    delay: 0,
    duration: 5.5,
    depth: "near",
  },
  {
    id: "d2",
    top: "28%",
    left: "74%",
    size: 13,
    delay: 0.6,
    duration: 4.5,
    depth: "mid",
  },
  {
    id: "d3",
    top: "58%",
    left: "80%",
    size: 17,
    delay: 1.2,
    duration: 6,
    depth: "far",
  },
  {
    id: "d4",
    top: "70%",
    left: "38%",
    size: 12,
    delay: 0.3,
    duration: 5,
    depth: "mid",
  },
  {
    id: "d5",
    top: "42%",
    left: "30%",
    size: 16,
    delay: 1.6,
    duration: 5.8,
    depth: "near",
  },
  {
    id: "d6",
    top: "80%",
    left: "62%",
    size: 10,
    delay: 0.9,
    duration: 4.2,
    depth: "far",
  },
];

const LEAVES: Leaf[] = [
  {
    id: "l1",
    top: "20%",
    left: "60%",
    size: 92,
    rotate: -18,
    delay: 0,
    duration: 7,
    depth: "near",
  },
  {
    id: "l2",
    top: "56%",
    left: "70%",
    size: 62,
    rotate: 22,
    delay: 0.8,
    duration: 8,
    depth: "mid",
  },
];

const Droplet = ({
  d,
  x,
  y,
}: {
  d: Droplet;
  x: MotionValue<number>;
  y: MotionValue<number>;
}) => (
  <motion.span
    className="pointer-events-none absolute rounded-full"
    style={{
      top: d.top,
      left: d.left,
      width: d.size,
      height: d.size * 1.15,
      x,
      y,
      background:
        "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.92), rgba(198,226,74,0.28) 45%, rgba(198,226,74,0.05) 75%)",
      boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
    }}
    animate={{ y: [0, -8, 0], opacity: [0.55, 0.95, 0.55] }}
    transition={{
      duration: d.duration,
      delay: d.delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const LeafShape = ({
  l,
  x,
  y,
}: {
  l: Leaf;
  x: MotionValue<number>;
  y: MotionValue<number>;
}) => (
  <motion.svg
    viewBox="0 0 64 64"
    className="pointer-events-none absolute drop-shadow-[0_6px_14px_rgba(0,0,0,0.35)]"
    style={{ top: l.top, left: l.left, width: l.size, height: l.size, x, y }}
    initial={{ rotate: l.rotate }}
    animate={{
      rotate: [l.rotate - 4, l.rotate + 4, l.rotate - 4],
      y: [0, -6, 0],
    }}
    transition={{
      duration: l.duration,
      delay: l.delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <path
      d="M32 4C46 12 58 24 58 38c0 12-11 22-26 22S6 50 6 38C6 22 18 12 32 4Z"
      fill="#2f5233"
      opacity={0.88}
    />
    <path d="M32 8v50" stroke="#C6E24A" strokeWidth="1.4" opacity={0.6} />
  </motion.svg>
);
// -------------------------------------------------------------------------

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(STAGE_COUNT - 1, Math.floor(v * STAGE_COUNT));
    setActiveStage((prev) => (prev === idx ? prev : idx));
  });

  // The fruit grows and slowly descends across the *entire* scroll span —
  // this is what's shared across all stages.
  const kiwiScale = useTransform(scrollYProgress, [0, 1], [0.8, 1.6]);
  const kiwiY = useTransform(scrollYProgress, [0, 1], ["-10vh", "8vh"]);
  const kiwiRotate = useTransform(scrollYProgress, [0, 1], [-8, 4]);

  const [range0] = stageOpacityRange(0);
  const heroY = useTransform(scrollYProgress, range0, [0, 0, -40]);

  // Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 16, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 16, mass: 0.4 });

  const kiwiParallaxX = useTransform(springX, [-0.5, 0.5], [-16, 16]);
  const kiwiParallaxY = useTransform(springY, [-0.5, 0.5], [-10, 10]);

  const nearX = useTransform(springX, [-0.5, 0.5], [-34, 34]);
  const nearY = useTransform(springY, [-0.5, 0.5], [-24, 24]);
  const midX = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const midY = useTransform(springY, [-0.5, 0.5], [-14, 14]);
  const farX = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const farY = useTransform(springY, [-0.5, 0.5], [-7, 7]);

  const depthMotion: Record<
    Depth,
    { x: MotionValue<number>; y: MotionValue<number> }
  > = {
    near: { x: nearX, y: nearY },
    mid: { x: midX, y: midY },
    far: { x: farX, y: farY },
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const bounds = stickyRef.current?.getBoundingClientRect();
    if (!bounds) return;
    mouseX.set((e.clientX - bounds.left) / bounds.width - 0.5);
    mouseY.set((e.clientY - bounds.top) / bounds.height - 0.5);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  // ---------------------------------------------------------------------

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full bg-[#07090a]"
      style={{ height: `${STAGE_COUNT * 100}vh` }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,600;1,9..144,500&display=swap');
        .kiwi-display { font-family: 'Fraunces', 'Georgia', serif; font-optical-sizing: auto; letter-spacing: -0.01em; }
        .kiwi-label { font-family: ui-sans-serif, system-ui, sans-serif; letter-spacing: 0.28em; }
      `}</style>

      <div
        ref={stickyRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 55% at 68% 46%, rgba(178,214,64,0.18), transparent 65%), radial-gradient(120% 120% at 50% 100%, rgba(0,0,0,0.6), transparent 60%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            boxShadow: "inset 0 0 18vw 4vw rgba(0,0,0,0.85)",
          }}
        />
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {[16, 28, 40, 52, 64].map((r) => (
            <circle
              key={r}
              cx="68"
              cy="46"
              r={r}
              fill="none"
              stroke="#C6E24A"
              strokeWidth="0.12"
            />
          ))}
        </svg>

        <motion.div
          style={{
            scale: kiwiScale,
            y: kiwiY,
            rotate: kiwiRotate,
            x: kiwiParallaxX,
          }}
          className="absolute inset-y-0 left-[10vw] right-[-8vw] flex items-center justify-center will-change-transform sm:left-[20vw] sm:right-[-2vw]"
        >
          <motion.div
            style={{ y: kiwiParallaxY }}
            className="relative flex h-full w-full items-center justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={STAGES[activeStage].image}
                src={STAGES[activeStage].image}
                alt=""
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                style={{
                  filter:
                    "drop-shadow(0 25px 60px rgba(0,0,0,0.55)) drop-shadow(0 0 40px rgba(150,200,50,0.15))",
                }}
                className="absolute w-[76vw] max-w-136 object-contain md:w-[48vw]"
              />
            </AnimatePresence>

            {DROPLETS.map((d) => (
              <Droplet
                key={d.id}
                d={d}
                x={depthMotion[d.depth].x}
                y={depthMotion[d.depth].y}
              />
            ))}
            {LEAVES.map((l) => (
              <LeafShape
                key={l.id}
                l={l}
                x={depthMotion[l.depth].x}
                y={depthMotion[l.depth].y}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Opening hero chrome — eyebrow, kicker line, scroll cue.
            Lives only on stage 0, fades out as the story begins. */}
        <motion.div
          style={{ y: heroY }}
          className="pointer-events-none absolute inset-x-0 top-0 z-10 px-6 pt-10 sm:px-14 sm:pt-14"
        >
          <p className="kiwi-label text-[10px] font-medium text-white/45 sm:text-[11px]">
            OMM AGRI VILA LLP PRESENTS
          </p>
        </motion.div>

        {/* Signature tag, top-right — mirrors the reference's small
            corner label ("SIGNATURE FRUIT / INDIA · GLOBAL") */}
        <motion.div
          // style={{ opacity: heroOpacity }}
          className="pointer-events-none absolute right-6 top-10 z-10 text-right sm:right-14 sm:top-14"
        >
          <p className="kiwi-label text-[9px] text-white/40">SIGNATURE FRUIT</p>
          <p className="kiwi-label text-[9px] text-white/40">INDIA · GLOBAL</p>
        </motion.div>

        {STAGES.map((stage, i) => (
          <motion.h2
            key={stage.title}
            animate={{
              opacity: activeStage === i ? 1 : 0,
              y: activeStage === i ? 0 : -30,
            }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            className={`kiwi-display pointer-events-none absolute z-10 max-w-2xl text-[2.6rem] leading-[0.95] font-medium tracking-tight text-[#F5F2E6] sm:text-7xl md:text-8xl lg:text-9xl ${
              i % 2 === 0
                ? "left-6 top-24 sm:left-14 sm:top-28"
                : "bottom-28 left-6 sm:bottom-32 sm:left-14"
            }`}
          >
            {stage.title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="block text-[#C6E24A]">
              {stage.title.split(" ").slice(-1)}
            </span>
          </motion.h2>
        ))}

        {/* Progress card, bottom-left */}
        <div className="absolute bottom-6 left-6 z-20 w-65 rounded-xl border border-white/10 bg-[#0c1310]/75 px-5 py-4 backdrop-blur-md sm:left-10 sm:bottom-10">
          <p className="kiwi-label text-[9px] text-white/40">KIWI STORY</p>
          <div className="mt-1.5 flex items-baseline justify-between">
            <span className="kiwi-display text-base text-[#F5F2E6]">
              {activeStage === STAGE_COUNT - 1
                ? "OMM AGRI VILLA LLP"
                : STAGES[activeStage].eyebrow}
            </span>
            <span className="kiwi-display text-sm text-[#C6E24A]">
              {String(activeStage + 1).padStart(2, "0")}
              <span className="text-white/35"> / {STAGE_COUNT}</span>
            </span>
          </div>
          <div className="mt-3 flex gap-1.5">
            {STAGES.map((_, i) => (
              <div
                key={i}
                className="h-0.75 flex-1 overflow-hidden rounded-full bg-white/10"
              >
                <motion.div
                  className="h-full bg-[#C6E24A]"
                  initial={false}
                  animate={{ width: i <= activeStage ? "100%" : "0%" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint, only on the very first stage */}
        <ScrollHint scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
};

const ScrollHint = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) => {
  const opacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
  return (
    <motion.div
      style={{ opacity }}
      className="kiwi-label pointer-events-none absolute bottom-8 right-8 z-20 flex items-center gap-3 text-[10px] text-white/45 sm:bottom-10"
    >
      SCROLL
      <span className="flex h-8 w-5 items-start justify-center rounded-full border border-white/25 pt-1.5">
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-[#C6E24A]"
          animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </span>
    </motion.div>
  );
};

export default HeroSection;
