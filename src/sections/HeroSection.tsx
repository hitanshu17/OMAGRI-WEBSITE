import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";

import kiwiWhole from "../assets/images/Big-Kiwi.png";
import kiwiPeeled from "../assets/images/kiwi-peeled.webp";
import kiwiSliced from "../assets/images/kiwi-sliced.webp";
// import ommLogo from "../assets/images/OAVLOGO.png";

interface Stage {
  eyebrow: string;
  title: string;
  image: string;
}

const STAGES: Stage[] = [
  { eyebrow: "The reveal", title: "Selected at the source.", image: kiwiWhole },
  {
    eyebrow: "Peel & protect",
    title: "Protected in every layer.",
    image: kiwiPeeled,
  },
  { eyebrow: "Every slice", title: "Perfected by nature.", image: kiwiSliced },
  // { eyebrow: "OMM Agri Vila LLP", title: "", image: kiwiSliced },
];

// This component is built for exactly 4 stages. If you ever need a
// different count, the hook calls in HeroSection() below must be
// unrolled to match (see comment there) — hooks can't be called in a
// loop/map/callback, so this can't be made dynamic without a rewrite.
const STAGE_COUNT = STAGES.length;

// Builds a piecewise opacity curve for stage `i` so it fades in, holds,
// then fades out as scroll progress crosses its own 1/STAGE_COUNT slice.
// Pure data — not a hook — so it's safe to call from anywhere, any number
// of times, in any order.
const stageOpacityRange = (i: number): [number[], number[]] => {
  const step = 1 / STAGE_COUNT;
  const start = i * step;
  const end = (i + 1) * step;
  const fade = step * 0.35;

  if (i === 0) {
    return [
      [0, end - fade, end],
      [1, 1, 0],
    ];
  }
  if (i === STAGE_COUNT - 1) {
    return [
      [start, start + fade, end],
      [0, 1, 1],
    ];
  }
  return [
    [start, start + fade, end - fade, end],
    [0, 1, 1, 0],
  ];
};

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
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
  // this is what's shared across all four stages.
  const kiwiScale = useTransform(scrollYProgress, [0, 1], [0.55, 1.35]);
  const kiwiY = useTransform(scrollYProgress, [0, 1], ["-14vh", "10vh"]);
  const kiwiRotate = useTransform(scrollYProgress, [0, 1], [-8, 4]);

  // --- Per-stage transforms, unrolled --------------------------------
  // React hooks must be called the same number of times, in the same
  // order, on every render — they can't live inside .map()/callbacks.
  // Since STAGE_COUNT is a fixed constant (4), we call useTransform
  // explicitly per stage index instead of looping, then gather the
  // results into arrays below for easy use in JSX.
  const [range0, out0] = stageOpacityRange(0);
  const [range1, out1] = stageOpacityRange(1);
  const [range2, out2] = stageOpacityRange(2);
  const [range3, out3] = stageOpacityRange(3);

  const imageOpacity0 = useTransform(scrollYProgress, range0, out0);
  const imageOpacity1 = useTransform(scrollYProgress, range1, out1);
  const imageOpacity2 = useTransform(scrollYProgress, range2, out2);
  const imageOpacity3 = useTransform(scrollYProgress, range3, out3);
  const imageOpacities = [
    imageOpacity0,
    imageOpacity1,
    imageOpacity2,
    imageOpacity3,
  ];

  // const finalOpacity = imageOpacity3; // same range/shape as stage 3's image
  // const finalScale = useTransform(scrollYProgress, range3, [0.92, 1, 1]);

  // Ghost numeral opacities — dimmed copies of the image opacities.
  // Unrolled for the same rules-of-hooks reason as above.
  const numeralOpacity0 = useTransform(imageOpacity0, (o) => o * 0.14);
  const numeralOpacity1 = useTransform(imageOpacity1, (o) => o * 0.14);
  const numeralOpacity2 = useTransform(imageOpacity2, (o) => o * 0.14);
  const numeralOpacity3 = useTransform(imageOpacity3, (o) => o * 0.14);
  const numeralOpacities = [
    numeralOpacity0,
    numeralOpacity1,
    numeralOpacity2,
    numeralOpacity3,
  ];

  // Hero-only chrome (eyebrow / kicker copy / scroll cue) — visible only
  // while we're still on stage 0, fades out exactly as it ends.
  const heroOpacity = imageOpacity0;
  const heroY = useTransform(scrollYProgress, range0, [0, 0, 0, -40]);
  // ---------------------------------------------------------------------

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full bg-[#07090a]"
      style={{ height: `${STAGE_COUNT * 100}vh` }}
    >
      {/* Distinctive type pairing: a characterful serif for display copy,
          a wide-tracked utility sans for labels/eyebrows. Swap the
          @import for a self-hosted font if you'd rather not load from
          Google Fonts at runtime. */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,600;1,9..144,500&display=swap');
        .kiwi-display { font-family: 'Fraunces', 'Georgia', serif; font-optical-sizing: auto; letter-spacing: -0.01em; }
        .kiwi-label { font-family: ui-sans-serif, system-ui, sans-serif; letter-spacing: 0.28em; }
      `}</style>

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Backdrop — kiwi-green glow + soft vignette + faint orbit rings */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 55% at 62% 42%, rgba(178,214,64,0.16), transparent 65%), radial-gradient(120% 120% at 50% 100%, rgba(0,0,0,0.6), transparent 60%)",
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
              cx="62"
              cy="42"
              r={r}
              fill="none"
              stroke="#C6E24A"
              strokeWidth="0.12"
            />
          ))}
        </svg>

        {/* The fruit — one shared transform, three crossfading images */}
        <motion.div
          style={{ scale: kiwiScale, y: kiwiY, rotate: kiwiRotate }}
          className="absolute inset-0 flex items-center justify-center will-change-transform"
        >
          {STAGES.map((stage, i) => (
            <motion.img
              key={`${stage.image}-${i}`}
              src={stage.image}
              alt=""
              style={{
                opacity: imageOpacities[i],
                filter:
                  "drop-shadow(0 25px 60px rgba(0,0,0,0.55)) drop-shadow(0 0 40px rgba(150,200,50,0.12))",
              }}
              className="absolute w-[58vw] max-w-125 object-contain md:w-[36vw]"
            />
          ))}
        </motion.div>

        {/* Opening hero chrome — eyebrow, kicker line, scroll cue.
            Lives only on stage 0, fades out as the story begins. */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="pointer-events-none absolute inset-x-0 top-0 z-10 px-6 pt-10 sm:px-14 sm:pt-14"
        >
          <p className="kiwi-label text-[10px] font-medium text-white/45 sm:text-[11px]">
            OMM AGRI VILA LLP PRESENTS
          </p>
        </motion.div>

        {/* Headlines — crossfade per stage (first 3 stages only) */}
        {STAGES.slice(0, STAGE_COUNT - 1).map((stage, i) => (
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
            className={`kiwi-display pointer-events-none absolute z-10 max-w-xl text-[2.4rem] leading-[1.05] font-medium tracking-tight text-[#F5F2E6] sm:text-6xl md:text-7xl ${
              i % 2 === 0
                ? "left-6 top-24 sm:left-14 sm:top-28"
                : "bottom-24 right-6 text-right sm:bottom-28 sm:right-14"
            }`}
          >
            {stage.title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-[#C6E24A]">
              {stage.title.split(" ").slice(-1)}
            </span>
          </motion.h2>
        ))}

        {/* Ghost numeral, bottom-right — mirrors the reference site's
            large ambient stage counter */}
        {STAGES.map((_, i) => (
          <motion.span
            key={`numeral-${i}`}
            style={{ opacity: numeralOpacities[i] }}
            className="kiwi-display pointer-events-none absolute bottom-4 right-4 z-0 select-none text-[26vw] font-light leading-none text-white sm:text-[18vw]"
          >
            {String(i + 1).padStart(2, "0")}
          </motion.span>
        ))}

        {/* Final stage — OMM AGRI VILA LLP brand reveal */}
        {/* <motion.div
          style={{ opacity: finalOpacity, scale: finalScale }}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 px-6"
        >
          <div className="h-px w-16 bg-[#C6E24A]/50" />
          <div className="rounded-2xl border border-white/10 bg-[#0c1310]/90 px-10 py-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-sm sm:px-16 sm:py-10">
            <img
              src={ommLogo}
              alt="OMM Agri Vila LLP"
              className="mx-auto h-20 w-48 sm:h-48"
            />
          </div>
          <p className="kiwi-label text-center text-[10px] text-white/45 sm:text-xs">
            SOURCING GLOBAL FRESHNESS, DELIVERING PREMIUM QUALITY
          </p>
        </motion.div> */}

        {/* Progress card, bottom-left */}
        <div className="absolute bottom-6 left-6 z-20 w-65 rounded-xl border border-white/10 bg-[#0c1310]/75 px-5 py-4 backdrop-blur-md sm:left-10 sm:bottom-10">
          <p className="kiwi-label text-[9px] text-white/40">KIWI STORY</p>
          <div className="mt-1.5 flex items-baseline justify-between">
            <span className="kiwi-display text-base text-[#F5F2E6]">
              {activeStage === STAGE_COUNT - 1
                ? "OMM Agri Vila LLP"
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
