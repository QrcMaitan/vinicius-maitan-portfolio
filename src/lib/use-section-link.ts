"use client";

import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { useLenis } from "@/components/SmoothScroll";

/**
 * Smoothly scrolls same-page section links (e.g. "/#experience", "/") through
 * Lenis instead of the browser's instant hash jump. Links to other routes,
 * or clicks while Lenis isn't available (reduced motion), fall through to
 * the default Next.js navigation.
 */
export function useSectionLinkClick() {
  const lenis = useLenis();
  const pathname = usePathname();

  return (href: string) => (e: MouseEvent) => {
    if (!lenis || pathname !== "/") return;

    const hashIndex = href.indexOf("#");
    if (hashIndex === -1) {
      if (href !== "/") return;
      e.preventDefault();
      lenis.scrollTo(0);
      return;
    }

    const hash = href.slice(hashIndex);
    const target = document.querySelector(hash);
    if (!target) return;

    e.preventDefault();
    lenis.scrollTo(target as HTMLElement);
    history.pushState(null, "", hash);
  };
}
