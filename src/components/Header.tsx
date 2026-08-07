"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useLocale } from "@/lib/locale-context";

export default function Header() {
  const { t, locale, toggleLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const background = useTransform(
    scrollY,
    [0, 80],
    ["rgba(246,244,239,0)", "rgba(246,244,239,0.92)"]
  );
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  const navItems = [
    { href: "/#projects", label: t.nav.projects },
    { href: "/#experience", label: t.nav.experience },
    { href: "/#contact", label: t.nav.contact },
  ];

  return (
    <motion.header
      style={{ background }}
      className="fixed inset-x-0 top-0 z-50 backdrop-blur-md"
    >
      <motion.div
        style={{ opacity: borderOpacity }}
        className="absolute inset-x-0 bottom-0 h-px bg-hairline"
      />
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" data-cursor="link" className="font-display italic text-lg tracking-tight">
          Vinicius Maitan
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8 font-mono text-xs uppercase tracking-[0.08em] text-ink-soft">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link data-cursor="link" href={item.href} className="transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <LangToggle locale={locale} onToggle={toggleLocale} />
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          <LangToggle locale={locale} onToggle={toggleLocale} />
          <button
            data-cursor="link"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5"
          >
            <span
              className="block h-px w-5 bg-graphite transition-transform"
              style={{ transform: open ? "translateY(3.5px) rotate(45deg)" : "none" }}
            />
            <span
              className="block h-px w-5 bg-graphite transition-transform"
              style={{ transform: open ? "translateY(-3.5px) rotate(-45deg)" : "none" }}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-hairline bg-bone md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-6 font-mono text-sm uppercase tracking-[0.08em] text-ink-soft">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function LangToggle({ locale, onToggle }: { locale: "en" | "pt"; onToggle: () => void }) {
  return (
    <button
      data-cursor="link"
      onClick={onToggle}
      aria-label="Toggle language"
      className="flex items-center gap-1.5 rounded-full border border-hairline px-3 py-1.5 font-mono text-xs tracking-[0.05em]"
    >
      <span className={locale === "en" ? "text-ink" : "text-ink-soft"}>EN</span>
      <span className="text-ink-soft">—</span>
      <span className={locale === "pt" ? "text-ink" : "text-ink-soft"}>PT</span>
    </button>
  );
}
