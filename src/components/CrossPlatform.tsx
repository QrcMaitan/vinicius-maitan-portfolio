"use client";

import { useLocale } from "@/lib/locale-context";
import Reveal from "./Reveal";

export default function CrossPlatform() {
  const { t } = useLocale();

  return (
    <section className="border-b border-hairline py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-ink-soft">
              {t.cross.eyebrow}
            </span>
            <h2 className="mt-2 font-display text-3xl font-normal md:text-4xl">{t.cross.title}</h2>
          </div>
        </div>

        <div className="grid gap-px overflow-hidden rounded-md border border-hairline bg-hairline md:grid-cols-3">
          {t.cross.items.map((item, i) => (
            <Reveal key={item.tag} delay={i * 0.06} className="bg-bone">
              <div className="h-full p-8 transition-colors hover:bg-bone-dim">
                <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-steel">
                  {item.tag}
                </span>
                <h3 className="mt-3 font-display text-xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
