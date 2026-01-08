import Hero from "@/components/Hero";
import ProjectGalleryMarquee from "@/components/ProjectGalleryMarquee";
import ClientLogos from "@/components/ClientLogos";
import StickyScrollSection from "@/components/StickyScrollSection";
import ProjectGrid from "@/components/ProjectGrid";
import Metrics from "@/components/Metrics";
import Process from "@/components/Process";
import SocialBento from "@/components/SocialBento";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <ProjectGalleryMarquee />
      <StickyScrollSection />
      <Process />
      <ProjectGrid />
      <ClientLogos />
      <Metrics />
      <SocialBento />
      <Footer />
    </div>
  );
}
