import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import oavLogo from "../assets/images/OAV-Logo.jpg";

interface LoadingScreenProps {
  /** Controls visibility from outside — e.g. false once your app/data is ready. */
  isLoading: boolean;
  /** Optional label under the mark, e.g. "Loading orchards…" */
  label?: string;
}

/**
 * Full-screen brand loader. Mount once near the root of the app and
 * drive `isLoading` from wherever your actual load state lives (route
 * transition, initial data fetch, asset preload, etc.). Fades out and
 * unmounts itself once `isLoading` goes false.
 */
export default function LoadingPage({
  isLoading,
  label = "Loading",
}: LoadingScreenProps) {
  const reduceMotion = useReducedMotion();

  // Keeps the exit fade from feeling abrupt on very fast loads — a loader
  // that flashes for 40ms and vanishes reads as a glitch, not a fix.
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMinTimeElapsed(true), 500);
    return () => clearTimeout(t);
  }, []);

  const show = isLoading || !minTimeElapsed;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.15 : 0.45, ease: "easeInOut" }}
          className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-white"
          role="status"
          aria-live="polite"
          aria-label={label}
        >
          <motion.img
            src={oavLogo}
            alt="Omm Agri Villa"
            className="w-40 sm:w-48"
            animate={
              reduceMotion
                ? undefined
                : { scale: [1, 1.04, 1], opacity: [0.92, 1, 0.92] }
            }
            transition={
              reduceMotion
                ? undefined
                : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
            }
          />

          <div className="mt-8 h-1 w-40 overflow-hidden rounded-full bg-[#193768]/10">
            <motion.div
              className="h-full w-1/3 rounded-full"
              style={{ background: "#193768" }}
              animate={
                reduceMotion
                  ? { x: "100%" }
                  : { x: ["-100%", "220%"] }
              }
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 1.1, repeat: Infinity, ease: "easeInOut" }
              }
            />
          </div>

          <span className="sr-only">{label}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}