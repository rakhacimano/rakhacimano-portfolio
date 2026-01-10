"use client";

interface CategoryPillProps {
    label: string;
    isActive?: boolean;
    onClick?: () => void;
}

export default function CategoryPill({ label, isActive = false, onClick }: CategoryPillProps) {
    return (
        <button
            onClick={onClick}
            className={`
                px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide transition-all border
                ${isActive
                    ? "bg-white text-dark border-white"
                    : "bg-transparent text-gray-400 border-white/20 hover:border-white hover:text-white"
                }
            `}
        >
            {label}
        </button>
    );
}
