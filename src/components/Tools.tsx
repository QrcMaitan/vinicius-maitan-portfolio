"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "@/lib/locale-context";
import Reveal from "./Reveal";

// iOS-style "Icon Fly-In" / zoom transition: the whole icon grid scales up
// from the center, as if flying toward the viewer along the Z-axis, rather
// than each icon animating independently.
const appsGridVariants = {
  hidden: { opacity: 0, scale: 0.55 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 28, mass: 0.9 },
  },
  exit: {
    opacity: 0,
    scale: 1.4,
    transition: { duration: 0.28, ease: "easeIn" as const },
  },
};

type ToolApp = { name: string; icon: string };
type ToolFolderKey = "designAi" | "researchTests" | "documentation" | "vibeCoding" | "productDeploy";
type ToolFolder = {
  id: string;
  labelKey: ToolFolderKey;
  icon: string;
  background: string;
  apps: ToolApp[];
};

const FOLDERS: ToolFolder[] = [
  {
    id: "design-ai",
    labelKey: "designAi",
    icon: "/images/tools/sidebar-pen-tool.svg",
    background: "/images/tools/backgrounds/bg-design-ai.jpg",
    apps: [
      { name: "Figma", icon: "/images/tools/apps/app-figma.svg" },
      { name: "Gemini", icon: "/images/tools/apps/app-gemini.svg" },
      { name: "Nano Banana", icon: "/images/tools/apps/app-nano-banana.svg" },
      { name: "Whisk", icon: "/images/tools/apps/app-whisk.svg" },
      { name: "Midjourney", icon: "/images/tools/apps/app-midjourney.svg" },
    ],
  },
  {
    id: "research-tests",
    labelKey: "researchTests",
    icon: "/images/tools/sidebar-search.svg",
    background: "/images/tools/backgrounds/bg-research.jpg",
    apps: [
      { name: "Google Forms", icon: "/images/tools/apps/app-google-forms.svg" },
      { name: "Power BI", icon: "/images/tools/apps/app-power-bi.svg" },
      { name: "Excel", icon: "/images/tools/apps/app-excel.svg" },
      { name: "TestFly", icon: "/images/tools/apps/app-testfly.svg" },
      { name: "Metabase", icon: "/images/tools/apps/app-metabase.svg" },
      { name: "PostHog", icon: "/images/tools/apps/app-posthog.svg" },
      { name: "Typeform", icon: "/images/tools/apps/app-typeform.svg" },
      { name: "Tally", icon: "/images/tools/apps/app-tally.svg" },
    ],
  },
  {
    id: "documentation",
    labelKey: "documentation",
    icon: "/images/tools/sidebar-file.svg",
    background: "/images/tools/backgrounds/bg-documentation.jpg",
    apps: [
      { name: "Miro", icon: "/images/tools/apps/app-miro.svg" },
      { name: "Notion", icon: "/images/tools/apps/app-notion.svg" },
      { name: "FigJam", icon: "/images/tools/apps/app-figjam.svg" },
      { name: "Confluence", icon: "/images/tools/apps/app-confluence.svg" },
    ],
  },
  {
    id: "vibe-coding",
    labelKey: "vibeCoding",
    icon: "/images/tools/sidebar-code.svg",
    background: "/images/tools/backgrounds/bg-vibe-coding.jpg",
    apps: [
      { name: "Claude", icon: "/images/tools/apps/app-claude.svg" },
      { name: "Codex", icon: "/images/tools/apps/app-codex.svg" },
      { name: "Figma Make", icon: "/images/tools/apps/app-figma-make.svg" },
    ],
  },
  {
    id: "product-deploy",
    labelKey: "productDeploy",
    icon: "/images/tools/sidebar-globe.svg",
    background: "/images/tools/backgrounds/bg-product-deploy.jpg",
    apps: [
      { name: "GitHub", icon: "/images/tools/apps/app-github.svg" },
      { name: "PostHog", icon: "/images/tools/apps/app-posthog.svg" },
      { name: "Vercel", icon: "/images/tools/apps/app-vercel.svg" },
      { name: "TestFly", icon: "/images/tools/apps/app-testfly.svg" },
      { name: "Figma Site", icon: "/images/tools/apps/app-figma-site.svg" },
    ],
  },
];

// Flat, deduped list of every tool across folders, in the order the mobile
// "all apps" grid presents them — mobile has no room for the folder sidebar,
// so it shows everything at once instead of switching between folders.
const ALL_APPS: ToolApp[] = (() => {
  const byName = new Map<string, ToolApp>();
  for (const folder of FOLDERS) {
    for (const app of folder.apps) {
      if (!byName.has(app.name)) byName.set(app.name, app);
    }
  }
  const order = [
    "Figma",
    "Claude",
    "TestFly",
    "Nano Banana",
    "Vercel",
    "PostHog",
    "GitHub",
    "Codex",
    "Figma Make",
    "Miro",
    "Notion",
    "FigJam",
    "Confluence",
    "Power BI",
    "Whisk",
    "Tally",
    "Figma Site",
    "Metabase",
    "Typeform",
    "Gemini",
    "Midjourney",
    "Excel",
    "Google Forms",
  ];
  return order.map((name) => byName.get(name)).filter((app): app is ToolApp => Boolean(app));
})();

