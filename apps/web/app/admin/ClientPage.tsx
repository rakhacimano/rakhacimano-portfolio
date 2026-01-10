"use client";

import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api";
import { FileText, Briefcase, Activity, Edit, PlusCircle, ArrowRight, ArrowUpRight, Image, Settings } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardClient() {
    const [stats, setStats] = useState({ blogs: 0, projects: 0, users: 0, visitors: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAPI('/stats')
            .then(data => {
                setStats(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load stats", err);
                setLoading(false);
            });
    }, []);

    // Mock Recent Activity - would need a real activity table in DB to be dynamic
    const activities = [
        { icon: <Edit size={20} />, color: "text-primary bg-primary/10", text: "Project 'Cloud UI Kit' updated", subtext: "Modified by Admin in Portfolio", time: "2 hours ago" },
        { icon: <PlusCircle size={20} />, color: "text-green-600 bg-green-100", text: "New Blog Post: 'The Future of AI'", subtext: "Published by Admin in Blogs", time: "5 hours ago" },
        { icon: <Image size={20} />, color: "text-orange-600 bg-orange-100", text: "4 new images uploaded", subtext: "Added to 'Brand Assets' Media gallery", time: "Yesterday" },
    ];
    // Need to import Image for the mock above due to shadowing but let's just use a string or standard icon if needed. 
    // Lucide Image is imported below.

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-primary/10 text-primary rounded-lg">
                            <FileText size={24} />
                        </div>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+8%</span>
                    </div>
                    <p className="text-slate-500 text-sm font-medium">Total Blog Posts</p>
                    <h3 className="text-3xl font-bold mt-1 text-[#0d141b]">{loading ? "-" : stats.blogs}</h3>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                            <Briefcase size={24} />
                        </div>
                        <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-full">+0%</span>
                    </div>
                    <p className="text-slate-500 text-sm font-medium">Portfolio Projects</p>
                    <h3 className="text-3xl font-bold mt-1 text-[#0d141b]">{loading ? "-" : stats.projects}</h3>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                            <Activity size={24} />
                        </div>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+5%</span>
                    </div>
                    <p className="text-slate-500 text-sm font-medium">Site Visitors</p>
                    <h3 className="text-3xl font-bold mt-1 text-[#0d141b]">{loading ? "-" : (stats.visitors > 1000 ? (stats.visitors / 1000).toFixed(1) + 'k' : stats.visitors)}</h3>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity Section */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-[#0d141b]">Recent Activity</h2>
                        <button className="text-primary text-sm font-medium hover:underline">View all</button>
                    </div>
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                        {activities.map((item, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
                                <div className={`size-10 rounded-lg flex items-center justify-center shrink-0 ${item.color}`}>
                                    {item.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold truncate text-[#0d141b]">{item.text}</p>
                                    <p className="text-xs text-[#4c739a]">{item.subtext}</p>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="text-[10px] text-slate-400 font-medium">{item.time}</p>
                                </div>
                            </div>
                        ))}
                        {/* Static activity item to match design perfectly if needed, but dynamic map is cleaner */}
                        <div className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
                            <div className="size-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                                <Settings size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold truncate text-[#0d141b]">Site metadata updated</p>
                                <p className="text-xs text-[#4c739a]">SEO settings modified by Admin</p>
                            </div>
                            <div className="text-right shrink-0">
                                <p className="text-[10px] text-slate-400 font-medium">Jan 12, 2024</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions Section */}
                <div className="space-y-4">
                    <h2 className="text-lg font-bold text-[#0d141b]">Quick Actions</h2>
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                        <Link href="/admin/blogs/new" className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-dark font-bold py-3 rounded-lg transition-all active:scale-[0.98]">
                            <Edit size={18} />
                            Create New Blog
                        </Link>
                        <Link href="/admin/projects/new" className="w-full flex items-center justify-center gap-2 bg-white border-2 border-slate-100 hover:border-primary/30 text-[#0d141b] font-bold py-3 rounded-lg transition-all active:scale-[0.98]">
                            <PlusCircle size={18} />
                            Add New Project
                        </Link>

                        <div className="pt-2">
                            <p className="text-xs text-slate-400 mb-3 uppercase tracking-widest font-bold">Drafts</p>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="size-2 rounded-full bg-yellow-400"></div>
                                    <p className="text-sm font-medium text-slate-600 truncate">Portfolio - Modern Cabin...</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="size-2 rounded-full bg-yellow-400"></div>
                                    <p className="text-sm font-medium text-slate-600 truncate">Blog - Next.js 14 Tips...</p>
                                </div>
                            </div>
                        </div>
                        <hr className="border-slate-100" />
                        <Link href="#" className="flex items-center justify-between text-xs font-bold text-primary group">
                            Analytics Dashboard
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
