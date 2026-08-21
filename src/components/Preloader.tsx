"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { useLenis } from "./SmoothScroll";

export const DISPLAY_MS = 1800;
const OVERLAY_EXIT_S = 0.9;
export const PRELOADER_TOTAL_MS = DISPLAY_MS + OVERLAY_EXIT_S * 1000;
const EASE_IN_OUT = [0.7, 0, 0.25, 1] as const;
const WORD = "Maitan";
const DRIFT_START = "25vh";
const DRIFT_END = "-4vh";

const wordContainer: Variants = {
  hidden: { y: DRIFT_START },
  visible: {
    y: DRIFT_END,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.09,
      y: { duration: (DISPLAY_MS / 1000) * 1.6, ease: "linear" },
    },
  },
};

const letterVariant: Variants = {
  hidden: { y: 220, opacity: 0, filter: "blur(8px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 260, damping: 24, mass: 0.9 },
  },
};

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduceMotion(reduced);
    if (reduced) {
      setLoading(false);
      return;
    }

    document.body.style.overflow = "hidden";
    document.documentElement.classList.add("preloader-active");
    lenis?.stop();

    const timer = setTimeout(() => setLoading(false), DISPLAY_MS);
    return () => clearTimeout(timer);
  }, [lenis]);

  useEffect(() => {
    if (loading) return;
    document.body.style.overflow = "";
    document.documentElement.classList.remove("preloader-active");
    lenis?.start();
  }, [loading, lenis]);

  if (reduceMotion) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-dk-background"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: OVERLAY_EXIT_S, ease: EASE_IN_OUT }}
        >
          <motion.span
            className="font-display text-[36px] leading-[0.9] tracking-tight text-dk-title md:text-[56px]"
            variants={wordContainer}
            initial="hidden"
            animate="visible"
          >
            {WORD.split("").map((char, i) => (
              <motion.span key={i} variants={letterVariant} className="inline-block">
                {char}
              </motion.span>
            ))}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
