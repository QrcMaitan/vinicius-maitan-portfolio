import { notFound } from "next/navigation";
import { content } from "@/lib/content";
import CaseStudyView from "@/components/CaseStudyView";

export function generateStaticParams() {
  return content.en.projects.items.map((project) => ({ slug: project.slug }));
}

export default async function CaseStudyPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const exists = content.en.projects.items.some((project) => project.slug === slug);
  if (!exists) notFound();

  return <CaseStudyView slug={slug} />;
}
