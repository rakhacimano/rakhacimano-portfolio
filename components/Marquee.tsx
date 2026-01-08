"use client";

import { motion } from "framer-motion";
import React from 'react';

const content = "RESEARCH • STRATEGY • ITERATION • EXECUTION • SHIP IT • REAL IMPACT • ";

export default function Marquee() {
    return (
        <div className="w-full bg-primary text-dark py-4 md:py-6 overflow-hidden border-y-4 border-dark">
            <div className="flex whitespace-nowrap overflow-hidden select-none">
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{
                        repeat: Infinity,
                        duration: 20,
                        ease: "linear",
                    }}
                    className="flex whitespace-nowrap"
                >
                    {[...Array(4)].map((_, i) => (
                        <h2 key={i} className="text-4xl md:text-6xl font-black tracking-tight uppercase mr-8">
                            {content}
                        </h2>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
