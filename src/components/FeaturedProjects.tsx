"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/lib/locale-context";
import Reveal from "./Reveal";

const ICONS = "/images/projects-canvas/icons";
const AVATARS: Record<SlugKey, string> = {
  tractian: "/images/projects-canvas/avatar-tractian.png",
  plific: "/images/projects-canvas/avatar-plific.png",
};

type SlugKey = "tractian" | "plific";

const TOOLBAR_ICONS: { src: string; w: number; h: number; active?: boolean }[] = [
  { src: `${ICONS}/tool-move.svg`, w: 15, h: 15, active: true },
  { src: `${ICONS}/tool-hand.svg`, w: 15, h: 15 },
  { src: `${ICONS}/tool-frame.svg`, w: 15, h: 15 },
  { src: `${ICONS}/tool-rectangle.svg`, w: 11, h: 11 },
  { src: `${ICONS}/tool-pen.svg`, w: 15, h: 15 },
  { src: `${ICONS}/tool-text.svg`, w: 18, h: 13 },
];

const LAYER_PAGES = ["UI", "Desktop", "Mobile", "Benchmark"];

const TRACTIAN_LAYERS: { depth: number; label: string; icon: "frame" | "avatar" | "text" | null }[] = [
  { depth: 1, label: "Top Bar", icon: "frame" },
  { depth: 2, label: "Brand Nav", icon: "frame" },
  { depth: 2, label: "Search Bar", icon: "frame" },
  { depth: 1, label: "User Menu", icon: "frame" },
  { depth: 2, label: "User Avatar", icon: "avatar" },
  { depth: 2, label: "User Name", icon: "text" },
  { depth: 0, label: "Main Content", icon: "frame" },
  { depth: 1, label: "Playlist Content", icon: "frame" },
  { depth: 2, label: "Playlist Panel", icon: "frame" },
  { depth: 3, label: "Playlist Header", icon: "frame" },
];

const PLIFIC_LAYERS: { depth: number; label: string; icon: "frame" | "avatar" | "text" | null }[] = [
  { depth: 1, label: "Top Bar", icon: "frame" },
  { depth: 2, label: "Balance Card", icon: "frame" },
  { depth: 2, label: "Anticipation CTA", icon: "frame" },
  { depth: 1, label: "Earnings List", icon: "frame" },
  { depth: 2, label: "Platform Row", icon: "frame" },
  { depth: 2, label: "Platform Icon", icon: "avatar" },
  { depth: 2, label: "Amount", icon: "text" },
  { depth: 0, label: "Main Content", icon: "frame" },
  { depth: 1, label: "Cost Breakdown", icon: "frame" },
  { depth: 2, label: "Rate Detail", icon: "text" },
];

const CONTENT_SIZE: Record<SlugKey, { width: number; height: number }> = {
  tractian: { width: 2500, height: 720 },
  plific: { width: 2641, height: 5520 },
};

