"use client";

import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api";
import { Loader2, Plus, Search, Trash2, User } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
    role?: string;
    createdAt: string;
}

export default function UsersPageClient() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const loadUsers = async () => {
        try {
            const data = await fetchAPI('/users');
            setUsers(data);
        } catch (error) {
            toast.error("Failed to fetch users");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="animate-spin text-primary" size={32} />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#0d141b]">Users</h1>
                    <p className="text-[#4c739a] text-sm">Manage registered users and administrators</p>
                </div>
                {/* Placeholder for Add User button if needed later */}
                <button
                    className="flex items-center gap-2 bg-primary text-dark px-4 py-2 rounded-lg hover:bg-white transition-colors font-medium text-sm border-primary"
                    onClick={() => toast("Feature coming soon!")}
                >
                    <Plus size={18} />
                    Add User
                </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-slate-200 flex items-center gap-4 bg-slate-50/50">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-[#4c739a] text-xs font-semibold uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Joined</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                                        No users found matching your search.
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-10 rounded-full bg-slate-200 overflow-hidden bg-cover bg-center shrink-0 flex items-center justify-center text-slate-500 font-bold border border-slate-100">
                                                    {user.image ? (
                                                        <Image src={user.image} alt={user.name} width={40} height={40} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span>{user.name?.[0]?.toUpperCase() || 'U'}</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-[#0d141b] text-sm">{user.name}</div>
                                                    <div className="text-xs text-[#4c739a]">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${user.role === 'admin'
                                                ? 'bg-purple-50 text-purple-700 border-purple-200'
                                                : 'bg-blue-50 text-blue-700 border-blue-200'
                                                }`}>
                                                {user.role || 'User'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[#4c739a]">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {/* Placeholder for actions */}
                                            <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
