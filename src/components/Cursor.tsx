"use client";

import { useEffect, useRef, useState } from "react";

type CursorState = "default" | "link" | "media";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>("default");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
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
      const el = (e.target as HTMLElement).closest("[data-cursor]");
      const kind = el?.getAttribute("data-cursor");
      setState(kind === "media" ? "media" : kind === "link" ? "link" : "default");
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
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink transition-[width,height,background-color] duration-150 ease-out"
        style={{ width: state === "default" ? 6 : 0, height: state === "default" ? 6 : 0 }}
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,border-color] duration-200 ease-out"
        style={{
          width: state === "media" ? 84 : state === "link" ? 46 : 28,
          height: state === "media" ? 84 : state === "link" ? 46 : 28,
          borderColor: state === "default" ? "var(--ink)" : "var(--steel)",
          borderWidth: 1,
          backgroundColor: state === "media" ? "rgba(60,84,104,0.08)" : "transparent",
        }}
      />
    </div>
  );
}
