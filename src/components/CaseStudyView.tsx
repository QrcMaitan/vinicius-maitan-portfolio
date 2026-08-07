"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useLocale } from "@/lib/locale-context";
import MediaPlaceholder from "./MediaPlaceholder";
import Reveal from "./Reveal";

export default function CaseStudyView({ slug }: { slug: string }) {
  const { t } = useLocale();
  const project = t.projects.items.find((p) => p.slug === slug);
  const next = t.projects.items.find((p) => p.slug !== slug);

  if (!project) notFound();

  return (
    <main className="flex-1 pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <Reveal>
          <Link
            data-cursor="link"
            href="/#projects"
            className="font-mono text-xs uppercase tracking-[0.06em] text-ink-soft transition-colors hover:text-ink"
          >
            ← {t.caseStudy.back}
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3 font-mono text-xs uppercase tracking-[0.05em] text-ink-soft">
            <span>
              {t.caseStudy.client} — {project.client}
            </span>
            <span>
              {t.caseStudy.role} — {project.role}
            </span>
            <span>
              {t.caseStudy.year} — {project.year}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.2rem,5vw,3.6rem)] font-light leading-[1.05]">
            {project.title}
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-hairline px-3 py-1 font-mono text-[10px] uppercase tracking-[0.05em] text-ink-soft"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-12">
          <MediaPlaceholder ratio="16 / 8" variant="paper" label="Project screen — replace with real capture" />
        </Reveal>

        <div className="mt-16 grid gap-14 md:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div>
              <h2 className="font-mono text-xs uppercase tracking-[0.06em] text-steel">
                {t.caseStudy.overview}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">{project.description}</p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div>
              <h2 className="font-mono text-xs uppercase tracking-[0.06em] text-steel">
                {t.caseStudy.highlights}
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {project.highlights.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-steel" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {next && (
          <Reveal delay={0.1} className="mt-24 border-t border-hairline pt-10">
            <Link data-cursor="link" href={`/projects/${next.slug}`} className="group flex items-baseline justify-between gap-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.06em] text-ink-soft">
                  {t.caseStudy.next}
                </span>
                <h3 className="mt-2 font-display text-2xl transition-colors group-hover:text-steel">
                  {next.title}
                </h3>
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.05em] text-steel-soft">→</span>
            </Link>
          </Reveal>
        )}
      </div>
    </main>
  );
}
