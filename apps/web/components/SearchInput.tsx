"use client";

import { Search } from "lucide-react";

interface SearchInputProps {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
}

export default function SearchInput({
    value,
    onChange,
    placeholder = "Search articles...",
    className = ""
}: SearchInputProps) {
    return (
        <div className={`relative w-full md:w-64 ${className}`}>
            <Search color="gray" className="absolute left-3 top-1/2 -translate-y-1/2" size={20} />
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full bg-dark/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
            />
        </div>
    );
}