export default function FeaturedProjects() {
  const { t } = useLocale();
  const [activeSlug, setActiveSlug] = useState<SlugKey>("tractian");
  const activeProject = t.projects.items.find((p) => p.slug === activeSlug) ?? t.projects.items[0];

  return (
    <section
      id="projects"
      data-scroll-snap
      data-cursor-theme="dark"
      className="border-b border-hairline-dark bg-dk-background text-dk-title"
    >
      <div className="mx-auto flex h-[calc(100vh+350px)] min-h-[1050px] max-w-6xl flex-col px-6 pt-24 pb-10 md:h-screen md:min-h-[700px] md:px-10 md:pt-32 md:pb-12">
        <Reveal>
          <h2 className="font-display text-3xl font-normal md:text-4xl">{t.featuredProjects.title}</h2>
          <p className="mt-3 text-sm text-dk-subtitle md:text-base">{t.featuredProjects.subtitle}</p>
        </Reveal>

        <Reveal delay={0.1} className="relative mt-12 min-h-0 flex-1">
          <div className="flex h-full flex-col gap-6 md:flex-row">
            <div className="flex w-full shrink-0 flex-col divide-y divide-white/10 self-start overflow-hidden rounded-xl shadow-[0px_59px_24px_0px_rgba(0,0,0,0.01),0px_33px_20px_0px_rgba(0,0,0,0.05),0px_15px_15px_0px_rgba(0,0,0,0.09),0px_4px_8px_0px_rgba(0,0,0,0.1)] md:w-[270px] md:overflow-y-auto">
              {t.featuredProjects.items.map((item) => (
                <SwitcherItem
                  key={item.slug}
                  item={item}
                  description={t.projects.items.find((p) => p.slug === item.slug)?.cardDescription ?? ""}
                  active={item.slug === activeSlug}
                  accessCaseLabel={t.featuredProjects.accessCase}
                  onSelect={() => setActiveSlug(item.slug as SlugKey)}
                />
              ))}
            </div>

            <div className="flex min-h-[320px] flex-1 flex-col overflow-hidden rounded-xl bg-[#2a2a2a] shadow-[0px_59px_24px_0px_rgba(0,0,0,0.01),0px_33px_20px_0px_rgba(0,0,0,0.05),0px_15px_15px_0px_rgba(0,0,0,0.09),0px_4px_8px_0px_rgba(0,0,0,0.1)]">
              <TabStrip items={t.featuredProjects.items} activeSlug={activeSlug} onSelect={setActiveSlug} />
              <div className="flex min-h-0 flex-1">
                <div className="hidden shrink-0 md:flex">
                  <ToolbarRail />
                  <LayersPanel activeSlug={activeSlug} activeLabel={activeProject.title} />
                </div>
                <FigmaCanvas slug={activeSlug} />
                <div className="hidden shrink-0 lg:flex">
                  <PropertiesPanel />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-4 flex shrink-0 items-center justify-end gap-2 text-xs text-dk-subtitle">
          <span>{t.featuredProjects.dragHint}</span>
          <span aria-hidden>&bull;</span>
          <span>{t.featuredProjects.switchHint}</span>
        </div>
      </div>
    </section>
  );
}

