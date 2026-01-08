import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { notFound } from "next/navigation";
import { ArrowLeft } from "iconsax-react";

export function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export default function ProjectDetail({ params }: { params: { slug: string } }) {
    const project = projects.find((p) => p.slug === params.slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="bg-white min-h-screen">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-10 flex justify-between items-center mix-blend-difference text-white">
                <Link href="/#work" className="flex items-center gap-2 hover:text-primary transition-colors uppercase font-bold tracking-widest text-sm">
                    <ArrowLeft size="20" />
                    Back to Home
                </Link>
                <span className="font-mono text-sm">{project.client}</span>
            </nav>

            {/* Hero Image */}
            <header className="relative w-full h-[70vh] md:h-[80vh]">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-4">
                            {project.title}
                        </h1>
                        <div className="flex flex-wrap gap-8 text-white/80 font-mono text-sm uppercase tracking-widest">
                            <span>{project.category}</span>
                            <span>{project.year}</span>
                            <span>{project.role}</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content */}
            <section className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-16 md:gap-32">
                    <div className="md:w-1/3">
                        <h2 className="text-2xl font-bold uppercase mb-4">The Challenge</h2>
                    </div>
                    <div className="md:w-2/3">
                        <p className="text-xl md:text-2xl leading-relaxed font-light text-gray-800">
                            {project.description}
                        </p>
                        <div className="mt-12 p-6 bg-gray-50 border-l-4 border-primary">
                            <span className="block font-mono text-xs uppercase text-gray-400 mb-2">Outcome</span>
                            <p className="text-3xl font-black text-dark">{project.result}</p>
                        </div>
                    </div>
                </div>

                {/* Gallery */}
                <div className="mt-32 flex flex-col gap-8 md:gap-16">
                    {project.gallery.map((img, index) => (
                        <div key={index} className="relative w-full aspect-video md:aspect-[21/9] bg-gray-100">
                            <Image
                                src={img}
                                alt={`${project.title} gallery ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer Nav */}
            <div className="py-12 px-6 border-t border-black/10 text-center">
                <Link href="/#work" className="inline-block text-lg font-bold uppercase tracking-widest hover:text-primary transition-colors">
                    View All Projects
                </Link>
            </div>
        </main>
    );
}
