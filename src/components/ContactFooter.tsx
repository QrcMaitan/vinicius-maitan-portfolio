"use client";

import { useLocale } from "@/lib/locale-context";
import Reveal from "./Reveal";

export default function ContactFooter() {
  const { t } = useLocale();

  const links = [
    { label: t.contact.whatsappLabel, value: t.contact.whatsapp, href: `https://wa.me/${t.contact.whatsapp.replace(/\D/g, "")}` },
    { label: t.contact.emailLabel, value: t.contact.email, href: `mailto:${t.contact.email}` },
    { label: t.contact.linkedinLabel, value: t.contact.linkedin, href: `https://${t.contact.linkedin}` },
  ];

  return (
    <footer id="contact" className="bg-carbon py-24 text-chalk md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <span className="font-mono text-xs uppercase tracking-[0.08em] text-chalk-soft">
          {t.contact.eyebrow}
        </span>

        <div className="mt-6 flex flex-col justify-between gap-12 md:flex-row md:items-end">
          <Reveal>
            <h2 className="max-w-md font-display text-4xl italic font-normal leading-tight md:text-5xl">
              {t.contact.title}
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="flex flex-col gap-3 font-mono text-sm md:items-end">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    data-cursor="link"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-baseline gap-3 text-chalk-soft transition-colors hover:text-chalk md:justify-end"
                  >
                    <span className="uppercase tracking-[0.05em] text-steel-soft">{link.label}</span>
                    <span>{link.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-20 flex flex-col gap-2 border-t border-hairline-dark pt-6 font-mono text-[11px] uppercase tracking-[0.05em] text-chalk-soft md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Vinicius Maitan</span>
          <span>Senior Product Designer</span>
        </div>
      </div>
    </footer>
  );
}
