"use client";

import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api";
import Link from "next/link";
import { Edit2, Trash2, Plus, Search } from "lucide-react";
import { toast } from "sonner";

interface Blog {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    createdAt: string;
}

export default function BlogsPageClient() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        loadBlogs();
    }, []);

    const loadBlogs = async () => {
        try {
            const data = await fetchAPI('/blogs');
            setBlogs(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load blogs");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this blog?")) return;
        try {
            await fetchAPI(`/blogs/${id}`, { method: 'DELETE' });
            toast.success("Blog deleted");
            loadBlogs();
        } catch (error) {
            toast.error("Failed to delete blog");
        }
    };

    const filteredBlogs = blogs.filter(blog =>
        (blog.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (blog.category || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (blog.slug || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-[#0d141b]">Blog Posts</h1>
                <Link href="/admin/blogs/new" className="flex items-center gap-2 bg-primary text-dark px-4 py-2 rounded-lg font-bold hover:bg-white transition-colors">
                    <Plus size={20} />
                    Create New
                </Link>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-slate-200">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search blogs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-primary text-slate-600"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredBlogs.map((blog) => (
                                <tr key={blog.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-[#0d141b]">{blog.title}</td>
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-xs font-bold">{blog.category}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">{new Date(blog.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/blogs/${blog.id}/edit`} className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-lg transition-colors">
                                                <Edit2 size={18} />
                                            </Link>
                                            <button onClick={() => handleDelete(blog.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredBlogs.length === 0 && !loading && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                                        No blogs found matching "{searchQuery}".
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
