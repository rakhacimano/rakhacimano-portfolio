"use client";

import { useState, useEffect } from "react";
import nextDynamic from "next/dynamic";
import { fetchAPI } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, Save, Eye, ChevronRight } from "lucide-react";
import Link from "next/link";
import ImageUpload from "@/components/ImageUpload";
import TagInput from "@/components/TagInput";

const Editor = nextDynamic(() => import("@/components/Editor"), {
    ssr: false,
    loading: () => <div className="h-[300px] w-full bg-slate-50 border border-slate-200 rounded-xl animate-pulse" />
});

export default function EditBlogClient({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [id, setId] = useState<string>("");

    // Form States
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [category, setCategory] = useState("Tech");
    const [content, setContent] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [published, setPublished] = useState(false);
    const [readingTime, setReadingTime] = useState("");

    // Load Data
    useEffect(() => {
        const loadData = async () => {
            try {
                const resolvedParams = await params;
                setId(resolvedParams.id);
                const data = await fetchAPI(`/blogs/id/${resolvedParams.id}`);

                setTitle(data.title);
                setSlug(data.slug);
                setExcerpt(data.excerpt);
                setCategory(data.category);
                setContent(data.content);
                setCoverImage(data.coverImage || data.thumbnail || "");
                setTags(data.tags || []);
                setPublished(data.published);
                setReadingTime(data.readingTime || "");
            } catch (error) {
                console.error("Failed to fetch blog:", error);
                toast.error("Failed to load blog data");
                router.push('/admin/blogs');
            } finally {
                setFetching(false);
            }
        };
        loadData();
    }, [params, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await fetchAPI(`/blogs/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    title,
                    slug,
                    excerpt,
                    category,
                    content,
                    cover_image: coverImage,
                    tags,
                    reading_time: readingTime,
                    published,
                }),
            });
            toast.success('Blog updated successfully!');
            setTimeout(() => router.push('/admin/blogs'), 1500);
        } catch (error) {
            console.error('Failed to update blog', error);
            toast.error('Failed to update blog');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="min-h-screen pb-20">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-[#4c739a] mb-6">
                <Link href="/admin/blogs" className="hover:text-primary transition-colors">Blogs</Link>
                <ChevronRight size={14} />
                <span className="font-medium text-[#0d141b]">Edit Blog</span>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black text-[#0d141b] tracking-tight">Edit Article</h1>
                    <p className="text-[#4c739a] mt-1">Update your blog post content and settings.</p>
                </div>
                <div className="flex gap-3">
                    <button type="button" className="px-4 py-2 bg-white border border-slate-200 text-[#0d141b] font-bold rounded-lg hover:bg-slate-50 transition-colors text-sm flex items-center gap-2">
                        <Eye size={16} /> Preview
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-primary text-dark font-bold rounded-lg hover:bg-white border hover:border-primary transition-colors disabled:opacity-50 text-sm flex items-center gap-2"
                    >
                        <Save size={16} /> {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Left Column: Primary Information */}
                <div className="xl:col-span-2 space-y-8">
                    {/* Article Information */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <h2 className="text-xl font-bold text-[#0d141b] mb-6">Article Information</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-[#0d141b] mb-2">Title <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-[#0d141b] font-bold text-lg"
                                    placeholder="Enter article title"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-[#0d141b] mb-2">Slug <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-primary font-mono text-sm text-slate-600"
                                    placeholder="article-slug"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-[#0d141b] mb-2">Excerpt <span className="text-red-500">*</span></label>
                                <textarea
                                    value={excerpt}
                                    onChange={(e) => setExcerpt(e.target.value)}
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-primary min-h-[100px] text-[#0d141b] resize-y"
                                    placeholder="Short description for SEO and listings..."
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-[#0d141b] mb-2">Content</label>
                                <div className="prose-editor-wrapper border border-slate-200 rounded-lg overflow-hidden">
                                    <Editor content={content} onChange={setContent} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Settings */}
                <div className="space-y-8">
                    {/* Publish Status */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-[#0d141b] mb-4">Status</h2>
                        <div className="space-y-3">
                            <label className="flex items-center gap-3 cursor-pointer p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                                <input
                                    type="radio"
                                    name="status"
                                    checked={!published}
                                    onChange={() => setPublished(false)}
                                    className="w-4 h-4 text-primary focus:ring-primary"
                                />
                                <span className="text-sm font-medium text-slate-700">Draft</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer p-3 border border-emerald-100 bg-emerald-50/50 rounded-lg transition-colors">
                                <input
                                    type="radio"
                                    name="status"
                                    checked={published}
                                    onChange={() => setPublished(true)}
                                    className="w-4 h-4 text-emerald-500 focus:ring-emerald-500"
                                />
                                <span className="text-sm font-bold text-emerald-700">Published</span>
                            </label>
                        </div>
                    </div>

                    {/* Cover Image */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <ImageUpload
                            label="Cover Image"
                            multiple={false}
                            value={coverImage}
                            onChange={(val) => setCoverImage(val as string)}
                        />
                    </div>

                    {/* Metadata */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-[#0d141b] mb-4">Metadata</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-[#4c739a] mb-2">Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-primary text-sm text-[#0d141b]"
                                >
                                    <option value="Tech">Tech</option>
                                    <option value="Design">Design</option>
                                    <option value="Career">Career</option>
                                    <option value="Life">Life</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-[#4c739a] mb-2">Reading Time</label>
                                <input
                                    type="text"
                                    value={readingTime}
                                    onChange={(e) => setReadingTime(e.target.value)}
                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-primary text-sm"
                                    placeholder="e.g. 5 min read"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-[#4c739a] mb-2">Tags</label>
                                <TagInput
                                    value={tags}
                                    onChange={setTags}
                                    placeholder="React, Design (Press space to add)"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
