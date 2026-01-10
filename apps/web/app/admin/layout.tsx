"use client";

import Link from "next/link";
import { LayoutGrid, LayoutDashboard, FileText, Briefcase, Image, Settings, Search, Bell, HelpCircle, LogOut, User as UserIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    const { data: session, isPending } = authClient.useSession();

    // Only check auth after the component is mounted to avoid hydration issues
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        // Only redirect after mounted, not pending, and no session
        if (mounted && !isPending && !session?.user) {
            router.replace('/auth');
        }
    }, [session, isPending, router, mounted]);

    // Show loading while pending or not mounted
    if (!mounted || isPending) return <div className="h-screen flex items-center justify-center bg-[#f6f7f8] text-slate-400">Loading...</div>;

    if (!session?.user) return null;

    const handleLogout = async () => {
        await authClient.signOut({ fetchOptions: { credentials: "include" } });
        toast.success("Logged out successfully");
        router.push('/auth');
    };

    const isActive = (path: string) => pathname === path;

    return (
        <div className="flex h-screen overflow-hidden bg-[#f6f7f8] text-[#0d141b] font-sans">
            {/* Sidebar Navigation */}
            <aside className="w-64 flex-shrink-0 border-r border-slate-200 bg-white flex flex-col h-full">
                <div className="p-6 flex items-center gap-3">
                    <div className="bg-primary size-10 rounded-lg flex items-center justify-center text-dark">
                        <LayoutGrid size={24} />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-[#0d141b] text-base font-bold leading-tight">CMS Admin</h1>
                        <p className="text-[#4c739a] text-xs font-normal">Management Portal</p>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    <Link
                        href="/admin"
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive('/admin')
                            ? 'bg-primary/10 text-primary font-bold'
                            : 'text-[#4c739a] hover:bg-slate-100'
                            }`}
                    >
                        <LayoutDashboard size={20} />
                        <span className="text-sm font-medium">Dashboard</span>
                    </Link>
                    <Link
                        href="/admin/users"
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive('/admin/users')
                            ? 'bg-primary/10 text-primary font-bold'
                            : 'text-[#4c739a] hover:bg-slate-100'
                            }`}
                    >
                        <UserIcon size={20} />
                        <span className="text-sm font-medium">Users</span>
                    </Link>
                    <Link
                        href="/admin/blogs"
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive('/admin/blogs')
                            ? 'bg-primary/10 text-primary font-bold'
                            : 'text-[#4c739a] hover:bg-slate-100'
                            }`}
                    >
                        <FileText size={20} />
                        <span className="text-sm font-medium">Blogs</span>
                    </Link>
                    <Link
                        href="/admin/projects"
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive('/admin/projects')
                            ? 'bg-primary/10 text-primary font-bold'
                            : 'text-[#4c739a] hover:bg-slate-100'
                            }`}
                    >
                        <Briefcase size={20} />
                        <span className="text-sm font-medium">Portfolio</span>
                    </Link>

                    <div className="pt-4 pb-2">
                        <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">System</p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#4c739a] hover:bg-red-50 hover:text-red-600 transition-colors text-left"
                    >
                        <LogOut size={20} />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </nav>

                <div className="p-4 border-t border-slate-200">
                    <div className="flex items-center gap-3 px-2">
                        <div className="size-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                            {session.user.name?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-semibold truncate text-[#0d141b]">{session.user.name}</p>
                            <p className="text-xs text-[#4c739a] truncate">{session.user.email}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto bg-[#f6f7f8]">
                {/* Top Navigation Bar */}
                <header className="sticky top-0 z-10 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4">
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold tracking-tight text-[#0d141b]">Dashboard Overview</h2>
                    </div>
                    <div className="flex items-center gap-6">

                        <div className="flex items-center gap-2">
                            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative transition-colors">
                                <Bell size={20} />
                                <span className="absolute top-2 right-2 size-2 bg-red-500 border-2 border-white rounded-full"></span>
                            </button>
                            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
                                <HelpCircle size={20} />
                            </button>
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
