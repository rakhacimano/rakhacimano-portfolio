"use client";

import { useRef } from "react";
import { useScroll, motion } from "framer-motion";

const content = [
    {
        title: "Strategy-Led UX",
        description: "Design isn't decoration. It's systemised common sense. Every pixel must earn its place on the screen through rigorous user research and business alignment.",
    },
    {
        title: "High-Impact UI",
        description: "Visually striking interfaces that don't compromise on usability. We balance aesthetic friction with functional fluidity to create memorable experiences.",
    },
    {
        title: "Zero Decoration",
        description: "Rejection of the superfluous. Clarity is king. Content is queen. If it doesn't serve a purpose, it doesn't belong in the product.",
    },
];

export default function StickyScrollSection() {
    const containerRef = useRef(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <section id="about" ref={containerRef} className="relative w-full bg-dark text-white flex flex-col md:flex-row">
            {/* Left Side - Sticky Header */}
            <div className="w-full md:w-1/2 h-[50vh] md:h-screen sticky top-0 flex items-center justify-center p-10 border-b md:border-b-0 md:border-r border-white/10 z-10 bg-dark">
                <div className="relative z-10">
                    <h2 className="text-5xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter">
                        Core
                        <br />
                        <span className="text-primary font-serif italic font-light">Pillars</span>
                    </h2>
                </div>
            </div>

            {/* Right Side - Scrollable Content */}
            <div className="w-full md:w-1/2 min-h-screen bg-neutral-900/50">
                <div className="flex flex-col">
                    {content.map((item, index) => (
                        <div key={index} className="min-h-screen flex items-center p-10 md:p-20 border-b border-white/5 last:border-0">
                            <div>
                                <span className="text-primary font-mono text-xl mb-4 block">0{index + 1}</span>
                                <h3 className="text-4xl md:text-6xl mb-8 font-serif italic uppercase tracking-tight">{item.title}</h3>
                                <p className="text-xl md:text-xl leading-relaxed text-gray-400 opacity-90">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
