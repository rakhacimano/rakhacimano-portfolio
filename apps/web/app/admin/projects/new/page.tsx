"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { fetchAPI } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, Save, Eye, LayoutDashboard, ChevronRight } from "lucide-react";
import Link from "next/link";
import ImageUpload from "@/components/ImageUpload";
import TagInput from "@/components/TagInput";

// Dynamic import for Editor
const Editor = dynamic(() => import("@/components/Editor"), {
    ssr: false,
    loading: () => <div className="h-[300px] w-full bg-slate-50 border border-slate-200 rounded-xl animate-pulse" />
});

export default function CreateProject() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Form States
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [role, setRole] = useState("");
    const [tags, setTags] = useState<string[]>([]); // Array of strings
    const [demoLink, setDemoLink] = useState("");
    const [githubLink, setGithubLink] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [images, setImages] = useState<string[]>([]); // Gallery
    const [published, setPublished] = useState(false);
    const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await fetchAPI('/projects', {
                method: 'POST',
                body: JSON.stringify({
                    title,
                    slug,
                    description,
                    content,
                    role,
                    tags, // Already an array
                    demo_link: demoLink,
                    github_link: githubLink,
                    cover_image: coverImage,
                    images, // Send gallery images
                    published,
                }),
            });
            toast.success('Project created successfully!');
            setTimeout(() => router.push('/admin/projects'), 1500);
        } catch (error) {
            console.error('Failed to create project', error);
            toast.error('Failed to create project');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="min-h-screen pb-20">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-[#4c739a] mb-6">
                <Link href="/admin/projects" className="hover:text-primary transition-colors">Portfolio</Link>
                <ChevronRight size={14} />
                <span className="font-medium text-[#0d141b]">Add New Project</span>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black text-[#0d141b] tracking-tight">Add New Portfolio Project</h1>
                    <p className="text-[#4c739a] mt-1">Fill in the details below to publish a new project.</p>
                </div>
                <div className="flex gap-3">
                    <button type="button" className="px-4 py-2 bg-white border border-slate-200 text-[#0d141b] font-bold rounded-lg hover:bg-slate-50 transition-colors text-sm flex items-center gap-2">
                        <Eye size={16} /> Live Preview
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-primary text-dark font-bold rounded-lg hover:bg-white border hover:border-primary transition-colors disabled:opacity-50 text-sm flex items-center gap-2"
                    >
                        <Save size={16} /> {loading ? 'Saving...' : 'Save Project'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Left Column: Primary Information */}
                <div className="xl:col-span-2 space-y-8">
                    {/* Project Information */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <h2 className="text-xl font-bold text-[#0d141b] mb-6">Project Information</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-[#0d141b] mb-2">Project Title <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => {
                                        const newTitle = e.target.value;
                                        setTitle(newTitle);
                                        // Auto-generate slug if unused or not manually edited
                                        if (!isSlugManuallyEdited) {
                                            setSlug(newTitle.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''));
                                        }
                                    }}
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-[#0d141b]"
                                    placeholder="e.g. Modern E-commerce Platform"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-[#0d141b] mb-2">Slug</label>
                                    <input
                                        type="text"
                                        value={slug}
                                        onChange={(e) => {
                                            setSlug(e.target.value);
                                            setIsSlugManuallyEdited(true);
                                        }}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-primary font-mono text-sm text-slate-600"
                                        placeholder="project-slug"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-[#0d141b] mb-2">Role / Client</label>
                                    <input
                                        type="text"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-primary transition-all text-[#0d141b]"
                                        placeholder="e.g. Lead Designer"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-[#0d141b] mb-2">Short Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-primary min-h-[100px] text-[#0d141b] resize-y"
                                    placeholder="Brief overview of the project scope, challenges, and results..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-[#0d141b] mb-2">Full Content (Case Study)</label>
                                <div className="prose-editor-wrapper border border-slate-200 rounded-lg overflow-hidden">
                                    <Editor content={content} onChange={setContent} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Gallery Images */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <ImageUpload
                            label="Gallery Images"
                            multiple
                            value={images}
                            onChange={(vals) => setImages(vals as string[])}
                            bucket="portfolio-images"
                        />
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
                                <span className="text-sm font-bold text-emerald-700">Public</span>
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
                            bucket="portfolio-images"
                        />
                    </div>

                    {/* Tags & Links */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-[#0d141b] mb-4">Metadata</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-[#4c739a] mb-2">Tags (comma separated)</label>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wide text-[#4c739a] mb-2">Tags</label>
                                    <TagInput
                                        value={tags}
                                        onChange={setTags}
                                        placeholder="React, Next.js (Press space to add)"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-[#4c739a] mb-2">Demo Link</label>
                                <input
                                    type="url"
                                    value={demoLink}
                                    onChange={(e) => setDemoLink(e.target.value)}
                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-primary text-sm"
                                    placeholder="https://..."
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-[#4c739a] mb-2">GitHub Link</label>
                                <input
                                    type="url"
                                    value={githubLink}
                                    onChange={(e) => setGithubLink(e.target.value)}
                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-primary text-sm"
                                    placeholder="https://github.com/..."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Bottom Bar (Mobile only or redundant since we have top bar) */}
            {/* Removed redundant bottom bar to keep clean, top bar actions are sufficient */}
        </form>
    );
}

