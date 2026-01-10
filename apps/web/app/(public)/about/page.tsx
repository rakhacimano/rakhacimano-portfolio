"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ButtonPrimary from "@/components/ButtonPrimary";
import Footer from "@/components/Footer";

export default function AboutPage() {
    return (
        <main className="bg-background min-h-screen pt-32">
            <section className="px-6 md:px-10 mb-20">
                <div className="max-w-7xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-12"
                    >
                        About <span className="text-primary">Me</span>
                    </motion.h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl md:text-2xl leading-relaxed text-gray-400 font-light"
                        >
                            <p className="mb-8">
                                I'm Rakha Putra Pratama, a Senior UI/UX Designer based in Indonesia with a passion for dismantling complexity.
                            </p>
                            <p className="mb-8">
                                My work is driven by a deep belief that digital experiences should be intuitive, engaging, and visually striking. I don't just design interfaces; I craft interactions that leave a lasting impression.
                            </p>
                            <p className="mb-12">
                                With a background in both design and front-end technologies, I bridge the gap between creative vision and technical feasibility.
                            </p>

                            <ButtonPrimary href="/portfolio">
                                View My Work
                            </ButtonPrimary>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="relative w-full aspect-[3/4] md:aspect-square bg-gray-900 rounded-3xl overflow-hidden border border-white/10"
                        >
                            <Image
                                src="/assets/hero-image-portrait.jpg"
                                alt="Rakha Portrait"
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Experience / History Section could go here */}

            <Footer />
        </main>
    );
}
