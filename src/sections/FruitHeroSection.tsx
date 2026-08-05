import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
  type PanInfo,
} from "framer-motion";

import slid1 from "../assets/images/aslide1.jpg";
import slid2 from "../assets/images/aslide2.jpg";
import slid3 from "../assets/images/aslide3.jpg";

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle?: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    image: slid1,
    title: "OMM AGRI VILLA LLP",
    subtitle: "Delivering Nature's Luxury",
  },
  { id: 2, image: slid2, title: "Feel The Freshness" },
  { id: 3, image: slid3, title: "From Farm to Fork" },
  { id: 4, image: slid1, title: "For a Healthier You!" },
];

const AUTOPLAY_MS = 6000; // how long each slide stays up before advancing
const IMAGE_DRIFT_S = 7; // ken-burns duration — a beat longer than autoplay so it never visibly "settles"
const TRANSITION_S = 1.1; // crossfade length between slides
const SWIPE_THRESHOLD = 60; // px of drag before it counts as a swipe

// ---------------------------------------------------------------------------
// Animation variants (direction-aware: 1 = forward, -1 = backward)
// ---------------------------------------------------------------------------

const imageVariants: Variants = {
  enter: (dir: number) => ({
    opacity: 0,
    scale: 1.22,
    x: `${dir * 6}%`,
    filter: "blur(10px)",
  }),
  center: (dir: number) => ({
    opacity: 1,
    scale: [1.22, 1.12, 1.05],
    x: [`${dir * 6}%`, `${dir * -1.5}%`, "0%"],
    filter: ["blur(10px)", "blur(0px)"],
    transition: {
      opacity: { duration: 0.9, ease: "easeOut" },
      filter: { duration: 0.9, ease: "easeOut" },
      scale: { duration: IMAGE_DRIFT_S, ease: [0.16, 1, 0.3, 1] },
      x: { duration: IMAGE_DRIFT_S, ease: [0.16, 1, 0.3, 1] },
    },
  }),
  exit: (dir: number) => ({
    opacity: 0,
    scale: 1.08,
    x: `${dir * -6}%`,
    filter: "blur(6px)",
    transition: { duration: TRANSITION_S, ease: [0.7, 0, 0.84, 0] },
  }),
};

const scrimVariants: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 1, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

const wordsContainer: Variants = {
  enter: {},
  center: { transition: { staggerChildren: 0.06, delayChildren: 0.35 } },
  exit: { transition: { staggerChildren: 0.025, staggerDirection: -1 } },
};

// custom = signed distance (in word-widths) from the center word
const wordVariants: Variants = {
  enter: (distance: number) => ({
    opacity: 0,
    y: 18,
    x: distance * -30,
    rotateX: -40,
    scale: 0.75,
    filter: "blur(6px)",
  }),
  center: (distance: number) => ({
    opacity: 1,
    y: 0,
    x: 0,
    rotateX: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      delay: Math.abs(distance) * 0.06,
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
  exit: (distance: number) => ({
    opacity: 0,
    y: -14,
    x: distance * 20,
    filter: "blur(4px)",
    transition: { duration: 0.35, ease: "easeIn" },
  }),
};

const lineVariants: Variants = {
  enter: { opacity: 0, scaleX: 0 },
  center: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, scaleX: 0, transition: { duration: 0.25 } },
};

// ---------------------------------------------------------------------------
// Reveal-from-center text
// ---------------------------------------------------------------------------

function CenterOutText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");
  const center = (words.length - 1) / 2;

  return (
    <motion.span
      variants={wordsContainer}
      style={{ perspective: 600 }}
      className={`inline-flex flex-wrap justify-center gap-x-[0.35em] ${
        className ?? ""
      }`}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          custom={i - center}
          variants={wordVariants}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export default function FreshFruitHero() {
  const [[index, direction], setSlide] = useState<[number, number]>([0, 1]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const count = SLIDES.length;
  const wrap = (i: number) => ((i % count) + count) % count;
  const slide = SLIDES[wrap(index)];

  const goTo = useCallback(
    (newIndex: number, dir: number) => setSlide([newIndex, dir]),
    [],
  );
  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  // Autoplay — always running, truly infinite since index is unbounded
  // and only wrapped at render time.
  useEffect(() => {
    timerRef.current = setTimeout(next, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, next]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const handleDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.x < -SWIPE_THRESHOLD) next();
    else if (info.offset.x > SWIPE_THRESHOLD) prev();
  };

  const motionProps = useMemo(
    () =>
      prefersReducedMotion
        ? { initial: false, animate: "center" as const }
        : {
            initial: "enter" as const,
            animate: "center" as const,
            exit: "exit" as const,
          },
    [prefersReducedMotion],
  );

  return (
    <div className="relative w-full h-[90vh] min-h-105 overflow-hidden bg-black/40 select-none">
      {/* Background layers */}
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={slide.id + "-" + index}
          className="absolute inset-0"
          custom={direction}
          variants={imageVariants}
          {...motionProps}
          drag={prefersReducedMotion ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
          style={{ willChange: "transform, filter, opacity" }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <motion.div
            variants={scrimVariants}
            className="absolute inset-0 bg-linear-to-t from-black/70 via-black/25 to-black/40"
          />
        </motion.div>
      </AnimatePresence>

      {/* Foreground copy */}
      <div className="relative z-10 flex h-full items-center justify-center px-6 pointer-events-none">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slide.id + "-" + index}
            custom={direction}
            {...motionProps}
            variants={wordsContainer}
            className="flex flex-col items-center text-center"
          >
            <CenterOutText
              text={slide.title}
              className="font-serif italic text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)]"
            />

            {slide.subtitle && (
              <>
                <motion.span
                  variants={lineVariants}
                  className="mt-5 h-px w-40 origin-center bg-white/70"
                />
                <motion.span
                  variants={wordsContainer}
                  className="mt-4 flex flex-wrap justify-center gap-x-[0.6em] text-white/90 text-sm sm:text-base tracking-[0.35em] font-medium"
                >
                  {slide.subtitle.split(" ").map((w, i, arr) => (
                    <motion.span
                      key={`${w}-${i}`}
                      custom={i - (arr.length - 1) / 2}
                      variants={wordVariants}
                      className="inline-block"
                    >
                      {w}
                    </motion.span>
                  ))}
                </motion.span>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
