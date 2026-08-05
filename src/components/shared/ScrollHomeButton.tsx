import { useState, useEffect, type RefObject, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

interface FabStackProps {
  children: ReactNode;
}

export const FabStack = ({ children }: FabStackProps) => {
  return (
    <div
      className="fixed z-40 flex flex-col-reverse items-end gap-3"
      style={{
        bottom: "max(1.5rem, env(safe-area-inset-bottom))",
        right: "max(1.5rem, env(safe-area-inset-right))",
      }}
    >
      {children}
    </div>
  );
}

interface ImageFabProps {
  /** Path to your uploaded image — swap this in once you have it. */
  src: string;
  alt: string;
  onClick?: () => void;
  /** Pass href for a link (e.g. WhatsApp/contact); omit for a click handler. */
  href?: string;
}

export const ImageFab = ({ src, alt, onClick, href }: ImageFabProps) => {
  const visual = (
    <motion.span
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full shadow-lg ring-2 ring-white/10"
      style={{ background: "#193768" }}
    >
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </motion.span>
  );

  const sharedProps = {
    "aria-label": alt,
    title: "Hayat kiwi",
    className: "block rounded-full focus-visible:outline-2 focus-visible:outline-white/70",
  };

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" {...sharedProps}>
      {visual}
    </a>
  ) : (
    <button onClick={onClick} {...sharedProps}>
      {visual}
    </button>
  );
}

interface ScrollHomeButtonProps {
  containerRef?: RefObject<HTMLElement | null>;
  threshold?: number;
}

export default function ScrollHomeButton({
  containerRef,
  threshold,
}: ScrollHomeButtonProps) {
  const [visible, setVisible] = useState(false);

  const [effectiveThreshold, setEffectiveThreshold] = useState(
    () => threshold ?? (typeof window !== "undefined" ? window.innerHeight : 0),
  );

  useEffect(() => {
    if (threshold != null) return;
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
          className="flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-transform active:scale-90 focus-visible:outline-2 focus-visible:outline-white/70"
          style={{ background: "#193768" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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