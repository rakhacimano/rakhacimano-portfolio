"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Viscous, heavy physics for premium feel
    const mouseX = useSpring(x, { stiffness: 100, damping: 25, mass: 1.2 });
    const mouseY = useSpring(y, { stiffness: 100, damping: 25, mass: 1.2 });

    function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        // Normalized -0.5 to 0.5
        x.set(clientX / innerWidth - 0.5);
        y.set(clientY / innerHeight - 0.5);
    }

    // --- Parallax Logic ---

    // 1. Text Layer (Moves WITH mouse slightly)
    const textX = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
    const textY = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);

    // 2. Image Layer (Moves AGAINST mouse - Inverted Parallax)
    // Stronger movement to create depth separation
    const imageX = useTransform(mouseX, [-0.5, 0.5], [60, -60]);
    const imageY = useTransform(mouseY, [-0.5, 0.5], [60, -60]);

    // 3. Rotation / Tilt (Look at cursor)
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

    return (
        <section
            id="home"
            onMouseMove={handleMouseMove}
            className="relative w-full h-screen bg-dark text-white flex items-center justify-center overflow-hidden perspective-1000"
        >
            {/* Background Texture */}
            <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                    backgroundSize: '4rem 4rem'
                }}>
            </div>

            {/* Central Content */}
            <div className="relative z-10 flex flex-col items-center justify-center">

                {/* Floating Image Card (BEHIND Text or Intersecting) */}
                <motion.div
                    style={{
                        x: imageX,
                        y: imageY,
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d"
                    }}
                    className="flex flex-col items-center justify-center"
                >
                    <div className="relative w-[320px] md:w-[420px] aspect-[3/4] bg-[#111] border border-white/10 shadow-2xl shadow-black/80 group">
                        <Image
                            src="/assets/hero-image-portrait.jpg"
                            alt="Rakha Portrait"
                            fill
                            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 grayscale hover:grayscale-0"
                            priority
                        />

                        {/* Status Badge on Image */}
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">Location</span>
                                <span className="text-sm font-bold uppercase text-white">Surabaya, Malang, Semarang, ID</span>
                            </div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_#FF6161]"></div>
                        </div>
                    </div>
                </motion.div>

                {/* Massive Typography Overlay (On Top) */}
                <motion.div
                    style={{ x: textX, y: textY, z: 50 }} // Z-index to ensure text is engaging
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                >
                    <h1 className="text-5xl md:text-7xl leading-none font-black tracking-tighter text-transparent uppercase mix-blend-difference text-center z-50">
                        <span className="block text-outline-thick text-white/90">Rakha</span>
                        <span className="block text-white">Putra</span>
                        <span className="block text-white">Pratama</span>
                    </h1>
                </motion.div>

                {/* Minimal Footer / CTA in Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="absolute bottom-12 flex flex-col items-center gap-4 z-40"
                >
                    <p className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-gray-500 text-center max-w-sm text-white">
                        Mid UI/UX Designer<br />
                        Based in Indonesia
                    </p>

                    <Link href="#portfolio" className="bg-white/5 hover:bg-primary hover:text-dark border-white/10 border backdrop-blur-md px-6 py-2 rounded-full transition-all duration-300 flex items-center gap-2 group">
                        <span className="text-xs font-bold uppercase tracking-widest">Scroll to Explore</span>
                        <ChevronDown size={16} className="group-hover:translate-y-1 transition-transform" color="white" />
                    </Link>
                </motion.div>

            </div>

            {/* Corner Decor */}
            <div className="absolute top-32 left-8 md:left-12 z-20 hidden md:block">
                <span className="font-mono text-xs text-white/30 vertical-lr">UI/UX Designer <br></br> Product Designer</span>
            </div>
            <div className="absolute top-32 right-8 md:right-12 z-20 hidden md:block">
                <span className="font-mono text-xs text-white/30 vertical-lr">PORTFOLIO V2</span>
            </div>

        </section>
    );
}
