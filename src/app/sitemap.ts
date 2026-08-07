import type { MetadataRoute } from "next";
import { content } from "@/lib/content";

const BASE_URL = "https://viniciusmaitan.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectRoutes = content.en.projects.items.map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: new Date(),
  }));

  return [{ url: BASE_URL, lastModified: new Date() }, ...projectRoutes];
}
