type GtagEventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params?: GtagEventParams) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, params);
}
