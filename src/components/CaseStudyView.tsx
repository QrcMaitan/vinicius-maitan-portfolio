"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState, type CSSProperties } from "react";
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
    <main className="flex-1 bg-white pt-36 pb-24 md:pt-44 md:pb-32">
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

function renderRichText(text: string) {
  return text.split(/(\*\*.+?\*\*|~~.+?~~)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("~~") && part.endsWith("~~")) {
      return <s key={i}>{part.slice(2, -2)}</s>;
    }
    return part;
  });
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
                {renderRichText(p)}
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
          <div className="mt-8">
            <div className="flex flex-col items-center justify-center gap-3 font-mono text-base uppercase tracking-[0.06em] text-lg-subtitle2 sm:flex-row">
              <span>{block.tagTop}</span>
              <img
                src="/images/tractian/insight-correction-divider.svg"
                alt=""
                width={40}
                height={22}
                className="h-4 w-auto"
              />
              <span>{block.tagBottom}</span>
            </div>
            <p className="mt-8 text-base leading-relaxed text-lg-subtitle2">{renderRichText(block.text)}</p>
          </div>
        </Reveal>
      );

    case "steps":
      return (
        <Reveal>
          <div className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {block.items.map((item, i) => (
              <div key={item.title}>
                <h4 className="font-display text-lg text-lg-title">
                  {i + 1}. {item.title}
                </h4>
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

    case "tools":
      return (
        <Reveal>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            {block.items.map((item, i) => (
              <div key={item.label} className="flex items-center gap-3 sm:gap-6">
                <img
                  src={item.icon}
                  alt={item.label}
                  width={64}
                  height={64}
                  draggable={false}
                  className="size-10 shrink-0 sm:size-[52px]"
                />
                {i < block.items.length - 1 && (
                  <img
                    src="/images/plific/icon-separator.svg"
                    alt=""
                    width={26}
                    height={12}
                    className="h-2.5 w-[18px] shrink-0 sm:h-3 sm:w-[26px]"
                  />
                )}
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

  if (block.previewImage) {
    const isPrototype = Boolean(block.prototypeEmbedUrl);
    const button = block.prototypeEmbedUrl ? (
      <button
        type="button"
        data-cursor="link"
        onClick={() => setPrototypeOpen(true)}
        className="rounded-sm bg-blue-200 px-3.5 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-85"
      >
        {block.buttonLabel}
      </button>
    ) : (
      <a
        data-cursor="link"
        href={block.href}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-sm bg-blue-200 px-3.5 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-85"
      >
        {block.buttonLabel}
      </a>
    );

    return (
      <>
        <Reveal>
          <div className="mt-16">
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-blue-200">{block.eyebrow}</span>
            <div
              className={`mt-4 flex flex-col gap-8 rounded-2xl bg-white px-6 shadow-[0px_1px_9px_2px_rgba(54,60,68,0.1)] sm:flex-row sm:gap-6 ${
                isPrototype
                  ? "items-start pt-8 sm:items-center sm:pl-8 sm:pr-12 sm:pt-6 sm:pb-0"
                  : "items-start py-8 sm:items-center sm:pl-8 sm:pr-6 sm:py-6"
              }`}
            >
              <div
                className={`flex flex-1 flex-col items-start ${isPrototype ? "gap-5 sm:-mt-6" : "gap-6"}`}
              >
                {block.icon && (
                  <img
                    src={block.icon.src}
                    alt={block.icon.alt}
                    width={block.icon.width}
                    height={block.icon.height}
                    style={{ width: block.icon.width, height: block.icon.height }}
                  />
                )}
                <div>
                  <h3 className="font-display text-2xl text-lg-title">{block.title}</h3>
                  {block.subtitle && (
                    <p className="mt-2 text-base font-light text-lg-subtitle">{renderRichText(block.subtitle)}</p>
                  )}
                </div>
                {button}
              </div>
              <div
                className={`shrink-0 self-center overflow-hidden rounded-md sm:w-[var(--preview-w)] sm:self-end ${
                  isPrototype ? "w-[220px]" : "w-full"
                }`}
                style={
                  block.previewBox
                    ? ({
                        "--preview-w": `${block.previewBox.width}px`,
                        aspectRatio: `${block.previewBox.width} / ${block.previewBox.height}`,
                      } as CSSProperties)
                    : undefined
                }
              >
                <img
                  src={block.previewImage.src}
                  alt={block.previewImage.alt}
                  width={block.previewImage.width}
                  height={block.previewImage.height}
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>
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
              className="mt-6 inline-block rounded-sm bg-blue-200 px-6 py-3 font-mono text-xs uppercase tracking-[0.06em] text-lg-background transition-opacity hover:opacity-85"
            >
              {block.buttonLabel}
            </button>
          ) : (
            <a
              data-cursor="link"
              href={block.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-sm bg-blue-200 px-6 py-3 font-mono text-xs uppercase tracking-[0.06em] text-lg-background transition-opacity hover:opacity-85"
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
