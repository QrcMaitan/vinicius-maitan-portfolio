"use client";

import { useLocale } from "@/lib/locale-context";
import MediaPlaceholder from "./MediaPlaceholder";
import Reveal from "./Reveal";

export default function Hero() {
  const { t } = useLocale();

  return (
    <section className="flex min-h-screen flex-col justify-center border-b border-hairline pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-6 md:grid-cols-[1.1fr_0.9fr] md:px-10">
        <div>
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.09em] text-steel">
              {t.hero.kicker}
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,4.6rem)] font-light leading-[1.03] tracking-tight">
              {t.hero.name}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
              {t.hero.subtitle}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                data-cursor="link"
                href="#experience"
                className="rounded-sm bg-ink px-6 py-3 font-mono text-xs uppercase tracking-[0.06em] text-bone transition-opacity hover:opacity-85"
              >
                {t.hero.ctaPrimary}
              </a>
              <a
                data-cursor="link"
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm border border-hairline px-6 py-3 font-mono text-xs uppercase tracking-[0.06em] transition-colors hover:border-ink"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <MediaPlaceholder ratio="4 / 5" label="Reel — replace with real footage" />
        </Reveal>
      </div>
    </section>
  );
}
