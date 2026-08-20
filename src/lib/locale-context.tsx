"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { content, type Content, type Locale } from "./content";

type LocaleContextValue = {
  locale: Locale;
  toggleLocale: () => void;
  setLocale: (locale: Locale) => void;
  t: Content;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function syncLocaleQueryParam(locale: Locale) {
  const url = new URL(window.location.href);
  if (locale === "pt") {
    url.searchParams.set("lang", "pt");
  } else {
    url.searchParams.delete("lang");
  }
  window.history.replaceState(null, "", url);
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  // Read the ?lang= param once on mount so a shared link opens in that language.
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("lang");
    if (param === "pt") setLocaleState("pt");
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    syncLocaleQueryParam(locale);
  }, [locale]);

  const toggleLocale = () => setLocaleState((current) => (current === "en" ? "pt" : "en"));

  return (
    <LocaleContext.Provider value={{ locale, toggleLocale, setLocale: setLocaleState, t: content[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside LocaleProvider");
  return ctx;
}
