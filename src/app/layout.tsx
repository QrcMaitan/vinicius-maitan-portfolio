import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/lib/locale-context";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Header from "@/components/Header";
import ContactFooter from "@/components/ContactFooter";
import PageTransition from "@/components/PageTransition";
import { content } from "@/lib/content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const SITE_URL = "https://vinicius-maitan-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: content.en.meta.title,
  description: content.en.meta.description,
  openGraph: {
    title: content.en.meta.title,
    description: content.en.meta.description,
    url: SITE_URL,
    siteName: content.en.hero.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: content.en.meta.title,
    description: content.en.meta.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bone text-ink">
        <LocaleProvider>
          <Cursor />
          <SmoothScroll>
            <Header />
            <PageTransition>{children}</PageTransition>
            <ContactFooter />
          </SmoothScroll>
        </LocaleProvider>
      </body>
    </html>
  );
}