export default function Tools() {
  const { t } = useLocale();
  const [activeId, setActiveId] = useState(FOLDERS[0].id);
  const active = FOLDERS.find((folder) => folder.id === activeId) ?? FOLDERS[0];

  return (
    <section data-scroll-snap className="border-b border-hairline bg-lg-background">
      <div className="mx-auto flex h-screen min-h-[700px] max-w-6xl flex-col px-6 pt-24 pb-10 md:px-10 md:pt-32 md:pb-12">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-lg-subtitle">{t.tools.eyebrow}</span>
          <h2 className="mt-2 font-display text-3xl font-normal md:text-4xl">{t.tools.title}</h2>
        </Reveal>

        <div className="relative mt-12 min-h-0 flex-1">
          <div className="absolute top-[46px] right-[22px] bottom-0 left-0 rounded-xl bg-white" />

          <div className="absolute top-0 right-0 bottom-[22px] left-[22px] overflow-hidden rounded-xl border border-white bg-[#f5f5f5] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.1)]">
            <div className="flex h-[58px] shrink-0 items-center gap-3 border-b border-[#e5e7eb] bg-[#f3f4f6] px-4">
              <div className="flex items-center gap-2.5">
                <span className="size-[11px] rounded-full bg-[#c0c0c0]" />
                <span className="size-[11px] rounded-full bg-[#c0c0c0]" />
                <span className="size-[11px] rounded-full bg-[#c0c0c0]" />
              </div>
              <img src="/images/tools/chrome-divider.svg" alt="" className="h-5 shrink-0" draggable={false} />
              <div className="flex h-[34px] w-[220px] shrink-0 items-center gap-2 rounded-md bg-[rgba(234,234,234,0.9)] px-3">
                <img src="/images/tools/chrome-search.svg" alt="" className="size-3.5 shrink-0" draggable={false} />
                <span className="text-xs text-[#959595]">{t.tools.searchLabel}</span>
              </div>
            </div>

            <div className="flex h-[calc(100%-58px)]">
              <div className="hidden w-[290px] shrink-0 flex-col overflow-y-auto bg-white md:flex">
                <div className="flex shrink-0 items-center justify-between border-b border-[#f5f5f5] px-3.5 py-2.5">
                  <span className="text-sm font-medium text-[rgba(17,17,17,0.9)]">{t.tools.foldersLabel}</span>
                  <img src="/images/tools/chrome-sidebar-toggle.svg" alt="" className="size-4 shrink-0" draggable={false} />
                </div>
                <nav className="flex flex-col">
                  {FOLDERS.map((folder) => {
                    const isActive = folder.id === activeId;
                    return (
                      <motion.button
                        key={folder.id}
                        type="button"
                        data-cursor="link"
                        aria-pressed={isActive}
                        onClick={() => setActiveId(folder.id)}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className={`flex items-center gap-3 border-b border-[#e5e7eb] px-3.5 py-[11px] text-left text-sm text-[rgba(17,17,17,0.9)] transition-colors ${
                          isActive ? "bg-[rgba(17,17,17,0.03)] font-medium" : "font-normal hover:bg-[rgba(17,17,17,0.03)]"
                        }`}
                      >
                        <img src={folder.icon} alt="" className="size-5 shrink-0" draggable={false} />
                        <span className="flex-1">{t.tools.folders[folder.labelKey]}</span>
                        {isActive && (
                          <img src="/images/tools/sidebar-check.svg" alt="" className="size-5 shrink-0" draggable={false} />
                        )}
                      </motion.button>
                    );
                  })}
                </nav>
              </div>

              <div className="relative hidden flex-1 overflow-hidden md:block">
                <AnimatePresence>
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={active.background}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 60vw, 100vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-white/[0.06] backdrop-blur-[5px]" />
                <AnimatePresence>
                  <motion.div
                    key={active.id}
                    variants={appsGridVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="absolute inset-0 overflow-y-auto p-6"
                  >
                    <div className="mx-auto flex h-full max-w-[560px] flex-wrap content-center items-center justify-center gap-x-9 gap-y-8">
                      {active.apps.map((app) => (
                        <div key={app.name} className="flex flex-col items-center gap-2">
                          <img
                            src={app.icon}
                            alt=""
                            width={66}
                            height={66}
                            draggable={false}
                            className="size-[66px] shrink-0"
                          />
                          <span className="text-[13px] font-medium text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.4)]">
                            {app.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Mobile: the sidebar's 290px minimum doesn't fit narrow viewports, so
                  instead of folder-switching, show every tool flattened into one
                  scrollable iOS-style app grid. */}
              <div className="relative flex-1 overflow-hidden md:hidden">
                <Image src={FOLDERS[0].background} alt="" fill sizes="100vw" className="object-cover" />
                <div className="absolute inset-0 bg-white/[0.06] backdrop-blur-[5px]" />
                <div className="absolute inset-0 overflow-y-auto p-6">
                  <div className="mx-auto flex max-w-[420px] flex-wrap content-start justify-center gap-x-6 gap-y-5">
                    {ALL_APPS.map((app) => (
                      <div key={app.name} className="flex w-[68px] flex-col items-center gap-2">
                        <img
                          src={app.icon}
                          alt=""
                          width={58}
                          height={58}
                          draggable={false}
                          className="size-[58px] shrink-0"
                        />
                        <span className="text-center text-[12px] font-medium leading-tight text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.4)]">
                          {app.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex shrink-0 items-center justify-end gap-2 text-xs text-lg-title">
          <span className="hidden md:inline">{t.tools.folderHint}</span>
          <span aria-hidden className="hidden md:inline">
            &bull;
          </span>
          <span>{t.tools.tapHint}</span>
        </div>
      </div>
    </section>
  );
}
