"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { useLocale } from "@/lib/locale-context";
import { useSectionLinkClick } from "@/lib/use-section-link";
import Reveal from "./Reveal";
import ToolsMarquee from "./ToolsMarquee";

// Grows whichever of the two name lines falls short (via letter-spacing) so
// their right edges line up like a justified logotype, at any viewport width.
// The two lines use different clamp() font sizes and the first line is offset
// by the avatar, so nothing guarantees matching right edges on its own — and
// the gap between the words' natural widths changes shape at every
// breakpoint, since the two clamp()s scale at different rates.
//
// Measures off-screen clones, never the live elements: react-dom only writes
// a style property to the DOM when its value differs from the previous
// render, so a direct `el.style.letterSpacing = ""` reset on the real node
// (to read its baseline width) desyncs the DOM from React's own bookkeeping
// — the next render computes the same value as before, react-dom sees no
// change, skips the write, and the manual reset is stranded permanently.
// Only ever grows, and clamps growth to the wrapper's right edge, so a line
// is never stretched into wrapping or past the column.
function useJustifiedNameWidths(firstName: string, lastName: string) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLSpanElement>(null);
  const lastRef = useRef<HTMLHeadingElement>(null);
  const [letterSpacing, setLetterSpacing] = useState<{ first?: string; last?: string }>({});

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const firstEl = firstRef.current;
    const lastEl = lastRef.current;
    if (!wrapper || !firstEl || !lastEl) return;

    function baselineWidth(el: HTMLElement) {
      const clone = el.cloneNode(true) as HTMLElement;
      clone.style.letterSpacing = "";
      clone.style.position = "absolute";
      clone.style.visibility = "hidden";
      clone.style.left = "-9999px";
      clone.style.top = "0";
      document.body.appendChild(clone);
      const base = parseFloat(getComputedStyle(clone).letterSpacing) || 0;
      const range = document.createRange();
      range.selectNodeContents(clone);
      const width = range.getBoundingClientRect().width;
      document.body.removeChild(clone);
      return { base, width };
    }

    function measure() {
      if (!wrapper || !firstEl || !lastEl) return;

      const first = baselineWidth(firstEl);
      const last = baselineWidth(lastEl);
      const firstLeft = firstEl.getBoundingClientRect().left;
      const lastLeft = lastEl.getBoundingClientRect().left;
      const firstChars = firstEl.textContent?.length || 1;
      const lastChars = lastEl.textContent?.length || 1;
      const maxRight = wrapper.getBoundingClientRect().right;
      const diff = lastLeft + last.width - (firstLeft + first.width);

      if (Math.abs(diff) < 0.5) {
        setLetterSpacing({});
        return;
      }

      if (diff > 0) {
        const grow = Math.min(diff, Math.max(maxRight - (firstLeft + first.width), 0));
        setLetterSpacing(grow < 0.5 ? {} : { first: `${first.base + grow / firstChars}px` });
      } else {
        const grow = Math.min(-diff, Math.max(maxRight - (lastLeft + last.width), 0));
        setLetterSpacing(grow < 0.5 ? {} : { last: `${last.base + grow / lastChars}px` });
      }
    }

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(wrapper);

    let cancelled = false;
    if (document.fonts) {
      document.fonts.ready.then(() => {
        if (!cancelled) measure();
      });
    }

    return () => {
      cancelled = true;
      resizeObserver.disconnect();
    };
  }, [firstName, lastName]);

  return { wrapperRef, firstRef, lastRef, letterSpacing };
}

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
  const { wrapperRef, firstRef, lastRef, letterSpacing } = useJustifiedNameWidths(firstName, lastName);

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

            <div ref={wrapperRef}>
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
                  <span
                    ref={firstRef}
                    style={letterSpacing.first ? { letterSpacing: letterSpacing.first } : undefined}
                    className="font-display text-[clamp(2.25rem,4.5vw,3.625rem)] leading-[0.9] tracking-tight text-lg-title"
                  >
                    {firstName}
                  </span>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <h1
                  ref={lastRef}
                  style={letterSpacing.last ? { letterSpacing: letterSpacing.last } : undefined}
                  className="font-display text-[clamp(3rem,7vw,5.625rem)] font-normal leading-[0.9] tracking-tight text-lg-subtitle"
                >
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
                  className="flex h-10 items-center rounded-sm bg-blue-300 px-4 text-sm font-medium text-lg-background transition-opacity hover:opacity-85"
                >
                  {t.hero.ctaPrimary}
                </Link>
                <a
                  data-cursor="link"
                  href={t.hero.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("cv_click", { location: "hero" })}
                  className="flex h-10 items-center rounded-sm border border-hairline px-4 text-sm text-lg-subtitle2 transition-colors hover:border-blue-300"
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
          <Image
            src="/images/hero/hands.png"
            alt="Hands raised toward light, symbolizing the collaboration between design craft and AI tools"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            draggable={false}
            className="object-cover opacity-80"
            priority
          />
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
