"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function PrototypeDrawer({
  open,
  onClose,
  embedUrl,
}: {
  open: boolean;
  onClose: () => void;
  embedUrl: string;
}) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.5, ease: [0.45, 0, 0.55, 1] }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-white"
          onClick={onClose}
        >
          <div className="relative flex max-h-[90vh] max-w-[95vw] items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <iframe
              style={{ border: 0 }}
              width="360"
              height="740"
              src={embedUrl}
              allowFullScreen
              className="max-h-[90vh] max-w-[95vw] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
            />
          </div>

          <button
            type="button"
            data-cursor="link"
            aria-label="Close prototype"
            onClick={onClose}
            className="fixed top-6 right-6 z-[91] flex size-10 items-center justify-center rounded-full bg-black/5 text-[#1c1b17] transition-colors hover:bg-black/10"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M2.5 2.5L13.5 13.5M13.5 2.5L2.5 13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
