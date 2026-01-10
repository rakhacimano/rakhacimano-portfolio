
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchAPI } from "@/lib/api";

interface Blog {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    thumbnail: string;
    category: string;
    readingTime: string;
    published?: boolean;
    created_at?: string;
    author?: {
        name: string;
        avatar: string;
        role: string;
    };
}

export default function LandingBlogSection() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBlogs = async () => {
            try {
                const data = await fetchAPI('/blogs');
                // Filter published and slice top 3
                const latestBlogs = data
                    .filter((b: Blog) => b.published !== false)
                    .slice(0, 3);
                setBlogs(latestBlogs);
            } catch (error) {
                console.error("Failed to fetch blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        loadBlogs();
    }, []);

    if (loading) {
        return (
            <section className="py-24 px-6 md:px-10 bg-dark text-white border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    <div className="h-12 w-64 bg-white/10 rounded animate-pulse mb-12" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="aspect-[4/3] bg-white/5 rounded-3xl animate-pulse" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (blogs.length === 0) return null;

    return (
        <section className="py-32 px-6 md:px-10 bg-dark text-white border-t border-white/10">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
                            Latest <span className="text-primary">Insights</span>
                        </h2>
                        <p className="text-gray-400 max-w-xl text-lg">
                            Thoughts on design, development, and the future of digital experiences.
                        </p>
                    </div>
                    <Link
                        href="/blog"
                        className="hidden md:flex items-center gap-2 text-primary font-bold uppercase tracking-wide hover:text-white transition-colors group"
                    >
                        View All Articles
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {blogs.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={`/blog/${post.slug}`} className="group block h-full">
                                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-gray-900 border border-white/10">
                                    {post.thumbnail ? (
                                        /* eslint-disable-next-line @next/next/no-img-element */
                                        <img
                                            src={post.thumbnail}
                                            alt={post.title}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Clock className="w-12 h-12 text-gray-700" />
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-bold uppercase tracking-wider text-white border border-white/10 rounded-full">
                                        {post.category}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 text-xs font-mono text-gray-400 uppercase tracking-widest mb-3">
                                    <span>{new Date(post.created_at || Date.now()).toLocaleDateString()}</span>
                                    {post.readingTime && (
                                        <>
                                            <span className="w-1 h-1 bg-gray-600 rounded-full" />
                                            <span className="flex items-center gap-1">
                                                <Clock size={12} />
                                                {post.readingTime}
                                            </span>
                                        </>
                                    )}
                                </div>

                                <h3 className="text-2xl font-bold leading-tight mb-3 group-hover:text-primary transition-colors">
                                    {post.title}
                                </h3>

                                <p className="text-gray-400 line-clamp-2 text-sm">
                                    {post.excerpt}
                                </p>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 md:hidden">
                    <Link
                        href="/blog"
                        className="flex items-center justify-center w-full py-4 bg-white/5 border border-white/10 rounded-xl font-bold uppercase tracking-wide hover:bg-white/10 transition-colors"
                    >
                        View All Articles
                    </Link>
                </div>
            </div>
        </section>
    );
}
