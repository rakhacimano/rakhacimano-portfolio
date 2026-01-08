import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, TickCircle, Kanban, PenTool, Chart } from "iconsax-react";
import * as Motion from "framer-motion";

export function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

// Client component wrapper for Framer Motion if needed, but we can access motion directly if we mark file as use client or use simple CSS.
// However, since we need async params, the page must be a Server Component. 
// We will use a separate client component for the animated sections OR use simple classes + maybe a client wrapper.
// Actually, let's keep it simple: The page is Server Component, but we can't use Framer Motion directly on server components if we want interactive scroll.
// We'll make a Client Component for the content parts.

// Wait, the previous file was already using standard HTML/CSS mostly.
// To make it "scrollytelling" with "nice page detail", let's create a Client Component for the content.
import ProjectContent from "@/components/ProjectDetailContent";

export default async function ProjectDetail(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const project = projects.find((p) => p.slug === params.slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="bg-dark min-h-screen p-0 m-0 overflow-x-hidden text-white">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-10 flex justify-between items-center text-white/90">
                <Link href="/portfolio" className="flex items-center gap-2 hover:text-primary transition-colors uppercase font-bold tracking-widest text-sm group">
                    <ArrowLeft size="20" className="group-hover:-translate-x-1 transition-transform" color="currentColor" variant="Outline" />
                    Back to Portfolio
                </Link>
                <span className="font-mono text-sm hidden md:block">{project.client}</span>
            </nav>

            <ProjectContent project={project} />

            {/* Footer Nav */}
            <div className="py-20 px-6 border-t border-white/10 text-center bg-dark">
                <p className="text-gray-400 uppercase tracking-widest text-xs mb-4">Next Steps</p>
                <Link href="/portfolio" className="inline-flex items-center gap-2 text-4xl md:text-6xl font-black uppercase tracking-tighter hover:text-primary transition-colors group text-white">
                    View All Projects
                    <ArrowRight size="40" className="group-hover:translate-x-4 transition-transform" variant="Bold" />
                </Link>
            </div>
        </main>
    );
}
