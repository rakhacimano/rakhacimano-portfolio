"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Navbar() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    });

    return (
        <motion.nav
            className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 md:px-10 md:py-5 transition-all duration-300 ${isScrolled
                ? "bg-dark/90 backdrop-blur-md py-3 shadow-lg shadow-black/20"
                : "mix-blend-difference"
                }`}
        >
            <Link href="/" className="relative w-32 h-8 md:w-40 md:h-10 hover:scale-105 transition-transform">
                <Image
                    src="/assets/logo-white.png"
                    alt="Logo"
                    fill
                    className="object-contain object-left"
                />
            </Link>

            <div className={`flex items-center gap-8 md:gap-12 ${isScrolled ? "text-white" : "text-white mix-blend-difference"}`}>
                <Link href="#work" className="hidden md:block text-sm uppercase tracking-widest hover:text-primary transition-colors font-medium">
                    Work
                </Link>
                <Link href="#process" className="hidden md:block text-sm uppercase tracking-widest hover:text-primary transition-colors font-medium">
                    Process
                </Link>
                <Link href="#about" className="hidden md:block text-sm uppercase tracking-widest hover:text-primary transition-colors font-medium">
                    About
                </Link>
                <Link
                    href="#contact"
                    className="hidden md:block text-sm uppercase tracking-widest hover:text-primary transition-colors font-medium"
                >
                    Let's Talk
                </Link>
                <Link
                    href="https://drive.google.com/file/d/1itoSGtrVvJOHdxTIV9Kp4KGz2LxB33mZ/view"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-dark px-5 py-2 md:px-6 md:py-3 text-sm font-bold uppercase tracking-wide hover:bg-white transition-colors"
                >
                    Resume
                </Link>
            </div>
        </motion.nav>
    );
}
