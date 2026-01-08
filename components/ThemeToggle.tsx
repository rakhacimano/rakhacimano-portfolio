"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun1 } from "iconsax-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 items-center mix-blend-difference">
            <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-12 h-12 rounded-full bg-white text-dark flex items-center justify-center hover:scale-110 transition-transform shadow-lg focus:outline-none"
                aria-label="Toggle Theme"
            >
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={theme}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {theme === "dark" ? (
                            <Sun1 size="24" variant="Bold" />
                        ) : (
                            <Moon size="24" variant="Bold" />
                        )}
                    </motion.div>
                </AnimatePresence>
            </button>
        </div>
    );
}
