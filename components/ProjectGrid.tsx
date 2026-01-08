"use client";

import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { ArrowRight } from "iconsax-react";

export default function ProjectGrid() {
    return (
        <section id="work" className="w-full bg-background py-24 md:py-32 px-6 md:px-10 border-t border-dark/10">
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
                        href={`/work/${project.slug}`}
                        className="group flex flex-col gap-6"
                    >
                        {/* Image Container */}
                        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Overlay Button */}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full font-bold uppercase tracking-wide text-sm flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    View Project
                                    <ArrowRight size="16" variant="Bold" />
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
                                <span>{project.year}</span>
                                <span className="w-1 h-1 bg-gray-400 rounded-full" />
                                <span>{project.category}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
