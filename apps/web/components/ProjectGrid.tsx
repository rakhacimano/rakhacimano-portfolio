"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api";

interface Project {
    id: string;
    slug: string;
    title: string;
    description: string;
    cover_image: string;
    thumbnail: string;
    category?: string;
    published?: boolean;
    created_at?: string;
    // Map backend fields to frontend if needed
    image?: string;
    year?: string;
}

export default function ProjectGrid() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await fetchAPI('/projects');
                // Filter only published projects and recent ones
                const publishedProjects = data.filter((p: Project) => p.published !== false);
                setProjects(publishedProjects);
            } catch (error) {
                console.error("Failed to fetch projects:", error);
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, []);

    // Placeholder skeleton or loading state
    if (loading) {
        return (
            <section id="portfolio" className="w-full bg-background py-24 md:py-32 px-6 md:px-10 border-t border-dark/10">
                <div className="mb-16">
                    <div className="h-16 w-64 bg-gray-200 rounded animate-pulse mb-6" />
                    <div className="h-6 w-96 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 md:gap-y-24">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex flex-col gap-6">
                            <div className="aspect-[4/3] bg-gray-200 rounded-2xl animate-pulse" />
                            <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse" />
                            <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section id="portfolio" className="w-full bg-background py-24 md:py-32 px-6 md:px-10 border-t border-dark/10">
            <div className="mb-16">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
                    Projects
                </h2>
                <p className="text-xl text-gray-500 max-w-2xl">
                    Selected outcomes from my recent design and development.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 md:gap-y-24">
                {projects.map((project, index) => (
                    <Link
                        key={project.slug}
                        href={`/portfolio/${project.slug}`}
                        className="group flex flex-col gap-6"
                    >
                        {/* Image Container */}
                        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
                            <Image
                                src={project.cover_image || project.image || '/placeholder-project.jpg'}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Overlay Button - Hidden on mobile, visible on desktop hover */}
                            <div className="hidden md:flex absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center">
                                <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full font-bold uppercase tracking-wide text-sm flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    View Project
                                    <ArrowRight size={16} />
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-start">
                                <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>
                                <ArrowRight
                                    size="24"
                                    className="text-dark/30 group-hover:text-primary transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1"
                                />
                            </div>

                            <p className="text-gray-600 line-clamp-1 text-base">
                                {project.description}
                            </p>

                            <div className="flex items-center gap-2 text-sm font-medium text-gray-400 mt-1 uppercase tracking-wide">
                                <span>{new Date(project.created_at || Date.now()).getFullYear()}</span>
                                {project.category && (
                                    <>
                                        <span className="w-1 h-1 bg-gray-400 rounded-full" />
                                        <span>{project.category}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
