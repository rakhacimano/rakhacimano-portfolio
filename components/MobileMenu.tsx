"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CloseSquare } from "iconsax-react";
import ButtonPrimary from "./ButtonPrimary";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    navLinks: { href: string; label: string }[];
}

export default function MobileMenu({ isOpen, onClose, navLinks }: MobileMenuProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: "-100%" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: "-100%" }}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 bg-dark z-[60] flex flex-col items-center justify-center text-white"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
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
                                    onClick={onClose}
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
                                onClick={onClose}
                            >
                                View Resume
                            </ButtonPrimary>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
