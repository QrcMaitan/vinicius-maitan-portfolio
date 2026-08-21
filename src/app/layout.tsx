import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Serif_Text } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { LocaleProvider } from "@/lib/locale-context";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
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

const dmSerifText = DM_Serif_Text({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const SITE_URL = "https://viniciusmaitan.vercel.app";

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
      className={`${geistSans.variable} ${geistMono.variable} ${dmSerifText.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-lg-background text-lg-title">
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-1Y5F0HBRTD" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1Y5F0HBRTD');
          `}
        </Script>
        <LocaleProvider>
          <Cursor />
          <SmoothScroll>
            <Preloader />
            <Header />
            <PageTransition>{children}</PageTransition>
            <ContactFooter />
          </SmoothScroll>
        </LocaleProvider>
      </body>
    </html>
  );
}
