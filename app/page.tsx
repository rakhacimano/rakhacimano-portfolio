import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import StickyScrollSection from "@/components/StickyScrollSection";
import ProjectGrid from "@/components/ProjectGrid";
import Metrics from "@/components/Metrics";
import Process from "@/components/Process";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Marquee />
      <StickyScrollSection />
      <Process />
      <ProjectGrid />
      <Metrics />
      <Footer />
    </div>
  );
}
