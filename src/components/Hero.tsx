"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { useLocale } from "@/lib/locale-context";
import { useSectionLinkClick } from "@/lib/use-section-link";
import Reveal from "./Reveal";
import ToolsMarquee from "./ToolsMarquee";
import { PRELOADER_TOTAL_MS } from "./Preloader";

const floatingTools = [
  { icon: "/images/hero/icons/chatgpt.svg", label: "ChatGPT", top: "12.6%", left: "50.8%", floatDuration: 3.2, floatDelay: 0 },
  { icon: "/images/hero/icons/codex.svg", label: "Codex", top: "20.2%", left: "8%", floatDuration: 3.8, floatDelay: 0.3 },
  { icon: "/images/hero/icons/github.svg", label: "GitHub", top: "24.6%", left: "79%", floatDuration: 3.4, floatDelay: 0.6 },
  { icon: "/images/hero/icons/claude.svg", label: "Claude", top: "30%", left: "36%", floatDuration: 4, floatDelay: 0.15 },
  { icon: "/images/hero/icons/figma.svg", label: "Figma", top: "53%", left: "47%", floatDuration: 3.6, floatDelay: 0.45 },
  { icon: "/images/hero/icons/figma-make.svg", label: "Figma Make", top: "72.3%", left: "10.8%", floatDuration: 3.3, floatDelay: 0.75 },
  { icon: "/images/hero/icons/gemini.svg", label: "Gemini", top: "72.1%", left: "79.5%", floatDuration: 3.9, floatDelay: 0.9 },
  { icon: "/images/hero/icons/confluence.svg", label: "Confluence", top: "90.7%", left: "47%", floatDuration: 3.5, floatDelay: 0.2 },
];

export default function Hero() {
  const { t } = useLocale();
  const handleSectionLink = useSectionLinkClick();
  const [firstName, ...rest] = t.hero.name.split(" ");
  const lastName = rest.join(" ");
  const [handRevealed, setHandRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHandRevealed(true), PRELOADER_TOTAL_MS - 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" data-scroll-snap className="flex min-h-screen flex-col border-b border-hairline">
      <div className="grid flex-1 [container-type:inline-size] md:grid-cols-2">
        <div className="flex items-center px-6 pt-28 pb-16 md:pt-32 md:pr-10 md:pl-[max(2.5rem,calc((100cqw-72rem)/2+2.5rem))]">
          <div className="flex w-full max-w-[480px] flex-col gap-6">
            <Reveal>
              <p className="max-w-[260px] text-base font-medium leading-relaxed text-lg-title/75">
                {t.hero.kicker}
              </p>
            </Reveal>

            <div>
              <Reveal delay={0.05}>
                <div className="mb-[-0.15em] flex items-center gap-4">
                  <span className="relative block size-[54px] shrink-0 overflow-hidden rounded-full">
                    <Image
                      src="/images/hero/avatar.png"
                      alt=""
                      fill
                      sizes="54px"
                      draggable={false}
                      className="object-cover"
                    />
                  </span>
                  <span className="font-display text-[32px] leading-[0.9] tracking-tight text-lg-title md:text-[48px]">
                    {firstName}
                  </span>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="font-display text-[61px] font-normal leading-[0.9] tracking-tight text-lg-subtitle md:text-[80px]">
                  {lastName}
                </h1>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <p className="max-w-[420px] text-base leading-relaxed text-lg-subtitle">{t.hero.subtitle}</p>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  data-cursor="link"
                  href="/#projects"
                  onClick={(e) => {
                    handleSectionLink("/#projects")(e);
                    trackEvent("view_projects_click", { location: "hero" });
                  }}
                  className="flex h-10 items-center rounded-sm bg-blue-200 px-4 text-sm font-medium text-lg-background transition-opacity hover:opacity-85"
                >
                  {t.hero.ctaPrimary}
                </Link>
                <a
                  data-cursor="link"
                  href={t.hero.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("cv_click", { location: "hero" })}
                  className="flex h-10 items-center rounded-sm border border-hairline bg-white px-4 text-sm text-lg-subtitle2 transition-colors hover:bg-[#F6F8FA]"
                >
                  {t.hero.ctaSecondary}
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1} className="relative min-h-[380px] overflow-hidden md:min-h-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(120% 100% at 50% 45%, var(--lg-background2) 0%, var(--lg-divider) 100%)",
            }}
          />
          <motion.div
            className="absolute inset-0"
            animate={{ y: handRevealed ? 0 : 88 }}
            transition={{ duration: 5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/images/hero/hands.png"
              alt="Hands raised toward light, symbolizing the collaboration between design craft and AI tools"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              draggable={false}
              className="object-cover opacity-80"
              priority
            />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 hidden md:block">
            {floatingTools.map((tool) => (
              <span
                key={tool.label}
                style={{
                  top: tool.top,
                  left: tool.left,
                  animationDuration: `${tool.floatDuration}s`,
                  animationDelay: `${tool.floatDelay}s`,
                }}
                className="hero-tool-float absolute flex items-center gap-2 rounded-full bg-white/70 px-3.5 py-2 backdrop-blur-sm"
              >
                <Image
                  src={tool.icon}
                  alt=""
                  width={18}
                  height={18}
                  draggable={false}
                  className="size-[18px] object-contain"
                />
                <span className="whitespace-nowrap text-sm text-lg-subtitle">{tool.label}</span>
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      <ToolsMarquee items={t.hero.tags} />
    </section>
  );
}
