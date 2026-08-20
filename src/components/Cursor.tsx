"use client";

import { useEffect, useRef, useState } from "react";

type CursorState = "default" | "link" | "media";
type CursorTheme = "light" | "dark";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>("default");
  const [theme, setTheme] = useState<CursorTheme>("light");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Deferred to an effect (not a lazy initial state) to avoid a hydration
    // mismatch: this must stay false on the server/first paint and only flip
    // once matchMedia is available on the client.
    const fine = window.matchMedia("(pointer: fine)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(fine);
    if (!fine) return;

    const ring = { x: 0, y: 0 };
    let target = { x: 0, y: 0 };
    let frame: number;

    function onMove(e: MouseEvent) {
      target = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${target.x}px, ${target.y}px)`;
      }
    }

    function loop() {
      ring.x += (target.x - ring.x) * 0.18;
      ring.y += (target.y - ring.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px)`;
      }
      frame = requestAnimationFrame(loop);
    }

    function onOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const el = target.closest("[data-cursor]");
      const kind = el?.getAttribute("data-cursor");
      setState(kind === "media" ? "media" : kind === "link" ? "link" : "default");

      const themed = target.closest("[data-cursor-theme]");
      setTheme(themed?.getAttribute("data-cursor-theme") === "dark" ? "dark" : "light");
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    frame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div id="custom-cursor-root" aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-[width,height,background-color] duration-150 ease-out"
        style={{
          width: state === "default" ? 6 : 0,
          height: state === "default" ? 6 : 0,
          backgroundColor: theme === "dark" ? "var(--lg-background)" : "var(--graphite)",
        }}
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,border-color] duration-200 ease-out"
        style={{
          width: state === "media" ? 84 : state === "link" ? 46 : 28,
          height: state === "media" ? 84 : state === "link" ? 46 : 28,
          borderColor:
            state === "default" ? (theme === "dark" ? "var(--lg-background)" : "var(--graphite)") : "var(--blue-200)",
          borderWidth: 1,
          backgroundColor: state === "media" ? "rgba(60,84,104,0.08)" : "transparent",
        }}
      />
    </div>
  );
}
