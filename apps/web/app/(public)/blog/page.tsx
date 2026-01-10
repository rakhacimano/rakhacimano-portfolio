"use client";

import { useState, useEffect } from "react";
import { getAllBlogs, Blog } from "@/lib/blog";
import BlogList from "@/components/BlogList";

export default function BlogListing() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBlogs = async () => {
            try {
                const data = await getAllBlogs();
                setBlogs(data.filter((b: any) => b.published !== false));
            } catch (error) {
                console.error("Failed to fetch blogs:", error);
            } finally {
                setLoading(false);
            }
        };
        loadBlogs();
    }, []);

    return (
        <div className="min-h-screen bg-dark text-white pt-32 pb-24 px-6 md:px-10">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-10 text-center">
                    <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-6">
                        Insights
                    </h1>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="space-y-4">
                                <div className="aspect-[4/3] bg-white/5 rounded-3xl animate-pulse" />
                                <div className="h-8 w-3/4 bg-white/5 rounded animate-pulse" />
                                <div className="h-4 w-1/2 bg-white/5 rounded animate-pulse" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <BlogList initialBlogs={blogs} />
                )}
            </div>
        </div>
    );
}
