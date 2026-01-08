"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { HambergerMenu } from "iconsax-react";
import ButtonPrimary from "./ButtonPrimary";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
    const pathname = usePathname();
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Hide Navbar on project detail pages (e.g. /portfolio/slug) but not on main portfolio page (/portfolio)
    const isProjectDetail = pathname.startsWith("/portfolio/") && pathname.split("/").length > 2;

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

    if (isProjectDetail) return null;

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/portfolio", label: "Work" },
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
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                navLinks={navLinks}
            />
        </>
    );
}
