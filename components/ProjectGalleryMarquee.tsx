"use client";

import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";

export default function ProjectGalleryMarquee() {
    // Duplicate projects array to ensure seamless infinite scroll
    const sortedProjects = [...projects].sort((a, b) => Number(b.year) - Number(a.year));
    const marqueeItems = [...sortedProjects, ...sortedProjects, ...sortedProjects, ...sortedProjects];

    return (
        <section className="w-full bg-background py-8 md:py-12 overflow-hidden border-b border-dark/10">
            <div className="group flex whitespace-nowrap overflow-hidden select-none">
                <div className="flex gap-4 md:gap-8 items-center animate-marquee group-hover:[animation-play-state:paused]">
                    {marqueeItems.map((project, index) => (
                        <Link
                            href={`/portfolio/${project.slug}`}
                            key={`${project.slug}-${index}`}
                            className="relative w-64 h-40 md:w-80 md:h-52 shrink-0 rounded-lg overflow-hidden grayscale-0 md:grayscale md:hover:grayscale-0 transition-all duration-500 opacity-100 md:opacity-60 md:hover:opacity-100 border border-white/10 hover:border-primary/50"
                        >
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                                <span className="text-white font-bold uppercase text-sm tracking-wide">
                                    {project.title}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
                {/* Duplicate container for seamless loop if needed, but standard CSS marquee often uses two sets in one container or just a very long list. 
                    Let's stick to the single long text track if it's long enough, or duplicate the internal map if needed.
                    For a true CSS infinite scroll, we usually need two identical tracks.
                 */}
                <div className="flex gap-4 md:gap-8 items-center animate-marquee group-hover:[animation-play-state:paused] ml-4 md:ml-8" aria-hidden="true">
                    {marqueeItems.map((project, index) => (
                        <Link
                            href={`/portfolio/${project.slug}`}
                            key={`${project.slug}-${index}-duplicate`}
                            className="relative w-64 h-40 md:w-80 md:h-52 shrink-0 rounded-lg overflow-hidden grayscale-0 md:grayscale md:hover:grayscale-0 transition-all duration-500 opacity-100 md:opacity-60 md:hover:opacity-100 border border-white/10 hover:border-primary/50"
                        >
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                                <span className="text-white font-bold uppercase text-sm tracking-wide">
                                    {project.title}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
