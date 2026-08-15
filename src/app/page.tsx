import Hero from "@/components/Hero";
import CrossPlatform from "@/components/CrossPlatform";
import Experience from "@/components/Experience";
import FeaturedProjects from "@/components/FeaturedProjects";
import Tools from "@/components/Tools";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <CrossPlatform />
      <FeaturedProjects />
      <Experience />
      <Tools />
      <FAQ />
    </main>
  );
}