function SwitcherItem({
  item,
  description,
  active,
  accessCaseLabel,
  onSelect,
}: {
  item: { slug: string; label: string; brand: string };
  description: string;
  active: boolean;
  accessCaseLabel: string;
  onSelect: () => void;
}) {
  return (
    <div className={`flex flex-col transition-colors ${active ? "bg-white/[0.07]" : "bg-[#0d0d0d] hover:bg-white/5"}`}>
      <button
        type="button"
        data-cursor="link"
        onClick={onSelect}
        className={`flex items-center gap-3 px-4 pt-3 ${active ? "border-b border-white/20 pb-3" : "py-3"}`}
      >
        <span className="relative size-[42px] shrink-0 overflow-hidden rounded-full">
          <Image src={AVATARS[item.slug as SlugKey]} alt="" fill sizes="42px" className="object-cover" />
        </span>
        <span className="flex flex-1 flex-col items-start gap-1 text-left">
          <span className="text-sm font-medium tracking-[-0.07px] text-[#a19e99]">{item.label}</span>
          <span className="font-sans text-base font-semibold tracking-[-0.32px] text-[#f6f4ef]">{item.brand}</span>
        </span>
        <Image
          src={`${ICONS}/chevron-down.svg`}
          alt=""
          width={12}
          height={12}
          className={`shrink-0 opacity-80 ${active ? "rotate-180" : ""}`}
        />
      </button>

      <div className="grid transition-[grid-template-rows] duration-500 ease-out" style={{ gridTemplateRows: active ? "1fr" : "0fr" }}>
        <div className="overflow-hidden">
          <div className="flex flex-col gap-3 px-4 pt-4 pb-4">
            <p className="text-sm leading-relaxed tracking-[-0.07px] text-white/80">{description}</p>
            <Link
              href={`/projects/${item.slug}`}
              data-cursor="link"
              className="font-mono text-[15px] font-medium text-white transition-opacity hover:opacity-70"
            >
              {accessCaseLabel} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabStrip({
  items,
  activeSlug,
  onSelect,
}: {
  items: { slug: string; label: string; brand: string }[];
  activeSlug: SlugKey;
  onSelect: (slug: SlugKey) => void;
}) {
  return (
    <div className="flex shrink-0 items-center gap-1 border-b border-[#373737] bg-[#2a2a2a] py-1 pr-3">
      <div className="flex h-9 w-[88px] shrink-0 items-center justify-center gap-[9px]">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-[9px] rounded-full bg-[#444]" />
        ))}
      </div>
      <div className="h-[18px] w-px shrink-0 bg-[#444]" />
      {items.map((item) => {
        const isActive = item.slug === activeSlug;
        return (
          <button
            key={item.slug}
            type="button"
            data-cursor="link"
            onClick={() => onSelect(item.slug as SlugKey)}
            className={`flex h-7 shrink-0 items-center gap-1.5 rounded-md px-2 text-[12px] tracking-[0.18px] transition-colors ${
              isActive
                ? "bg-[#373737] text-white/90 shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.06)]"
                : "text-[#959595] hover:bg-white/5 hover:text-white/80"
            }`}
          >
            <span className="relative size-4 shrink-0 overflow-hidden rounded-full">
              <Image src={AVATARS[item.slug as SlugKey]} alt="" fill sizes="16px" className="object-cover" />
            </span>
            <span className="whitespace-nowrap">
              {item.brand.charAt(0) + item.brand.slice(1).toLowerCase()} - {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function ToolbarRail() {
  return (
    <div className="flex w-[42px] shrink-0 flex-col items-center gap-1 border-r border-[#373737] bg-[#2a2a2a] py-2">
      {TOOLBAR_ICONS.map((icon, i) => (
        <span
          key={i}
          className={`flex size-9 shrink-0 items-center justify-center rounded-md ${icon.active ? "bg-[#444] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.05)]" : ""}`}
        >
          <Image src={icon.src} alt="" width={icon.w} height={icon.h} className="opacity-90" />
        </span>
      ))}
    </div>
  );
}

function LayerRow({
  depth,
  label,
  icon,
  expandable,
}: {
  depth: number;
  label: string;
  icon: "page" | "frame" | "avatar" | "text" | null;
  expandable?: boolean;
}) {
  return (
    <div className="flex h-7 items-center gap-1.5" style={{ paddingLeft: 8 + depth * 16 }}>
      {expandable ? (
        <Image src={`${ICONS}/caret.svg`} alt="" width={8} height={8} className="shrink-0 opacity-60" />
      ) : (
        <span className="size-2 shrink-0" />
      )}
      {icon === "page" && <Image src={`${ICONS}/layer-page.svg`} alt="" width={14} height={14} className="shrink-0 opacity-60" />}
      {icon === "frame" && <Image src={`${ICONS}/layer-frame.svg`} alt="" width={14} height={14} className="shrink-0 opacity-60" />}
      {icon === "avatar" && (
        <Image src={`${ICONS}/layer-avatar.svg`} alt="" width={11} height={9} className="shrink-0 opacity-60" />
      )}
      {icon === "text" && <span className="w-[14px] shrink-0 text-[11px] font-medium text-white/60">Aa</span>}
      <span className="truncate text-[12px] tracking-[0.18px] text-white/90">{label}</span>
    </div>
  );
}

function LayersPanel({ activeSlug, activeLabel }: { activeSlug: SlugKey; activeLabel: string }) {
  const rows = activeSlug === "tractian" ? TRACTIAN_LAYERS : PLIFIC_LAYERS;
  return (
    <div className="flex h-full w-[140.4px] shrink-0 flex-col overflow-hidden bg-[#2a2a2a]">
      <div className="flex w-[156px] shrink-0 origin-top-left scale-90 flex-col">
        <div className="flex shrink-0 items-center justify-between border-b border-[#373737] py-2 pl-2.5 pr-3">
          <span className="truncate text-[13px] font-medium tracking-[0.18px] text-white/90">{activeLabel}</span>
          <Image src={`${ICONS}/panel-collapse.svg`} alt="" width={14} height={11} className="shrink-0 opacity-70" />
        </div>

        <div className="flex flex-col border-b border-[#373737] pb-1.5">
          <div className="flex h-[34px] items-center justify-between pl-2.5 pr-3 pt-2">
            <span className="text-[12px] font-medium tracking-[0.18px] text-white/90">Pages</span>
            <Image src={`${ICONS}/plus-icon.svg`} alt="" width={10} height={10} className="opacity-70" />
          </div>
          {LAYER_PAGES.map((page) => (
            <LayerRow key={page} depth={0} label={page} icon="page" />
          ))}
        </div>

        <div className="flex flex-col overflow-hidden py-1.5">
          <LayerRow depth={0} label={`Desktop / ${activeLabel}`} icon="frame" expandable />
          {rows.map((row) => (
            <LayerRow key={row.label} depth={row.depth} label={row.label} icon={row.icon} />
          ))}
        </div>
      </div>
    </div>
  );
}

const COLLAB_AVATARS = [
  "/images/projects-canvas/collab-avatar-1.png",
  "/images/projects-canvas/collab-avatar-2.png",
  "/images/projects-canvas/collab-avatar-3.png",
];

function PanelSection({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: "collapse" | "minimize";
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 border-b border-[#373737] py-2">
      <div className="flex h-4 items-center justify-between px-3">
        <span className="text-[12px] font-medium tracking-[0.18px] text-white/90">{label}</span>
        {icon === "collapse" && (
          <Image src={`${ICONS}/caret.svg`} alt="" width={8} height={8} className="opacity-70" />
        )}
        {icon === "minimize" && <span className="h-px w-2.5 bg-white/50" />}
      </div>
      <div className="flex flex-col gap-1.5 px-3">{children}</div>
    </div>
  );
}

function PanelField({ prefix, value }: { prefix: string; value: string }) {
  return (
    <div className="relative h-6 flex-1 rounded-[5px] bg-[#373737] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.03)]">
      <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-[12px] text-white/40">{prefix}</span>
      <span className="absolute inset-y-0 left-6 flex items-center text-[12px] tracking-[0.18px] text-white/90">
        {value}
      </span>
    </div>
  );
}

function PropertiesPanel() {
  return (
    <div className="flex h-full w-[151.2px] shrink-0 flex-col overflow-hidden border-l border-[#373737] bg-[#2a2a2a]">
      <div className="flex w-[168px] origin-top-left scale-90 flex-col text-white/90">
      <div className="flex items-center gap-3 border-b border-[#373737] px-3 py-2">
        <span className="flex items-center">
          {COLLAB_AVATARS.map((src) => (
            <span
              key={src}
              className="relative -ml-1.5 size-[22px] shrink-0 overflow-hidden rounded-full border-2 border-[#2a2a2a] first:ml-0"
            >
              <Image src={src} alt="" fill sizes="22px" className="object-cover" />
            </span>
          ))}
        </span>
        <span className="ml-auto text-[12px] text-white/65">71%</span>
      </div>

      <div className="border-b border-[#373737] px-3 py-2">
        <div className="flex h-6 items-center justify-center gap-1.5 rounded-[5px] bg-[#373737] text-[12px] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.03)]">
          <span className="text-white/90">Copy link</span>
          <span className="text-white/60">⌘ L</span>
        </div>
      </div>

      <PanelSection label="Layout" icon="collapse">
        <div className="flex gap-1.5">
          <PanelField prefix="X" value="50" />
          <PanelField prefix="Y" value="16" />
          <PanelField prefix="∠" value="0°" />
        </div>
        <div className="flex gap-1.5">
          <PanelField prefix="W" value="1075" />
          <PanelField prefix="H" value="649" />
        </div>
      </PanelSection>

      <PanelSection label="Flex" icon="minimize">
        <div className="flex gap-2">
          <div className="flex h-6 w-14 shrink-0 items-center justify-center gap-0.5 rounded-md bg-white/5 p-px">
            <span className="flex h-full flex-1 items-center justify-center rounded-[5px] text-white/70">→</span>
            <span className="flex h-full flex-1 items-center justify-center rounded-[5px] bg-white/5 text-white/90 shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.03)]">
              ↓
            </span>
          </div>
          <div className="grid flex-1 grid-cols-3 gap-0.5 rounded bg-[#373737] p-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className="mx-auto size-[2px] rounded-full bg-white/50" />
            ))}
          </div>
        </div>
        <div className="flex gap-1.5">
          <PanelField prefix="↔" value="0" />
          <PanelField prefix="↕" value="0" />
        </div>
      </PanelSection>

      <div className="flex items-center gap-1.5 border-b border-[#373737] px-3 py-2.5 text-[12px]">
        <span className="flex size-4 items-center justify-center rounded bg-[#373737] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.03)]">
          <Image src={`${ICONS}/plus-icon.svg`} alt="" width={8} height={8} className="opacity-80" />
        </span>
        <span className="text-white/90">Clip content</span>
        <span className="ml-auto text-white/60">⌥ C</span>
      </div>

      <PanelSection label="Radius">
        <div className="flex items-center gap-1.5">
          <span className="relative h-1.5 flex-1 rounded-full bg-white/10">
            <span className="absolute left-0 top-1/2 size-3 -translate-y-1/2 rounded-full bg-[#f9f9f9] shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.35)]" />
          </span>
          <span className="flex h-6 w-10 shrink-0 items-center justify-center rounded-[5px] bg-[#373737] text-[12px] text-white/90">
            0
          </span>
        </div>
      </PanelSection>

      <PanelSection label="Blending">
        <div className="flex gap-1.5">
          <PanelField prefix="◐" value="100%" />
          <div className="flex h-6 flex-1 items-center justify-between rounded-[5px] bg-[#373737] px-2 text-[12px] text-white/90">
            Normal
            <span className="text-white/50">⌄</span>
          </div>
        </div>
      </PanelSection>

      <div className="flex flex-col gap-2 py-2">
        <div className="flex h-4 items-center justify-between px-3">
          <span className="text-[12px] font-medium tracking-[0.18px] text-white/90">Fill</span>
        </div>
        <div className="flex items-center gap-2 px-3">
          <div className="flex h-6 flex-1 items-center rounded-[6px] bg-white/5 p-px text-[12px]">
            <span className="flex flex-1 items-center justify-center rounded-[5px] bg-white/5 text-white/90 shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.03)]">
              Solid
            </span>
            <span className="flex flex-1 items-center justify-center text-white/50">Gradient</span>
            <span className="flex flex-1 items-center justify-center text-white/50">Image</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3">
          <div className="relative h-6 flex-1 overflow-hidden rounded-[5px] bg-[#373737]">
            <span className="absolute inset-y-[3px] left-6 w-4 rounded-[5px] bg-[#505050]" />
          </div>
          <span className="size-6 shrink-0 rounded-[5px] bg-white" />
        </div>
      </div>
      </div>
    </div>
  );
}

const MIN_ZOOM = 0.3;
const MAX_ZOOM = 3;

function FigmaCanvas({ slug }: { slug: SlugKey }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ x: number; y: number; offsetX: number; offsetY: number } | null>(null);
  const [views, setViews] = useState<Record<SlugKey, { x: number; y: number; scale: number }>>({
    tractian: { x: -40, y: -20, scale: 1 },
    plific: { x: -60, y: -40, scale: 0.3 },
  });
  const [dragging, setDragging] = useState(false);
  const offset = views[slug];
  const scale = views[slug].scale;
  const size = CONTENT_SIZE[slug];

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    // Safari's trackpad pinch fires proprietary gesture events instead of wheel+ctrlKey;
    // block them so the browser doesn't zoom the whole page.
    const preventGesture = (e: Event) => e.preventDefault();
    el.addEventListener("gesturestart", preventGesture);
    el.addEventListener("gesturechange", preventGesture);
    el.addEventListener("gestureend", preventGesture);
    return () => {
      el.removeEventListener("gesturestart", preventGesture);
      el.removeEventListener("gesturechange", preventGesture);
      el.removeEventListener("gestureend", preventGesture);
    };
  }, []);

  function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
  }

  function clampOffset(x: number, y: number, forScale: number, viewport: { width: number; height: number }) {
    const minX = Math.min(0, viewport.width - size.width * forScale);
    const minY = Math.min(0, viewport.height - size.height * forScale);
    return { x: clamp(x, minX, 0), y: clamp(y, minY, 0) };
  }

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragState.current = { x: e.clientX, y: e.clientY, offsetX: offset.x, offsetY: offset.y };
    setDragging(true);
  }

  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!dragState.current || !viewportRef.current) return;
    const viewport = viewportRef.current.getBoundingClientRect();
    const deltaX = e.clientX - dragState.current.x;
    const deltaY = e.clientY - dragState.current.y;
    const next = clampOffset(dragState.current.offsetX + deltaX, dragState.current.offsetY + deltaY, scale, viewport);
    setViews((prev) => ({ ...prev, [slug]: { ...next, scale: prev[slug].scale } }));
  }

  function onPointerUp() {
    dragState.current = null;
    setDragging(false);
  }

  function onWheel(e: WheelEvent) {
    if (!(e.ctrlKey || e.metaKey) || !viewportRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    const viewport = viewportRef.current.getBoundingClientRect();
    const pointerX = e.clientX - viewport.left;
    const pointerY = e.clientY - viewport.top;
    const zoomFactor = Math.exp(-e.deltaY * 0.0015);

    // A single atomic update (not two nested setState calls) — Strict Mode double-invokes
    // updater functions to catch impure ones, which would otherwise double-apply a nested
    // setOffsets side effect and throw the cursor-anchored math off.
    setViews((prevViews) => {
      const current = prevViews[slug];
      const nextScale = clamp(current.scale * zoomFactor, MIN_ZOOM, MAX_ZOOM);
      const contentX = (pointerX - current.x) / current.scale;
      const contentY = (pointerY - current.y) / current.scale;
      const next = clampOffset(pointerX - contentX * nextScale, pointerY - contentY * nextScale, nextScale, viewport);
      return { ...prevViews, [slug]: { ...next, scale: nextScale } };
    });
  }

  const onWheelRef = useRef(onWheel);
  useEffect(() => {
    onWheelRef.current = onWheel;
  });

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    // React attaches onWheel as a passive listener, which silently breaks preventDefault
    // (and lets Lenis / the browser's native ctrl+wheel zoom act on the same event), so
    // this listener is registered manually as non-passive instead of via JSX onWheel.
    const handleWheel = (e: WheelEvent) => onWheelRef.current(e);
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div
      ref={viewportRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onDragStart={(e) => e.preventDefault()}
      className={`relative min-w-0 flex-1 touch-none overflow-hidden bg-[#1e1e1e] ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
      style={{
        backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
        backgroundSize: `${22 * scale}px ${22 * scale}px`,
        backgroundPosition: `${offset.x}px ${offset.y}px`,
      }}
    >
      <div
        className="absolute left-0 top-0 select-none"
        style={{
          width: size.width,
          height: size.height,
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {slug === "tractian" ? <TractianBoard /> : <PlificBoard />}
      </div>
    </div>
  );
}

function PlificBoard() {
  return (
    <>
      <div className="absolute left-[100px] top-[80px]">
        {/* eslint-disable-next-line @next/next/no-img-element -- raw SVG export is 2MB+; must bypass the Next.js image optimizer */}
        <img
          src="/images/projects-canvas/plific-desktop-board.svg"
          alt=""
          width={1567}
          height={3858}
          draggable={false}
          loading="lazy"
          className="select-none"
        />
      </div>
      <div className="absolute left-[1847px] top-[80px]">
        {/* eslint-disable-next-line @next/next/no-img-element -- raw SVG export is 2MB+; must bypass the Next.js image optimizer */}
        <img
          src="/images/projects-canvas/plific-mobile-board.svg"
          alt=""
          width={694}
          height={5340}
          draggable={false}
          loading="lazy"
          className="select-none"
        />
      </div>
    </>
  );
}

function TractianBoard() {
  return (
    <>
      <div className="absolute left-[100px] top-[80px]">
        {/* eslint-disable-next-line @next/next/no-img-element -- raw SVG export is 60MB+; must bypass the Next.js image optimizer */}
        <img
          src="/images/projects-canvas/tractian-desktop-board.svg"
          alt=""
          width={1300}
          height={540}
          draggable={false}
          loading="lazy"
          className="select-none"
        />
      </div>
      <div className="absolute left-[1480px] top-[80px]">
        {/* eslint-disable-next-line @next/next/no-img-element -- raw SVG export is 25MB+; must bypass the Next.js image optimizer */}
        <img
          src="/images/projects-canvas/tractian-mobile-board.svg"
          alt=""
          width={898}
          height={539}
          draggable={false}
          loading="lazy"
          className="select-none"
        />
      </div>
    </>
  );
}
