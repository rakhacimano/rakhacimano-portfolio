"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { HambergerMenu, CloseSquare } from "iconsax-react";
import ButtonPrimary from "./ButtonPrimary";

export default function Navbar() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    });

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isMobileMenuOpen]);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/portfolio", label: "Work" },
        { href: "/#process", label: "Process" },
        { href: "/#contact", label: "Let's Talk" },
    ];

    return (
        <>
            <motion.nav
                className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 md:px-10 md:py-5 transition-all duration-300 ${isScrolled
                    ? "bg-dark/60 backdrop-blur-md py-3 shadow-lg shadow-black/20"
                    : "mix-blend-difference"
                    }`}
            >
                <Link href="/" className="relative w-32 h-8 md:w-40 md:h-10 transition-transform group z-50">
                    <Image
                        src="/assets/logo-white.png"
                        alt="Logo"
                        fill
                        className="object-contain object-left transition-opacity duration-300 group-hover:opacity-0"
                    />
                    <Image
                        src="/assets/logo-full-red.svg"
                        alt="Logo Red"
                        fill
                        className="object-contain object-left absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                </Link>

                {/* Desktop Menu */}
                <div className={`hidden md:flex items-center gap-8 md:gap-12 ${isScrolled ? "text-white" : "text-white mix-blend-difference"}`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="text-sm uppercase tracking-widest hover:text-primary transition-colors font-medium"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <ButtonPrimary
                        href="https://drive.google.com/file/d/1itoSGtrVvJOHdxTIV9Kp4KGz2LxB33mZ/view"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Resume
                    </ButtonPrimary>
                </div>

                {/* Mobile Hamburger Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="md:hidden text-white mix-blend-difference z-50 focus:outline-none"
                    aria-label="Open Menu"
                >
                    <HambergerMenu size="32" variant="Outline" color="white" />
                </button>
            </motion.nav>

            {/* Mobile Fullscreen Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 bg-dark z-[60] flex flex-col items-center justify-center text-white"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute top-6 right-6 text-white/50 hover:text-primary transition-colors"
                        >
                            <CloseSquare size="40" variant="Outline" color="white" />
                        </button>

                        <div className="flex flex-col gap-8 text-center">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-4xl font-black uppercase tracking-tighter hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="mt-8"
                            >
                                <ButtonPrimary
                                    href="https://drive.google.com/file/d/1itoSGtrVvJOHdxTIV9Kp4KGz2LxB33mZ/view"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    View Resume
                                </ButtonPrimary>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
