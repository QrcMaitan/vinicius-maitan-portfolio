"use client";

import Link from "next/link";
import { useLocale } from "@/lib/locale-context";
import Reveal from "./Reveal";

export default function LatestProjects() {
  const { t } = useLocale();

  return (
    <section id="projects" className="bg-carbon py-24 text-chalk md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-chalk-soft">
              {t.projects.eyebrow}
            </span>
            <h2 className="mt-2 font-display text-3xl font-normal md:text-4xl">
              {t.projects.title}
            </h2>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-2 md:gap-8">
          {t.projects.items.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.08}>
              <Link
                href={`/projects/${project.slug}`}
                data-cursor="media"
                className="group block"
              >
                <div className="relative h-[220px]">
                  <div className="absolute inset-0 translate-x-5 translate-y-5 rounded-md border border-hairline-dark bg-[#201d15]" />
                  <div className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-md border border-hairline-dark bg-[#1b1912]" />
                  <div className="absolute inset-0 flex items-end rounded-md border border-hairline-dark bg-char p-5 transition-transform duration-300 group-hover:-translate-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-chalk-soft">
                      {project.client} — {project.year}
                    </span>
                  </div>
                </div>
                <div className="mt-6 flex items-baseline justify-between gap-4">
                  <div className="flex gap-3 font-mono text-[11px] uppercase tracking-[0.05em] text-chalk-soft">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.05em] text-steel-soft opacity-0 transition-opacity group-hover:opacity-100">
                    {t.projects.viewCase} →
                  </span>
                </div>
                <h3 className="mt-3 font-display text-2xl">{project.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-chalk-soft">
                  {project.description}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
