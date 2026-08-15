"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale } from "@/lib/locale-context";
import { useSectionLinkClick } from "@/lib/use-section-link";
import { useLenis } from "./SmoothScroll";
import Reveal from "./Reveal";

function easeOutCubic(t: number) {
  const clamped = Math.min(1, Math.max(0, t));
  return 1 - (1 - clamped) ** 3;
}

export default function ContactFooter() {
  const { t, locale, toggleLocale } = useLocale();
  const handleSectionLink = useSectionLinkClick();
  const lenis = useLenis();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });
  const topShadow = useTransform(
    scrollYProgress,
    (p) => `inset 0 24px 30px -20px rgba(0,0,0,${(0.4 * (1 - easeOutCubic(p))).toFixed(3)})`
  );

  const links = [
    {
      icon: "/images/contact/whatsapp-icon.svg",
      iconLight: "/images/contact/whatsapp-icon-light.svg",
      label: t.contact.whatsappLabel,
      value: t.contact.whatsapp,
      href: `https://wa.me/${t.contact.whatsapp.replace(/\D/g, "")}`,
    },
    {
      icon: "/images/contact/email-icon.svg",
      iconLight: "/images/contact/email-icon-light.svg",
      label: t.contact.emailLabel,
      value: t.contact.email,
      href: `mailto:${t.contact.email}`,
    },
    {
      icon: "/images/contact/linkedin-icon.svg",
      iconLight: "/images/contact/linkedin-icon-light.svg",
      label: t.contact.linkedinLabel,
      value: t.contact.linkedin,
      href: `https://${t.contact.linkedin}`,
    },
  ];
  const pillOrder = [links[1], links[2], links[0]];

  const pageLinksCol1 = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.projects, href: "/#projects" },
    { label: t.nav.experience, href: "/#experience" },
  ];
  const pageLinksCol2 = [
    { label: t.faq.eyebrow, href: "/#faq" },
    { label: t.nav.contact, href: "/#contact" },
  ];

  return (
    <>
      <motion.section
        ref={sectionRef}
        id="contact"
        data-scroll-snap
        data-cursor-theme="dark"
        style={{ boxShadow: topShadow }}
        className="relative overflow-hidden bg-dk-background text-dk-title"
      >
        <div className="relative flex min-h-screen items-center py-24 md:py-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            draggable={false}
            className="pointer-events-none absolute inset-0 size-full object-cover"
            poster="/images/contact/portrait-poster.jpg"
          >
            <source src="/videos/contact-portrait.mp4" type="video/mp4" />
          </video>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-dk-background via-dk-background/40 to-transparent" />

          <div className="relative mx-auto w-full max-w-6xl px-6 md:px-10">
            <div className="flex max-w-xl flex-col items-start gap-6">
              <Reveal>
                <h2 className="font-display text-4xl font-normal leading-tight md:text-5xl">
                  {t.contact.title}
                </h2>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="max-w-md text-base leading-relaxed text-dk-subtitle">{t.contact.subtitle}</p>
              </Reveal>

              <Reveal delay={0.1} className="w-full">
                <div className="flex flex-col items-start gap-[22px]">
                  {pillOrder.map((link) => (
                    <a
                      key={link.label}
                      data-cursor="link"
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 rounded-full bg-white/15 px-4 py-2 shadow-[0px_1px_4px_rgba(54,60,68,0.1)] backdrop-blur-sm transition-colors hover:bg-white/25"
                    >
                      <img src={link.iconLight} alt="" width={24} height={24} draggable={false} className="shrink-0" />
                      <span className="text-base text-dk-title">{link.value}</span>
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </motion.section>

      <footer data-cursor-theme="dark" className="relative -mt-10 overflow-hidden rounded-t-[32px] bg-dk-background pt-20 pb-16 text-dk-title">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-140px] h-[300px] w-[781px] -translate-x-1/2 opacity-40 blur-3xl"
          style={{ backgroundImage: "radial-gradient(closest-side, var(--blue-100), transparent)" }}
        />
        <div className="relative mx-auto max-w-6xl px-6 md:px-11">
          <div className="flex flex-col gap-6">
            <Reveal>
              <div className="flex flex-wrap items-start gap-8">
                <span className="font-display text-3xl text-lg-title md:w-[400px] md:shrink-0">
                  Vinicius Maitan
                </span>
                <div className="flex flex-wrap gap-16 md:gap-24">
                  <FooterColumn heading={t.contact.footer.contactHeading}>
                    <a
                      data-cursor="link"
                      href={links[1].href}
                      className="break-words text-sm text-dk-subtitle transition-colors hover:text-dk-title"
                    >
                      {links[1].value}
                    </a>
                    <a
                      data-cursor="link"
                      href={links[0].href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-words text-sm text-dk-subtitle transition-colors hover:text-dk-title"
                    >
                      {links[0].value}
                    </a>
                  </FooterColumn>

                  <FooterColumn heading={t.contact.footer.socialHeading}>
                    <a
                      data-cursor="link"
                      href={links[2].href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-dk-subtitle transition-colors hover:text-dk-title"
                    >
                      {links[2].label}
                    </a>
                  </FooterColumn>
                </div>
              </div>
            </Reveal>

            <div className="border-t border-hairline-dark" />

            <Reveal delay={0.05}>
              <div className="flex flex-wrap items-start gap-8">
                <button
                  data-cursor="link"
                  onClick={() =>
                    lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="flex items-center gap-3 text-sm text-dk-subtitle transition-colors hover:text-dk-title md:w-[400px] md:shrink-0"
                >
                  <img src="/images/contact/back-to-top-icon.svg" alt="" width={16} height={26} draggable={false} />
                  {t.contact.footer.backToTop}
                </button>

                <div className="flex flex-wrap gap-16 md:gap-24">
                  <FooterColumn heading={t.contact.footer.pagesHeading}>
                    <div className="flex gap-8">
                      <ul className="flex flex-col gap-4">
                        {pageLinksCol1.map((link) => (
                          <li key={link.label}>
                            <Link
                              data-cursor="link"
                              href={link.href}
                              onClick={handleSectionLink(link.href)}
                              className="text-sm text-dk-subtitle transition-colors hover:text-dk-title"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <ul className="flex flex-col gap-4">
                        {pageLinksCol2.map((link) => (
                          <li key={link.label}>
                            <Link
                              data-cursor="link"
                              href={link.href}
                              onClick={handleSectionLink(link.href)}
                              className="text-sm text-dk-subtitle transition-colors hover:text-dk-title"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </FooterColumn>

                  <FooterColumn heading={t.contact.footer.languageHeading}>
                    <button
                      data-cursor="link"
                      onClick={toggleLocale}
                      className="flex items-center gap-1.5 border-b border-hairline-dark pb-1 text-sm text-dk-subtitle transition-colors hover:text-dk-title"
                    >
                      {locale === "en" ? "English" : "Português"}
                      <img src="/images/contact/chevron-icon.svg" alt="" width={14} height={14} draggable={false} />
                    </button>
                  </FooterColumn>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </footer>
    </>
  );
}

function FooterColumn({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-xs uppercase tracking-[0.05em] text-dk-subtitle/70">{heading}</span>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}
