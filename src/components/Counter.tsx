"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export default function Counter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const numeric = parseInt(value, 10);
  const isNumeric = !Number.isNaN(numeric);

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 24, stiffness: 90 });

  useEffect(() => {
    if (inView && isNumeric) motionValue.set(numeric);
  }, [inView, isNumeric, motionValue, numeric]);

  useEffect(() => {
    if (!isNumeric) return;
    return springValue.on("change", (latest) => {
      if (ref.current) ref.current.textContent = String(Math.round(latest));
    });
  }, [springValue, isNumeric]);

  return (
    <span className="tabular">
      <span ref={ref}>{isNumeric ? 0 : value}</span>
      {suffix}
    </span>
  );
}
