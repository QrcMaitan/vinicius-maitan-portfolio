import Hero from "@/components/Hero";
import CrossPlatform from "@/components/CrossPlatform";
import LatestProjects from "@/components/LatestProjects";
import Experience from "@/components/Experience";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <CrossPlatform />
      <LatestProjects />
      <Experience />
    </main>
  );
}
