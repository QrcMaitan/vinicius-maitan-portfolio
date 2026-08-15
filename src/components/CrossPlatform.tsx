"use client";

import Image from "next/image";
import { useLocale } from "@/lib/locale-context";
import Reveal from "./Reveal";

const CARD_IMAGES = [
  "/images/cross-platform/desktop.png",
  "/images/cross-platform/mobile.png",
  "/images/cross-platform/web.png",
];

export default function CrossPlatform() {
  const { t } = useLocale();

  return (
    <section
      id="cross-platform"
      data-scroll-snap
      className="flex min-h-screen flex-col justify-center border-b border-hairline bg-lg-background2"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-24 md:px-10 md:py-24">
        <Reveal className="mx-auto mb-10 flex max-w-xl flex-col items-center gap-3 text-center md:mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-lg-subtitle">
            {t.cross.eyebrow}
          </span>
          <h2 className="font-display text-3xl font-normal md:text-4xl">{t.cross.title}</h2>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-3">
          {t.cross.items.map((item, i) => (
            <Reveal key={item.tag} delay={i * 0.06} className="flex flex-col gap-6">
              <div className="relative aspect-[352/356] w-full overflow-hidden rounded-2xl">
                <Image
                  src={CARD_IMAGES[i]}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  draggable={false}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-2xl text-lg-title">{item.title}</h3>
                <p className="text-lg leading-relaxed text-lg-subtitle">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
