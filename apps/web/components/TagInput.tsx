import { useState, KeyboardEvent, ChangeEvent } from "react";
import { X } from "lucide-react";

interface TagInputProps {
    value: string[];
    onChange: (tags: string[]) => void;
    placeholder?: string;
}

export default function TagInput({ value, onChange, placeholder = "Type and press space..." }: TagInputProps) {
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            addTag();
        } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
            removeTag(value.length - 1);
        }
    };

    const addTag = () => {
        const trimmedInput = inputValue.trim();
        if (trimmedInput && !value.includes(trimmedInput)) {
            onChange([...value, trimmedInput]);
            setInputValue("");
        }
    };

    const removeTag = (index: number) => {
        const newTags = [...value];
        newTags.splice(index, 1);
        onChange(newTags);
    };

    return (
        <div className="flex flex-wrap items-center gap-2 p-2 bg-white border border-slate-200 rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
            {value.map((tag, index) => (
                <span key={index} className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm font-bold animate-in fade-in zoom-in duration-200">
                    {tag}
                    <button
                        type="button"
                        onClick={() => removeTag(index)}
                        className="hover:text-red-500 transition-colors"
                    >
                        <X size={14} />
                    </button>
                </span>
            ))}
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={addTag}
                className="flex-1 bg-transparent border-none outline-none text-sm min-w-[120px] text-[#0d141b] placeholder:text-slate-400"
                placeholder={value.length === 0 ? placeholder : ""}
            />
        </div>
    );
}
