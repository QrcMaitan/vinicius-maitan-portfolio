"use client";

import { useLocale } from "@/lib/locale-context";
import Reveal from "./Reveal";
import Counter from "./Counter";

export default function Experience() {
  const { t } = useLocale();

  return (
    <section id="experience" className="border-b border-hairline py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-ink-soft">
            {t.experience.eyebrow}
          </span>
          <h2 className="mt-2 font-display text-3xl font-normal md:text-4xl">
            {t.experience.title}
          </h2>
        </div>

        <Reveal>
          <div className="grid grid-cols-2 overflow-hidden rounded-md border border-hairline md:grid-cols-4">
            {t.experience.metrics.map((metric, i) => {
              const borders = [
                "",
                "border-l border-hairline",
                "border-t border-hairline md:border-t-0 md:border-l md:border-hairline",
                "border-l border-t border-hairline md:border-t-0",
              ][i];
              return (
                <div key={metric.label} className={`p-6 md:p-7 ${borders}`}>
                  <div className="font-display text-4xl">
                    <Counter value={metric.value} suffix={metric.suffix} />
                  </div>
                  <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.05em] text-ink-soft">
                    {metric.label}
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-16 flex flex-col">
          {t.timeline.map((entry, i) => (
            <Reveal key={entry.company} delay={i * 0.05}>
              <div className={`grid gap-6 py-9 md:grid-cols-[160px_1fr] ${i > 0 ? "border-t border-hairline" : ""}`}>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.04em] text-ink-soft">
                    {entry.period}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-hairline px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.04em] text-ink-soft"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl">
                    {entry.company}
                    <span className="ml-2 font-sans text-sm font-normal text-ink-soft">
                      — {entry.role}
                    </span>
                  </h3>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {entry.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-steel" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
