"use client";

import Image from "next/image";

const projects = [
    {
        title: "Fintech Dashboard",
        category: "SaaS / Finance",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1080&auto=format&fit=crop", // Data Visualization
        result: "+45% User Retention",
    },
    {
        title: "E-Commerce Mobile App",
        category: "Mobile Application",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1080&auto=format&fit=crop", // Data Visualization
        result: "2M+ App Downloads",
    },
    {
        title: "Travel Booking Platform",
        category: "Web Platform",
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1080&auto=format&fit=crop", // Dark Landscape
        result: "3x Conversion Rate",
    },
    {
        title: "Medical Patient Portal",
        category: "Healthcare",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1080&auto=format&fit=crop", // Medical Tech
        result: "-30% Admin Time",
    },
];

export default function ProjectGrid() {
    return (
        <section id="work" className="w-full bg-background py-24 md:py-32 px-6 md:px-10 border-t-2 border-dark">
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-12 tracking-tight">
                Selected Outcomes
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                    <div key={index} className="border-4 border-dark flex flex-col group hover:border-primary transition-colors duration-300">
                        {/* Project Thumbnail - High Contrast / Duotone */}
                        <div className="relative h-64 md:h-96 w-full overflow-hidden border-b-4 border-dark bg-gray-200">
                            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl md:text-3xl font-bold uppercase mb-4 group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>
                                <div className="flex flex-col gap-2">
                                    <span className="font-mono text-xs uppercase tracking-widest opacity-60">
                                        {project.category}
                                    </span>
                                    <p className="text-lg md:text-xl leading-relaxed border-l-2 border-primary pl-4 font-italic text-gray-700">
                                        {project.result}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end">
                                <button className="bg-dark text-white px-6 py-2 font-bold uppercase hover:bg-primary hover:text-dark transition-colors text-sm tracking-widest">
                                    View Case Study
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
