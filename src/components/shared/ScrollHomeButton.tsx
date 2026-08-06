import { useState, useEffect, type RefObject } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

interface ScrollHomeButtonProps {
  /** The scrollable container to track. Omit to track window scroll. */
  containerRef?: RefObject<HTMLElement | null>;
  /** Scroll distance (px) past which the button appears. Defaults to one viewport height, roughly "past the hero". */
  threshold?: number;
}

/**
 * Floating "back to top" button — brand-navy circle, white chevron.
 * Appears once the user scrolls past the hero, disappears back at the top.
 * Works with either a custom scroll container (FruitPage's sticky-pin
 * layout) or plain window scroll (any page that doesn't use one).
 */
export default function ScrollHomeButton({
  containerRef,
  threshold,
}: ScrollHomeButtonProps) {
  const [visible, setVisible] = useState(false);

  // Lazy initializer — computed once, synchronously, on first render.
  // No effect needed just to fill in a default; the effect below only
  // exists for the part that's a genuine external subscription (resize).
  const [effectiveThreshold, setEffectiveThreshold] = useState(
    () => threshold ?? (typeof window !== "undefined" ? window.innerHeight : 0),
  );

  useEffect(() => {
    if (threshold != null) return; // explicit threshold always wins
    const handleResize = () => setEffectiveThreshold(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [threshold]);

  const { scrollY } = useScroll(
    containerRef
      ? { container: containerRef as RefObject<HTMLElement> }
      : undefined,
  );

  useMotionValueEvent(scrollY, "change", (latest) => {
    const past = latest > effectiveThreshold;
    setVisible((prev) => (prev === past ? prev : past));
  });

  const handleClick = () => {
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? "auto"
      : "smooth";
    if (containerRef?.current) {
      containerRef.current.scrollTo({ top: 0, behavior });
    } else {
      window.scrollTo({ top: 0, behavior });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={handleClick}
          aria-label="Back to top"
          className="fixed z-40 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-transform active:scale-90 focus-visible:outline-2 focus-visible:outline-white/70"
          style={{
            bottom: "max(1.5rem, env(safe-area-inset-bottom))",
            right: "max(1.5rem, env(safe-area-inset-right))",
            background: "#193768",
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
              d="M6 15l6-6 6 6"
              stroke="currentColor"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
