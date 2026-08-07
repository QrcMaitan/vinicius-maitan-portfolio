"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { content, type Content, type Locale } from "./content";

type LocaleContextValue = {
  locale: Locale;
  toggleLocale: () => void;
  t: Content;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const toggleLocale = () => setLocale((current) => (current === "en" ? "pt" : "en"));

  return (
    <LocaleContext.Provider value={{ locale, toggleLocale, t: content[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside LocaleProvider");
  return ctx;
}
