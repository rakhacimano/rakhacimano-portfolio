"use client";

import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api";
import Link from "next/link";
import { Edit2, Trash2, PlusCircle, Search } from "lucide-react";
import { toast } from "sonner";

interface Project {
    id: string;
    title: string;
    slug: string;
    description: string;
    created_at: string;
    role?: string;
    tags?: string[];
}

export default function ProjectsPageClient() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            const data = await fetchAPI('/projects');
            setProjects(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load projects");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;
        try {
            await fetchAPI(`/projects/${id}`, { method: 'DELETE' });
            toast.success("Project deleted");
            loadProjects();
        } catch (error) {
            toast.error("Failed to delete project");
        }
    };

    const filteredProjects = projects.filter(project =>
        (project.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.slug || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags?.some(tag => (tag || "").toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-[#0d141b]">Portfolio Projects</h1>
                <Link href="/admin/projects/new" className="flex items-center gap-2 bg-primary text-dark px-4 py-2 rounded-lg font-bold hover:bg-white transition-colors">
                    <PlusCircle size={20} />
                    Add New Project
                </Link>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-slate-200">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search projects..."
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
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Project</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Role / Tags</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                                        Loading projects...
                                    </td>
                                </tr>
                            ) : filteredProjects.map((project) => (
                                <tr key={project.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-[#0d141b]">{project.title}</div>
                                        <div className="text-xs text-slate-500 font-mono mt-1">{project.slug}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        <div className="flex flex-wrap gap-1">
                                            {project.tags?.map(tag => (
                                                <span key={tag} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold">{tag}</span>
                                            ))}
                                            {!project.tags?.length && <span className="text-slate-400">-</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {project.created_at ? new Date(project.created_at).toLocaleDateString() : '-'}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/projects/${project.id}/edit`} className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-lg transition-colors">
                                                <Edit2 size={18} />
                                            </Link>
                                            <button onClick={() => handleDelete(project.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredProjects.length === 0 && !loading && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                                        No projects found matching "{searchQuery}".
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
