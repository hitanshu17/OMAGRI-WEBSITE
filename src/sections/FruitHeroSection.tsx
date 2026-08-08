import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useMotionValue,
  useTransform,
  animate as animateValue,
  type Variants,
  type PanInfo,
  type AnimationPlaybackControls,
} from "framer-motion";

import slid1 from "../assets/images/aslide1.jpg";
import slid2 from "../assets/images/aslide2.jpg";
import slid3 from "../assets/images/aslide3.jpg";
import heroVideo from "../assets/videos/home.mp4";
import { scrollToSection } from "../utils/scrollToSection";
import { useNavigate } from "react-router-dom";

interface Slide {
  id: number;
  type?: "image" | "video";
  image?: string;   // used when type is "image" (or omitted)
  video?: string;   // used when type is "video"
  poster?: string;  // optional fallback frame shown before video loads
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

const PRODUCE_SECTION_ID = "our-products";

const SLIDES: Slide[] = [
  {
    id: 1,
    type: "video",
    video: heroVideo,
    poster: slid1, // shows instantly while the video loads
    title: "OMM AGRI VILLA LLP",
    subtitle: "Delivering Nature's Luxury",
  },
  {
    id: 2,
    image: slid2,
    eyebrow: "Hand-Picked Daily",
    title: "Feel The Freshness",
  },
  {
    id: 3,
    image: slid3,
    eyebrow: "Zero Chemicals. Zero Compromise.",
    title: "From Farm To Fork",
  },
  {
    id: 4,
    image: slid1,
    eyebrow: "Trusted Since Generations",
    title: "Rooted In Excellence",
  },
];

const AUTOPLAY_MS = 5000; // how long each slide stays up before advancing
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

const eyebrowVariants: Variants = {
  enter: { opacity: 0, y: -10 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.1, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -6, transition: { duration: 0.25 } },
};

const ctaVariants: Variants = {
  enter: { opacity: 0, y: 16 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.95, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.3 } },
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
// Small chrome pieces
// ---------------------------------------------------------------------------

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
      className="pointer-events-auto flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/30 bg-white/5 text-white backdrop-blur-sm transition-all duration-300 hover:border-white/70 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-white"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d={direction === "prev" ? "M10 2L4 8L10 14" : "M6 2L12 8L6 14"}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export default function FreshFruitHero() {
  const [[index, direction], setSlide] = useState<[number, number]>([0, 1]);
  const [isPaused,] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const count = SLIDES.length;
  const wrap = (i: number) => ((i % count) + count) % count;
  const current = wrap(index);
  const slide = SLIDES[current];

  const goTo = useCallback(
    (newIndex: number, dir: number) => setSlide([newIndex, dir]),
    [],
  );

  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  
  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index]);
  
  const handleDotClick = (i: number) => {
    if (i === current) return;
    const dir = i > current ? 1 : -1;
    goTo(index + (i - current), dir);
  };

  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const handleClick = () => {
    if (isHome) {
      scrollToSection(PRODUCE_SECTION_ID);
    } else {
      navigate("/", { state: { scrollTo: PRODUCE_SECTION_ID } });
    }
  };


  // Progress motion value — drives both the visible bar and the autoplay
  // advance (onComplete), so timing and UI can never drift apart.
  const progress = useMotionValue(0);
  const playbackRef = useRef<AnimationPlaybackControls | null>(null);
  const progressWidth = useTransform(progress, (v) => `${v}%`);

  useEffect(() => {
    progress.set(0);
    const controls = animateValue(progress, 100, {
      duration: AUTOPLAY_MS / 1000,
      ease: "linear",
      onComplete: next,
    });
    playbackRef.current = controls;
    if (isPaused) controls.pause();
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    if (isPaused) playbackRef.current?.pause();
    else playbackRef.current?.play();
  }, [isPaused]);

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
    <div
      id="home"
      className="relative w-full h-[90vh] min-h-105 overflow-hidden bg-black/40 select-none"
    >
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
          {slide.type === "video" ? (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={slide.video}
              poster={slide.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          )}
          <motion.div
            variants={scrimVariants}
            className="absolute inset-0 bg-linear-to-t from-black/70 via-black/25 to-black/40"
          />
        </motion.div>
      </AnimatePresence>

      {/* Vignette — depth, same black, no new color */}
      <div className="pointer-events-none absolute inset-0 z-6 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.45)_100%)]" />

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
            {slide.eyebrow && (
              <motion.span
                variants={eyebrowVariants}
                className="mb-4 text-white/70 text-[11px] sm:text-xs font-medium uppercase tracking-[0.35em]"
              >
                {slide.eyebrow}
              </motion.span>
            )}

            <CenterOutText
              text={slide.title}
              className="font-serif italic text-white text-4xl sm:text-5xl md:text-6xl lg:text-8xl leading-tight drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)]"
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

            <motion.button
              onClick={handleClick}
              variants={ctaVariants}
              className="pointer-events-auto group relative mt-9 overflow-hidden rounded-full border border-white/70 px-8 py-3 text-[11px] sm:text-xs font-medium uppercase tracking-[0.25em] text-white cursor-pointer"
            >
              <span className="relative z-10 transition-colors duration-500 ease-out group-hover:text-black">
                Discover Our Produce
              </span>
              <span className="absolute inset-0 origin-left scale-x-0 bg-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom control bar */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-center justify-between gap-4 px-6 pb-6 sm:px-10 sm:pb-8">
        {/* Slide counter — real sequence info */}
        <div className="pointer-events-none hidden items-baseline gap-1.5 font-mono text-white/70 sm:flex">
          <span className="text-sm text-white">
            {String(current + 1).padStart(2, "0")}
          </span>
          <span className="text-xs">/ {String(count).padStart(2, "0")}</span>
        </div>

        {/* Progress segments — signature element, also click-to-jump nav */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-2.5">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => handleDotClick(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="relative h-1 w-7 overflow-hidden rounded-full bg-white/25 transition-colors duration-300 hover:bg-white/40 sm:w-10"
            >
              {i === current && (
                <motion.span
                  className="absolute inset-y-0 left-0 bg-white"
                  style={{ width: progressWidth }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Arrow nav */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ArrowButton direction="prev" onClick={prev} />
          <ArrowButton direction="next" onClick={next} />
        </div>
      </div>
    </div>
  );
}