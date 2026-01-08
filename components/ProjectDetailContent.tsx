"use client";

import Image from "next/image";
import { Project } from "@/lib/projects";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TickCircle, MagicStar, Briefcase, Bezier, Kanban } from "iconsax-react";

export default function ProjectDetailContent({ project }: { project: Project }) {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <article className="w-full">
            {/* Hero Section */}
            <header className="relative w-full h-[85vh] overflow-hidden">
                <motion.div style={{ y, opacity }} className="relative w-full h-full">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </motion.div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-white mb-6">
                                {project.title}
                            </h1>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="flex flex-wrap gap-8 text-white/80 font-mono text-sm uppercase tracking-widest border-t border-white/20 pt-6"
                        >
                            <div className="flex flex-col gap-1">
                                <span className="text-white/40 text-xs">Category</span>
                                <span className="text-white font-bold">{project.category}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-white/40 text-xs">Year</span>
                                <span className="text-white font-bold">{project.year}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-white/40 text-xs">Role</span>
                                <span className="text-white font-bold">{project.role}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-white/40 text-xs">Client</span>
                                <span className="text-white font-bold">{project.client}</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </header>

            <div ref={targetRef} className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Problem Statement */}
                <section className="py-24 md:py-32 border-b border-white/10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-12"
                    >
                        <div className="md:col-span-4">
                            <span className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm mb-4">
                                <MagicStar size="20" variant="Bold" />
                                The Challenge
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
                                Problem Statement
                            </h2>
                        </div>
                        <div className="md:col-span-8">
                            <p className="text-2xl md:text-3xl leading-relaxed font-light text-gray-300">
                                {project.problemStatement || project.description}
                            </p>
                        </div>
                    </motion.div>
                </section>

                {/* Key Features */}
                <section className="py-24 md:py-32 border-b border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm mb-4">
                                <TickCircle size="20" variant="Bold" />
                                Core Functionality
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-8">
                                Key Features
                            </h2>
                            <p className="text-gray-400 text-lg mb-8">
                                Designed to solve specific user pain points with intuitive solutions.
                            </p>

                            <div className="space-y-6">
                                {project.keyFeatures?.map((feature, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-white/20"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                                        <span className="text-lg font-medium text-white">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-white/5">
                            {/* If there's a gallery image, use it here, otherwise use main image */}
                            <Image
                                src={project.gallery && project.gallery[0] ? project.gallery[0] : project.image}
                                alt="Feature showcase"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </section>

                {/* Contribution & Process */}
                <section className="py-24 md:py-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
                        {/* Contribution */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm mb-4">
                                <Briefcase size="20" variant="Bold" />
                                Role & Tasks
                            </span>
                            <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-8">
                                My Contribution
                            </h3>
                            <ul className="space-y-4">
                                {project.myContribution?.map((item, idx) => (
                                    <li key={idx} className="flex gap-4 text-gray-400 text-lg">
                                        <span className="font-mono text-primary/50">0{idx + 1}</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Process */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            <span className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm mb-4">
                                <Bezier size="20" variant="Bold" />
                                Methodology
                            </span>
                            <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-8">
                                Design Process
                            </h3>
                            <div className="relative pl-8 border-l border-white/10 space-y-8">
                                {project.designProcess?.map((item, idx) => (
                                    <div key={idx} className="relative">
                                        <div className="absolute -left-[37px] w-4 h-4 rounded-full bg-dark border-4 border-primary" />
                                        <p className="text-lg font-medium text-white">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Outcome Highlight */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="py-16 md:py-24"
                >
                    <div className="bg-dark rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-blue-500" />
                        <h3 className="text-primary font-bold uppercase tracking-widest mb-4">Project Outcome</h3>
                        <p className="text-4xl md:text-6xl font-black text-white mb-6">
                            "{project.result}"
                        </p>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg hover:text-white transition-colors">
                            {project.description}
                        </p>
                    </div>
                </motion.section>

                {/* Gallery Grid */}
                <section className="py-24">
                    <h3 className="text-2xl font-bold uppercase mb-12 flex items-center gap-3 text-white">
                        <Kanban size="24" className="text-primary" variant="Bold" />
                        Project Gallery
                    </h3>
                    <div className="grid grid-cols-1 gap-12">
                        {project.gallery?.map((img, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7 }}
                                className="relative w-full aspect-video md:aspect-[21/9] bg-white/5 rounded-2xl overflow-hidden shadow-xl"
                            >
                                <Image
                                    src={img}
                                    alt={`${project.title} gallery ${index + 1}`}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-1000"
                                />
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </article>
    );
}
