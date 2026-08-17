"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useLocale } from "@/lib/locale-context";
import Reveal from "./Reveal";

function BlurredStagger({ text, active }: { text: string; active: boolean }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setShow(active));
    return () => cancelAnimationFrame(id);
  }, [active]);

  const words = text.split(" ");
  const nodes: ReactNode[] = [];
  let index = 0;

  words.forEach((word, wi) => {
    const wordStart = index;
    nodes.push(
      <span key={`w-${wi}`} className="inline-block whitespace-nowrap">
        {word.split("").map((char, ci) => (
          <span
            key={ci}
            style={{ transitionDelay: `${(wordStart + ci) * 7}ms` }}
            className={`inline-block transition-[opacity,filter] duration-300 ease-out ${
              show ? "opacity-100 blur-none" : "opacity-0 blur-[6px]"
            }`}
          >
            {char}
          </span>
        ))}
      </span>
    );
    index += word.length;
    if (wi < words.length - 1) {
      nodes.push(" ");
      index += 1;
    }
  });

  return <p className="max-w-md pb-6 text-sm leading-relaxed text-lg-subtitle">{nodes}</p>;
}

export default function FAQ() {
  const { t } = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-lg-background2 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex flex-col gap-12 md:flex-row md:items-end">
          <div className="flex-1">
            <Reveal>
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-lg-subtitle">
                {t.faq.eyebrow}
              </span>
              <h2 className="mt-2 font-display text-3xl font-normal md:text-4xl">{t.faq.title}</h2>
            </Reveal>

            <div className="mt-10">
              {t.faq.items.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                  <Reveal key={item.question} delay={i * 0.05}>
                    <div className={i > 0 ? "border-t border-hairline" : ""}>
                      <button
                        type="button"
                        data-cursor="link"
                        aria-expanded={isOpen}
                        onClick={() => setOpenIndex(isOpen ? null : i)}
                        className="group flex w-full items-center justify-between gap-6 py-5 text-left"
                      >
                        <span className="font-display text-lg text-lg-title transition-colors group-hover:text-lg-subtitle md:text-xl">
                          {item.question}
                        </span>
                        <span
                          aria-hidden
                          className={`shrink-0 text-lg-subtitle transition-[color,transform] duration-300 group-hover:text-lg-subtitle ${
                            isOpen ? "rotate-45" : ""
                          }`}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                              d="M8 2.5V13.5M2.5 8H13.5"
                              stroke="currentColor"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                      </button>
                      <div
                        className={`grid transition-[grid-template-rows] duration-400 ease-out ${
                          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <BlurredStagger text={item.answer} active={isOpen} />
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <Reveal delay={0.1} className="w-full shrink-0 rounded-2xl bg-lg-background p-6 md:w-[400px]">
            <div className="flex flex-col gap-0.5">
              <span className="font-display text-xl text-lg-title">{t.faq.callCard.eyebrow}</span>
              <span className="font-display text-2xl text-lg-subtitle">{t.faq.callCard.title}</span>
            </div>
            <p className="mt-4 text-base leading-relaxed text-lg-subtitle">{t.faq.callCard.description}</p>
            <a
              href="https://calendly.com/viniciusmaitan1/30min"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="mt-[18px] flex h-10 w-fit items-center gap-2 rounded-sm bg-blue-300 px-4 text-sm font-medium text-lg-background transition-opacity hover:opacity-85"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.4" />
                <path d="M3 8h14M7 2.5v3M13 2.5v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                <path
                  d="M7.5 12.5l1.5 1.5 3-3"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t.faq.callCard.buttonLabel}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
