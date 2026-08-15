"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useLocale } from "@/lib/locale-context";
import Reveal from "./Reveal";
import type { TimelineEntry } from "@/lib/content";

type CardMedia = { cover: string; logo: string };

const CARD_MEDIA: CardMedia[] = [
  { cover: "/images/experience/tractian-cover.png", logo: "/images/experience/tractian-logo.svg" },
  { cover: "/images/experience/plific-cover.png", logo: "/images/experience/plific-logo.svg" },
  { cover: "/images/experience/qrculture-cover.png", logo: "/images/experience/qrculture-logo.svg" },
];

const STACK_OFFSET = [
  { x: 0, y: 0 },
  { x: 123, y: 23 },
  { x: 246, y: 46 },
];

const ENTRY_DISTANCE_FALLBACK = 720;
const ENTRY_LATERAL_OFFSET = 32;

function easeInOutCubic(t: number) {
  const clamped = Math.min(1, Math.max(0, t));
  return clamped < 0.5 ? 4 * clamped ** 3 : 1 - (-2 * clamped + 2) ** 3 / 2;
}

export default function Experience() {
  const { t } = useLocale();
  const trackRef = useRef<HTMLDivElement>(null);
  const pinnedWindowRef = useRef<HTMLDivElement>(null);
  const primaryCardRef = useRef<HTMLDivElement>(null);
  const [primaryCardHeight, setPrimaryCardHeight] = useState<number | null>(null);
  const [pinnedWindowHeight, setPinnedWindowHeight] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    // trackRef's own top sits 8rem (top-32) into the section because of the
    // wrapper's padding, so "start start" only reached 0 after scrolling past
    // that gap first — the card sat frozen at its peek position the whole
    // time. Starting the measurement at that same 8rem offset means progress
    // begins ticking (and the card starts moving) from the very first pixel
    // scrolled once the section is in place.
    offset: ["start 128px", "end end"],
  });

  useEffect(() => {
    const el = primaryCardRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      setPrimaryCardHeight(el.getBoundingClientRect().height);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = pinnedWindowRef.current;
    if (!el) return;
    // Cards enter from below by this many px; it must clear the pinned window's
    // own height, otherwise on tall viewports the "hidden" card still pokes
    // into view at the bottom before its entrance animation even starts.
    const observer = new ResizeObserver(() => {
      setPinnedWindowHeight(el.getBoundingClientRect().height);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Every card's progress clamps to 0 until its own range starts, so they'd all
  // sit at the same entry offset simultaneously. Only the first (frontmost) card
  // should peek in from the start; the rest must stay fully off-screen until
  // their own range begins, or they'd all peek in at once behind it.
  const peekEntryDistance =
    pinnedWindowHeight === null || primaryCardHeight === null
      ? ENTRY_DISTANCE_FALLBACK
      : Math.max(0, pinnedWindowHeight - primaryCardHeight * 0.25);
  const hiddenEntryDistance = pinnedWindowHeight === null ? ENTRY_DISTANCE_FALLBACK : pinnedWindowHeight + 40;

  const entrySpan = t.timeline.length - 0.15;

  return (
    <section id="experience" className="relative border-b border-hairline bg-lg-background2">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-32 hidden h-[200vh] md:block">
        <div className="sticky top-0 h-screen">
          <div
            className="absolute inset-y-0 right-0 w-[38.4%] max-w-[720px]"
            style={{
              backgroundImage: "url('/images/experience/animation-points.gif')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "top right",
              backgroundSize: "contain",
              opacity: 0.15,
            }}
          />
        </div>
      </div>
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:px-10 md:pt-32 md:pb-0">
        <div className="grid gap-12 md:grid-cols-[310px_1fr] md:gap-12">
          <div className="md:sticky md:top-32 md:h-[calc(100vh-8rem)]">
            <Reveal>
              <h2 className="font-display text-3xl font-normal text-lg-title md:text-4xl">
                {t.experience.title}
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-base text-lg-subtitle">
                {t.experience.tags.map((tag, i) => (
                  <span key={tag} className="flex items-center gap-3">
                    {i > 0 && <span className="text-sm text-lg-title/60">•</span>}
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <a
                data-cursor="link"
                href={t.hero.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex h-10 items-center rounded-sm bg-blue-300 px-4 text-sm font-medium text-lg-background transition-opacity hover:opacity-85"
              >
                {t.hero.ctaSecondary}
              </a>
            </Reveal>
          </div>

          <div ref={trackRef} className="relative isolate hidden md:block md:h-[200vh]">
            <div ref={pinnedWindowRef} className="sticky top-32 h-[calc(100vh-8rem)]">
              <div className="relative w-full max-w-[520px] pr-[248px] pb-12">
                {t.timeline.map((entry, i) => (
                  <StackCard
                    key={entry.company}
                    entry={entry}
                    media={CARD_MEDIA[i]}
                    offset={STACK_OFFSET[i]}
                    zIndex={10 + i * 10}
                    progress={scrollYProgress}
                    range={[i / entrySpan, (i + 0.85) / entrySpan]}
                    entryDistance={i === 0 ? peekEntryDistance : hiddenEntryDistance}
                    contentRef={i === 0 ? primaryCardRef : undefined}
                    matchHeight={i === 0 || primaryCardHeight === null ? undefined : primaryCardHeight - STACK_OFFSET[i].y}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8 md:hidden">
            {t.timeline.map((entry, i) => (
              <Reveal key={entry.company} delay={i * 0.06}>
                <CardContent entry={entry} media={CARD_MEDIA[i]} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StackCard({
  entry,
  media,
  offset,
  zIndex,
  progress,
  range,
  entryDistance,
  contentRef,
  matchHeight,
}: {
  entry: TimelineEntry;
  media: CardMedia;
  offset: { x: number; y: number };
  zIndex: number;
  progress: MotionValue<number>;
  range: [number, number];
  entryDistance: number;
  contentRef?: RefObject<HTMLDivElement | null>;
  matchHeight?: number;
}) {
  const localT = useTransform(progress, range, [0, 1]);
  const y = useTransform(localT, (t) => entryDistance * (1 - easeInOutCubic(t)));
  const x = useTransform(localT, (t) => -ENTRY_LATERAL_OFFSET * (1 - easeInOutCubic(t)));

  return (
    <motion.div
      style={{ position: "absolute", left: offset.x, top: offset.y, x, y, zIndex }}
      className="w-full"
    >
      <CardContent entry={entry} media={media} contentRef={contentRef} height={matchHeight} />
    </motion.div>
  );
}

function CardContent({
  entry,
  media,
  contentRef,
  height,
}: {
  entry: TimelineEntry;
  media: CardMedia;
  contentRef?: RefObject<HTMLDivElement | null>;
  height?: number;
}) {
  return (
    <div
      ref={contentRef}
      style={height !== undefined ? { height, overflow: "hidden" } : undefined}
      className="w-full rounded-2xl border border-lg-divider bg-white p-6 shadow-[0_20px_45px_-25px_rgba(28,27,23,0.35)]"
    >
      <div className="relative aspect-[581/169] w-full overflow-hidden rounded-xl">
        <Image src={media.cover} alt="" fill sizes="520px" draggable={false} className="object-cover" />
      </div>
      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="relative block size-8 shrink-0 overflow-hidden rounded-sm">
            <Image src={media.logo} alt="" fill sizes="32px" draggable={false} className="object-cover" />
          </span>
          <h3 className="font-sans text-base font-medium tracking-tight text-lg-subtitle2">
            {entry.company}
          </h3>
        </div>
        <span className="whitespace-nowrap font-sans text-sm font-medium text-blue-200">{entry.period}</span>
      </div>
      <ol className="mt-4 flex flex-col gap-3">
        {entry.bullets.map((bullet, i) => (
          <li key={bullet} className="flex gap-2 text-sm">
            <span className="shrink-0 text-lg-title">{i + 1}.</span>
            <span className="font-light leading-6 text-lg-subtitle2">{bullet}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
