"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import CategoryPill from "@/components/CategoryPill";
import SearchInput from "@/components/SearchInput";
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
    techStack?: string[];
    // Mapped fields
    image?: string;
    year?: string;
}

export default function PortfolioPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await fetchAPI('/projects');
                const published = data.filter((p: Project) => p.published !== false);
                setProjects(published);
            } catch (error) {
                console.error("Failed to fetch projects:", error);
            } finally {
                setLoading(false);
            }
        };
        loadProjects();
    }, []);

    // Extract unique categories
    const categories = useMemo(() => {
        const cats = new Set(projects.map(p => p.category).filter(Boolean) as string[]);
        return ["All", ...Array.from(cats)];
    }, [projects]);

    // Filter projects
    const filteredProjects = useMemo(() => {
        return projects.filter(project => {
            const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (project.description || "").toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;

            return matchesSearch && matchesCategory;
        }).sort((a, b) => {
            const dateA = new Date(a.created_at || 0).getTime();
            const dateB = new Date(b.created_at || 0).getTime();
            return dateB - dateA;
        });
    }, [projects, searchQuery, selectedCategory]);

    return (
        <main className="bg-dark min-h-screen pt-32 text-white">
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
                                <CategoryPill
                                    key={category}
                                    label={category}
                                    isActive={selectedCategory === category}
                                    onClick={() => setSelectedCategory(category)}
                                />
                            ))}
                        </div>

                        {/* Search */}
                        <SearchInput
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search projects..."
                        />
                    </div>

                    {/* Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="flex flex-col gap-6">
                                    <div className="aspect-[4/3] bg-white/5 rounded-2xl animate-pulse" />
                                    <div className="h-8 w-3/4 bg-white/5 rounded animate-pulse" />
                                    <div className="h-4 w-1/2 bg-white/5 rounded animate-pulse" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
                            <AnimatePresence mode="popLayout">
                                {filteredProjects.map((project) => (
                                    <motion.div
                                        key={project.id}
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
                                                    src={project.cover_image || project.image || '/placeholder-project.jpg'}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                    <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full font-bold uppercase tracking-wide text-sm flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                        View Case Study
                                                        <ArrowRight size={16} color="white" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <div className="flex justify-between items-start">
                                                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                                                        {project.title}
                                                    </h3>
                                                    <span className="text-sm font-mono text-gray-500">{new Date(project.created_at || Date.now()).getFullYear()}</span>
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
                    )}

                    {!loading && filteredProjects.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-2xl text-gray-400">No projects found matching your criteria.</p>
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
