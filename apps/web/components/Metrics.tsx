"use client";

import { motion } from "framer-motion";
import { Users, TrendingUp, PackageCheck, Calendar } from "lucide-react";

const metrics = [
    {
        label: "Active Users Impacted",
        value: "5M+",
        icon: Users
    },
    {
        label: "Conversion Lift",
        value: "40%",
        icon: TrendingUp
    },
    {
        label: "Products Launched",
        value: "12+",
        icon: PackageCheck
    },
    {
        label: "Years Experience",
        value: "07",
        icon: Calendar
    },
];

export default function Metrics() {
    return (
        <section className="bg-dark text-white border-y border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {metrics.map((metric, index) => (
                    <div
                        key={index}
                        className="border-b md:border-b-0 border-white/10 last:border-b-0 md:border-r last:border-r-0 p-12 flex flex-col items-center justify-center text-center group hover:bg-primary hover:text-dark transition-all duration-300 relative overflow-hidden"
                    >
                        <div className="mb-6 opacity-50 group-hover:opacity-100 transition-opacity">
                            <metric.icon size="40" />
                        </div>
                        <motion.span
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="text-6xl md:text-7xl font-black mb-4 tracking-tighter leading-none group-hover:scale-110 transition-transform duration-300"
                        >
                            {metric.value}
                        </motion.span>
                        <span className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] font-bold opacity-70 group-hover:opacity-100">
                            {metric.label}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}
