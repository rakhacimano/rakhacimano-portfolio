"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { ArrowRight, SearchNormal1 } from "iconsax-react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";

export default function PortfolioPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Extract unique categories
    const categories = useMemo(() => {
        const cats = new Set(projects.map(p => p.category));
        return ["All", ...Array.from(cats)];
    }, []);

    // Filter projects
    const filteredProjects = useMemo(() => {
        return projects.filter(project => {
            const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;

            return matchesSearch && matchesCategory;
        }).sort((a, b) => Number(b.year) - Number(a.year));
    }, [searchQuery, selectedCategory]);

    return (
        <main className="bg-background min-h-screen pt-32">
            <section className="px-6 md:px-10 mb-12">
                <div className="max-w-7xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-12"
                    >
                        Selected <span className="text-primary">Work</span>
                    </motion.h1>

                    {/* Controls */}
                    <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center mb-16 border-b border-white/10 pb-8">
                        {/* Categories */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide transition-all border ${selectedCategory === category
                                        ? "bg-white text-dark border-white"
                                        : "bg-transparent text-gray-400 border-white/20 hover:border-white hover:text-white"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Search */}
                        <div className="relative w-full md:w-64">
                            <SearchNormal1 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size="20" />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-dark/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project) => (
                                <motion.div
                                    key={project.slug}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Link
                                        href={`/portfolio/${project.slug}`}
                                        className="group flex flex-col gap-6"
                                    >
                                        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-gray-900 border border-white/5">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full font-bold uppercase tracking-wide text-sm flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                    View Case Study
                                                    <ArrowRight size="16" variant="Bold" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                                                    {project.title}
                                                </h3>
                                                <span className="text-sm font-mono text-gray-500">{project.year}</span>
                                            </div>
                                            <p className="text-gray-400 text-sm line-clamp-2">
                                                {project.description}
                                            </p>
                                            <div className="flex items-center gap-2 text-xs font-bold text-primary mt-2 uppercase tracking-wide">
                                                <span>{project.category}</span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredProjects.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-2xl text-gray-500 dark:text-gray-400">No projects found matching your criteria.</p>
                            <button
                                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                                className="mt-4 text-primary hover:underline"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
