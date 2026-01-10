"use client";

import { Search, Brush, Code, Plane } from "lucide-react";

const steps = [
    {
        icon: Search,
        id: "01",
        title: "Discovery & Research",
        description: "Analyze user needs, market gaps, and business goals. We don't guess.",
    },
    {
        icon: Brush,
        id: "02",
        title: "Strategy & Design",
        description: "Translating insights into systems. Wireframing, prototyping, and hi-fi UI.",
    },
    {
        icon: Code,
        id: "03",
        title: "Development Handoff",
        description: "Pixel-perfect specs and documentation. Ensuring the vision survives the build.",
    },
    {
        icon: Plane,
        id: "04",
        title: "Launch & Iterate",
        description: "Shipping the product and measuring impact. Data-driven refinement for growth.",
    },
];

export default function Process() {
    return (
        <section id="process" className="bg-white text-dark py-24 md:py-32 px-6 md:px-10 border-b border-dark/10 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24">
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter max-w-xl">
                        The Method
                    </h2>
                    <div className="w-full md:w-auto mt-8 md:mt-0">
                        <span className="font-mono text-sm tracking-widest uppercase bg-dark text-white px-4 py-2">
                            Systematic Approach
                        </span>
                    </div>
                </div>

                <div className="relative">
                    {/* Connecting Line - Desktop Only */}
                    <div className="hidden md:block absolute top-[60px] left-0 w-full h-[2px] bg-dark/10 z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-0">
                        {steps.map((step, index) => (
                            <div key={index} className="group relative z-10">
                                {/* Step Indicator */}
                                <div className="flex items-center mb-8">
                                    <div className="w-28 h-28 bg-white border-2 border-primary rounded-full flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300 text-primary group-hover:text-white">
                                        <step.icon
                                            size={40}
                                            color="currentColor"
                                            className="transition-colors duration-300"
                                        />
                                    </div>
                                </div>

                                <div className="pr-8">
                                    <span className="text-6xl font-black text-dark/5 mb-4 block group-hover:text-primary/20 transition-colors">
                                        {step.id}
                                    </span>
                                    <h3 className="text-3xl font-serif font-bold italic mb-4">{step.title}</h3>
                                    <p className="font-sans text-lg text-gray-400 leading-relaxed border-l-2 border-primary/20 pl-4 font-light">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
