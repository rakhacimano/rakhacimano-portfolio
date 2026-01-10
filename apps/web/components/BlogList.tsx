"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Calendar, ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Blog } from "@/lib/blog";
import SearchInput from "@/components/SearchInput";
import CategoryPill from "@/components/CategoryPill";

interface BlogListProps {
    initialBlogs: Blog[];
}

export default function BlogList({ initialBlogs }: BlogListProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Extract unique categories
    const categories = ["All", ...Array.from(new Set(initialBlogs.map((post) => post.category)))];

    // Filter Logic
    const filteredPosts = initialBlogs.filter((post) => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <>
            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center mb-16 border-b border-white/10 pb-8">
                {/* Categories */}
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                        <CategoryPill
                            key={cat}
                            label={cat}
                            isActive={selectedCategory === cat}
                            onClick={() => setSelectedCategory(cat)}
                        />
                    ))}
                </div>

                {/* Search */}
                <SearchInput
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search topics..."
                />
            </div>

            {/* Blog Grid */}
            {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    <AnimatePresence mode="popLayout">
                        {filteredPosts.map((post) => (
                            <motion.div
                                key={post.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Link href={`/blog/${post.slug}`} className="group flex flex-col h-full">
                                    {/* Thumbnail */}
                                    <div className="relative w-full aspect-[4/3] bg-gray-900 mb-6 overflow-hidden border border-white/5 group-hover:border-white/20 transition-colors rounded-3xl">
                                        {post.thumbnail ? (
                                            /* eslint-disable-next-line @next/next/no-img-element */
                                            <img
                                                src={post.thumbnail}
                                                alt={post.title}
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <ImageIcon className="w-12 h-12 text-gray-700" />
                                            </div>
                                        )}
                                        {/* Overlay Category */}
                                        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-white border border-white/10 rounded-full">
                                            {post.category}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-col flex-grow">
                                        <div className="flex items-center gap-4 text-xs font-mono text-gray-400 uppercase tracking-widest mb-3">
                                            <span className="flex items-center gap-1">
                                                <Calendar size={14} color="white" />
                                                {post.date}
                                            </span>
                                            <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                                            <span className="flex items-center gap-1">
                                                <Clock size={14} color="white" />
                                                {post.readingTime}
                                            </span>
                                        </div>

                                        <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-4 text-white group-hover:text-primary transition-colors line-clamp-2">
                                            {post.title}
                                        </h2>

                                        <p className="text-gray-400 line-clamp-3 mb-6 flex-grow">
                                            {post.excerpt}
                                        </p>

                                        {/* Author Mini */}
                                        <div className="flex items-center gap-3 mt-auto pt-6 border-t border-dashed border-white/10">
                                            {/* Avatar */}
                                            <div className="w-8 h-8 rounded-full bg-gray-800 overflow-hidden relative flex items-center justify-center">
                                                {post.author?.avatar ? (
                                                    /* eslint-disable-next-line @next/next/no-img-element */
                                                    <img
                                                        src={post.author.avatar}
                                                        alt={post.author?.name || 'Author'}
                                                        className="absolute inset-0 w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-xs font-bold text-white">
                                                        {(post.author?.name || 'A').charAt(0).toUpperCase()}
                                                    </span>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-white">{post.author?.name || 'Admin'}</p>
                                                <p className="text-[10px] text-gray-400 uppercase tracking-wide">{post.author?.role || 'Editor'}</p>
                                            </div>
                                            <div className="ml-auto">
                                                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all text-white/50">
                                                    <ArrowRight size={14} color="white" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            ) : (
                <div className="py-20 text-center">
                    <h3 className="text-2xl font-bold mb-2">No articles found</h3>
                    <p className="text-gray-500">Try adjusting your search or category filter.</p>
                </div>
            )}
        </>
    );
}
