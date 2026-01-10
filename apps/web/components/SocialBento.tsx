"use client";

import Link from "next/link";
import { Instagram, Dribbble, Mail } from "lucide-react";

export default function SocialBento() {
    return (
        <section className="py-24 px-6 md:px-10 bg-background border-t border-dark/5">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
                        Connect
                    </h2>
                    <p className="text-xl text-gray-500 max-w-2xl">
                        Follow my latest work, updates, and insights across the digital landscape.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">

                    {/* Instagram - Large Square */}
                    <Link
                        href="https://instagram.com"
                        target="_blank"
                        className="group relative md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 text-white p-8 flex flex-col justify-between"
                    >
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors pointer-events-none" />
                        <div className="relative z-10">
                            <Instagram size={48} className="mb-4" color="white" />
                            <h3 className="text-3xl font-bold">Instagram</h3>
                        </div>
                        <div className="relative z-10 flex justify-between items-end">
                            <p className="opacity-80 font-medium">@rakhacimano</p>
                            <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold group-hover:scale-105 transition-transform">
                                Follow
                            </span>
                        </div>
                        {/* Abstract Circle Decoration */}
                        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                    </Link>

                    {/* Dribbble - Tall */}
                    <Link
                        href="https://dribbble.com"
                        target="_blank"
                        className="group relative md:row-span-2 rounded-3xl overflow-hidden bg-[#ea4c89] text-white p-8 flex flex-col justify-between"
                    >
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
                        <div className="relative z-10">
                            <Dribbble size={42} color="white" className="mb-4" />
                            <h3 className="text-2xl font-bold">Dribbble</h3>
                            <p className="mt-2 opacity-80 text-sm">Design shots & process</p>
                        </div>
                        <div className="relative z-10">

                            <span className="block text-center bg-white text-[#ea4c89] font-bold py-3 rounded-xl group-hover:bg-white/90 transition-colors">
                                View Shots
                            </span>
                        </div>
                    </Link>

                    {/* Email/Contact - Wide */}
                    <Link
                        href="mailto:rakhacimano@gmail.com"
                        className="group relative md:col-span-1 rounded-3xl overflow-hidden bg-dark text-white p-6 flex flex-col justify-center items-center text-center border border-white/10"
                    >
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Mail size={32} className="mb-3 text-primary" color="white" />
                        <h3 className="text-lg font-bold mb-1">Email Me</h3>
                        <p className="text-xs text-gray-400">rakhacimano@gmail.com</p>
                    </Link>

                    {/* LinkedIn - Wide */}
                    <Link
                        href="https://linkedin.com"
                        target="_blank"
                        className="group relative md:col-span-1 rounded-3xl overflow-hidden bg-[#0077b5] text-white p-6 flex flex-col justify-center items-center text-center"
                    >
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                        <Mail size={32} className="mb-3" color="white" />
                        <h3 className="text-lg font-bold mb-1">LinkedIn</h3>
                        <p className="text-xs opacity-80">Connect professionally</p>
                    </Link>

                    {/* Resume Download - Wide or standard */}
                    <Link
                        href="https://drive.google.com/file/d/1itoSGtrVvJOHdxTIV9Kp4KGz2LxB33mZ/view"
                        target="_blank"
                        className="group relative md:col-span-1 rounded-3xl overflow-hidden bg-white border-2 border-dark/5 p-6 flex flex-col justify-center items-center text-center hover:border-primary/50 transition-colors"
                    >
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
                            <span className="font-serif italic font-bold text-xl text-dark">CV</span>
                        </div>
                        <h3 className="text-lg font-bold text-dark group-hover:text-primary transition-colors">Resume</h3>
                        <p className="text-xs text-dark/60 opacity-80">See my resume or download it</p>
                    </Link>

                </div>
            </div>
        </section>
    );
}
