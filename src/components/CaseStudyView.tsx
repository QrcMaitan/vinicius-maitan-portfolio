"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState } from "react";
import { useLocale } from "@/lib/locale-context";
import type { CaseStudyBlock } from "@/lib/content";
import Reveal from "./Reveal";
import PrototypeDrawer from "./PrototypeDrawer";

export default function CaseStudyView({ slug }: { slug: string }) {
  const { t } = useLocale();
  const project = t.projects.items.find((p) => p.slug === slug);
  const next = t.projects.items.find((p) => p.slug !== slug);

  if (!project) notFound();

  return (
    <main className="flex-1 bg-lg-background2 pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <Reveal>
          <Link
            data-cursor="link"
            href="/#projects"
            className="font-mono text-xs uppercase tracking-[0.06em] text-lg-subtitle2 transition-colors hover:text-lg-title"
          >
            ← {t.caseStudy.back}
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <span className="mt-10 block font-mono text-xs uppercase tracking-[0.08em] text-blue-200">
            {project.client}
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-3 text-lg leading-relaxed text-lg-subtitle2">{project.tagline}</p>
        </Reveal>

        <Reveal delay={0.11}>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-hairline px-3 py-1 font-mono text-[10px] uppercase tracking-[0.05em] text-lg-subtitle2"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <h1 className="mt-8 font-display text-[clamp(2rem,4.5vw,3.2rem)] font-light leading-[1.08] text-lg-title">
            {project.title}
          </h1>
        </Reveal>

        <Reveal delay={0.17}>
          <p className="mt-5 text-base leading-relaxed text-lg-subtitle2">{project.description}</p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-hairline py-8 md:grid-cols-4">
            {project.meta.map((group) => (
              <div key={group.label}>
                <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-blue-200">
                  {group.label}
                </span>
                <div className="mt-2 flex flex-col gap-1">
                  {group.values.map((value) => (
                    <span key={value} className="text-sm leading-snug text-lg-subtitle2">
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.24} className="mt-12">
          <div
            data-cursor="media"
            className="relative overflow-hidden rounded-md"
            style={{ aspectRatio: `${project.heroImage.width} / ${project.heroImage.height}` }}
          >
            <Image
              src={project.heroImage.src}
              alt={project.heroImage.alt}
              width={project.heroImage.width}
              height={project.heroImage.height}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>

        {project.blocks.map((block, i) => (
          <CaseStudyBlockView key={i} block={block} />
        ))}

        {next && (
          <Reveal delay={0.1} className="mt-24 border-t border-hairline pt-10">
            <Link
              data-cursor="link"
              href={`/projects/${next.slug}`}
              className="group flex items-baseline justify-between gap-6"
            >
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.06em] text-lg-subtitle2">
                  {t.caseStudy.next}
                </span>
                <h3 className="mt-2 font-display text-2xl text-lg-title transition-colors group-hover:text-blue-200">
                  {next.title}
                </h3>
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.05em] text-blue-100">→</span>
            </Link>
          </Reveal>
        )}
      </div>
    </main>
  );
}

function CaseStudyBlockView({ block }: { block: CaseStudyBlock }) {
  switch (block.type) {
    case "text": {
      const isSection = Boolean(block.eyebrow);
      return (
        <Reveal>
          <div className={isSection ? "mt-16 border-t border-hairline pt-12" : "mt-8"}>
            {block.eyebrow && (
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-blue-200">
                {block.eyebrow}
              </span>
            )}
            {block.title && (
              <h2
                className={
                  block.eyebrow
                    ? "mt-2 font-display text-2xl font-normal text-lg-title md:text-3xl"
                    : "font-display text-xl font-normal text-lg-title"
                }
              >
                {block.title}
              </h2>
            )}
            {block.paragraphs.map((p, i) => (
              <p
                key={i}
                className={`text-base leading-relaxed text-lg-subtitle2 ${
                  i === 0 && (block.eyebrow || block.title) ? "mt-4" : "mt-4 first:mt-0"
                }`}
              >
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      );
    }

    case "stats": {
      const cols = block.items.length >= 4 ? "md:grid-cols-4" : "md:grid-cols-3";
      return (
        <Reveal>
          <div className={`mt-8 grid grid-cols-2 overflow-hidden rounded-md border border-hairline ${cols}`}>
            {block.items.map((item, i) => (
              <div
                key={item.label}
                className={`p-6 ${i > 0 ? "border-l border-hairline" : ""} ${
                  i === 2 ? "border-t border-hairline md:border-t-0" : ""
                } ${i === 3 ? "border-t border-hairline md:border-t-0" : ""}`}
              >
                <div className="tabular font-display text-3xl text-lg-title">{item.value}</div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.05em] text-lg-subtitle2">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      );
    }

    case "quote":
      return (
        <Reveal>
          <div className="mt-12 rounded-md border border-hairline p-8 text-center md:p-10">
            <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.06em] text-blue-200">
              <span>{block.tagTop}</span>
              <span className="text-lg-subtitle2">→</span>
              <span>{block.tagBottom}</span>
            </div>
            <p className="mt-5 font-display text-xl italic leading-snug text-lg-title md:text-2xl">
              “{block.text}”
            </p>
          </div>
        </Reveal>
      );

    case "grid":
      return (
        <Reveal>
          <div className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {block.items.map((item) => (
              <div key={item.title}>
                <h4 className="font-display text-lg text-lg-title">{item.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-lg-subtitle2">{item.description}</p>
              </div>
            ))}
          </div>
        </Reveal>
      );

    case "chain":
      return (
        <Reveal>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {block.items.map((item, i) => (
              <div key={item} className="flex items-center gap-3">
                <span className="rounded-full border border-hairline px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.05em] text-lg-subtitle2">
                  {item}
                </span>
                {i < block.items.length - 1 && <span className="text-blue-200">→</span>}
              </div>
            ))}
          </div>
        </Reveal>
      );

    case "image":
      return (
        <Reveal>
          <div className={`mt-8 grid gap-4 ${block.images.length > 1 ? "sm:grid-cols-2" : ""}`}>
            {block.images.map((image) => (
              <div
                key={image.src}
                data-cursor="media"
                className="overflow-hidden rounded-md"
                style={{ aspectRatio: `${image.width} / ${image.height}` }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </Reveal>
      );

    case "cta":
      return <CtaBlock block={block} />;

    default:
      return null;
  }
}

function CtaBlock({ block }: { block: Extract<CaseStudyBlock, { type: "cta" }> }) {
  const [prototypeOpen, setPrototypeOpen] = useState(false);

  return (
    <>
      <Reveal>
        <div className="mt-16 rounded-md border border-hairline p-8 md:p-10">
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-blue-200">{block.eyebrow}</span>
          <h3 className="mt-2 font-display text-xl text-lg-title md:text-2xl">{block.title}</h3>
          {block.prototypeEmbedUrl ? (
            <button
              type="button"
              data-cursor="link"
              onClick={() => setPrototypeOpen(true)}
              className="mt-6 inline-block rounded-sm bg-blue-300 px-6 py-3 font-mono text-xs uppercase tracking-[0.06em] text-lg-background transition-opacity hover:opacity-85"
            >
              {block.buttonLabel}
            </button>
          ) : (
            <a
              data-cursor="link"
              href={block.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-sm bg-blue-300 px-6 py-3 font-mono text-xs uppercase tracking-[0.06em] text-lg-background transition-opacity hover:opacity-85"
            >
              {block.buttonLabel}
            </a>
          )}
        </div>
      </Reveal>

      {block.prototypeEmbedUrl && (
        <PrototypeDrawer
          open={prototypeOpen}
          onClose={() => setPrototypeOpen(false)}
          embedUrl={block.prototypeEmbedUrl}
        />
      )}
    </>
  );
}
