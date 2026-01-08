import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import ProjectGalleryMarquee from "@/components/ProjectGalleryMarquee";

const ClientLogos = dynamic(() => import("@/components/ClientLogos"));
const StickyScrollSection = dynamic(() => import("@/components/StickyScrollSection"));
const ProjectGrid = dynamic(() => import("@/components/ProjectGrid"));
const Metrics = dynamic(() => import("@/components/Metrics"));
const Process = dynamic(() => import("@/components/Process"));
const SocialBento = dynamic(() => import("@/components/SocialBento"));
const Footer = dynamic(() => import("@/components/Footer"));

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
