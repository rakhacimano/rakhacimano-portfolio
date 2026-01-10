import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProjectContent from "@/components/ProjectDetailContent";
import { Metadata } from "next";

// Force dynamic rendering to ensure fresh data
export const dynamic = "force-dynamic";

async function getProject(slug: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/projects/${slug}`, {
            cache: 'no-store'
        });
        if (!res.ok) return null;
        return res.json();
    } catch (e) {
        console.error("Failed to fetch project", e);
        return null;
    }
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    const project = await getProject(params.slug);

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    return {
        title: project.title,
        description: project.description,
        openGraph: {
            title: project.title,
            description: project.description,
            images: [project.cover_image || project.image || '/placeholder-project.jpg'],
        },
    };
}

export default async function ProjectDetail(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const project = await getProject(params.slug);

    if (!project) {
        notFound();
    }

    // Map DB fields to Component expectations if needed
    // ProjectContent likely expects: title, description, content, tags, links (repo, demo)
    // DB has: title, description, content, techStack (tags), repoUrl, demoUrl
    const mappedProject = {
        ...project,
        image: project.cover_image || project.image, // Ensure image is present
        tags: project.techStack || project.tags || [],
        client: project.client || "Personal Project" // DB might not have client field yet
    };

    return (
        <main className="bg-dark min-h-screen p-0 m-0 overflow-x-hidden text-white">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-10 flex justify-between items-center text-white/90">
                <Link href="/portfolio" className="flex items-center gap-2 hover:text-primary transition-colors uppercase font-bold tracking-widest text-sm group">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" color="currentColor" />
                    Back to Portfolio
                </Link>
                <span className="font-mono text-sm hidden md:block">{mappedProject.client}</span>
            </nav>

            <ProjectContent project={mappedProject} />

            {/* Footer Nav */}
            <div className="py-20 px-6 border-t border-white/10 text-center bg-dark">
                <p className="text-gray-400 uppercase tracking-widest text-xs mb-4">Next Steps</p>
                <Link href="/portfolio" className="inline-flex items-center gap-2 text-4xl md:text-6xl font-black uppercase tracking-tighter hover:text-primary transition-colors group text-white">
                    View All Projects
                    <ArrowRight size={40} className="group-hover:translate-x-4 transition-transform" />
                </Link>
            </div>
        </main>
    );
}
