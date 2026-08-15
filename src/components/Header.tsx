"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useLocale } from "@/lib/locale-context";
import { useSectionLinkClick } from "@/lib/use-section-link";
import type { Locale } from "@/lib/content";

export default function Header() {
  const { t, locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const handleSectionLink = useSectionLinkClick();

  const { scrollY } = useScroll();
  const background = useTransform(
    scrollY,
    [0, 60],
    ["rgba(246,244,239,0)", "rgba(246,244,239,0.9)"]
  );
  const boxShadow = useTransform(
    scrollY,
    [0, 60],
    ["0px 2px 6px rgba(0,0,0,0)", "0px 2px 6px rgba(0,0,0,0.06)"]
  );

  const navItems = [
    { href: "/#home", label: t.nav.home },
    { href: "/#projects", label: t.nav.projects },
    { href: "/#experience", label: t.nav.experience },
    { href: "/#faq", label: t.nav.faq },
    { href: "/#contact", label: t.nav.contact },
  ];

  return (
    <motion.header
      style={{ background, boxShadow }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto flex max-w-6xl items-center gap-8 px-6 py-[14px] md:px-10">
        <Link
          href="/"
          data-cursor="link"
          onClick={handleSectionLink("/")}
          className="shrink-0 font-display text-[26px] tracking-[-0.58px] text-lg-subtitle"
        >
          Maitan
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              data-cursor="link"
              href={item.href}
              onClick={handleSectionLink(item.href)}
              className="font-sans text-base tracking-[-0.08px] text-[#919191] transition-colors hover:text-blue-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden shrink-0 md:flex">
          <LangToggle locale={locale} onSelect={setLocale} />
        </div>

        <div className="ml-auto flex items-center gap-4 md:hidden">
          <LangToggle locale={locale} onSelect={setLocale} />
          <button
            data-cursor="link"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5"
          >
            <span
              className="block h-px w-5 bg-lg-subtitle2 transition-transform"
              style={{ transform: open ? "translateY(3.5px) rotate(45deg)" : "none" }}
            />
            <span
              className="block h-px w-5 bg-lg-subtitle2 transition-transform"
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
            className="overflow-hidden md:hidden"
          >
            <ul className="flex flex-col gap-1 border-t border-lg-divider bg-lg-background px-6 py-6 font-sans text-base text-[#919191]">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      handleSectionLink(item.href)(e);
                      setOpen(false);
                    }}
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

function LangToggle({
  locale,
  onSelect,
}: {
  locale: Locale;
  onSelect: (locale: Locale) => void;
}) {
  return (
    <div className="flex items-center gap-1 rounded-[40px] bg-[rgba(136,146,156,0.06)] p-1">
      <button
        data-cursor="link"
        type="button"
        aria-label="English"
        aria-pressed={locale === "en"}
        onClick={() => onSelect("en")}
        className={`flex items-center justify-center rounded-full px-3 py-1.5 transition-colors ${
          locale === "en" ? "bg-white" : ""
        }`}
      >
        <Image
          src="/images/header/flag-us.png"
          alt=""
          width={24}
          height={16}
          draggable={false}
          className="rounded-[1px]"
        />
      </button>
      <button
        data-cursor="link"
        type="button"
        aria-label="Português"
        aria-pressed={locale === "pt"}
        onClick={() => onSelect("pt")}
        className={`flex items-center justify-center rounded-full px-3 py-1.5 transition-colors ${
          locale === "pt" ? "bg-white" : ""
        }`}
      >
        <Image
          src="/images/header/flag-br.png"
          alt=""
          width={24}
          height={16}
          draggable={false}
          className="rounded-[1px]"
        />
      </button>
    </div>
  );
}
