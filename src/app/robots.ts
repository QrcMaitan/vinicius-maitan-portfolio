import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://vinicius-maitan-portfolio.vercel.app/sitemap.xml",
  };
}
