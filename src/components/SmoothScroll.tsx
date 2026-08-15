"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import Lenis from "lenis";

const SNAP_THRESHOLD = 60;
const SETTLE_DELAY = 220;

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    // Lenis is a browser-only external system that can't be constructed during
    // render/SSR, so it's created here and synced into state for consumers.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenis(lenis);

    let frameId: number;
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });
    resizeObserver.observe(document.body);

    // Gently align the nearest full-screen section to the top once scrolling
    // settles within a small threshold, so the manual scroll doesn't have to
    // be pixel-perfect to land the section flush with the viewport.
    let settleTimeout: ReturnType<typeof setTimeout> | undefined;
    let snapping = false;

    function trySnap() {
      if (snapping) return;
      const sections = document.querySelectorAll<HTMLElement>("[data-scroll-snap]");
      let nearest: HTMLElement | null = null;
      let nearestDistance = Infinity;
      for (const section of sections) {
        const distance = section.getBoundingClientRect().top;
        if (Math.abs(distance) < Math.abs(nearestDistance)) {
          nearestDistance = distance;
          nearest = section;
        }
      }
      if (!nearest || Math.abs(nearestDistance) < 0.5 || Math.abs(nearestDistance) > SNAP_THRESHOLD) return;

      snapping = true;
      lenis.scrollTo(nearest, {
        duration: 0.5,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        onComplete: () => {
          snapping = false;
        },
      });
    }

    function handleScroll() {
      if (snapping) return;
      if (settleTimeout) clearTimeout(settleTimeout);
      settleTimeout = setTimeout(trySnap, SETTLE_DELAY);
    }

    lenis.on("scroll", handleScroll);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      if (settleTimeout) clearTimeout(settleTimeout);
      lenis.off("scroll", handleScroll);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
