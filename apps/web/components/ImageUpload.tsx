
"use client";

import { useState } from "react";
import { fetchAPI } from "@/lib/api";
import { Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
    value: string | string[];
    onChange: (value: string | string[]) => void;
    multiple?: boolean;
    label?: string;
    maxFiles?: number;
    bucket?: 'blog-images' | 'portfolio-images'; // Supabase bucket selection
}

export default function ImageUpload({ value, onChange, multiple = false, label = "Upload Image", maxFiles = 10, bucket = 'blog-images' }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        const newUrls: string[] = [];

        try {
            for (let i = 0; i < files.length; i++) {
                const formData = new FormData();
                formData.append('image', files[i]);

                // Upload to Supabase Storage via API with bucket selection
                const res = await fetch(`/api/upload?bucket=${bucket}`, {
                    method: 'POST',
                    body: formData,
                });

                if (!res.ok) throw new Error('Upload failed');
                const data = await res.json();
                newUrls.push(data.url);
            }

            if (multiple) {
                const current = Array.isArray(value) ? value : [];
                onChange([...current, ...newUrls]);
            } else {
                onChange(newUrls[0]);
            }
            toast.success("Image uploaded successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to upload image");
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (indexToRemove: number) => {
        if (multiple && Array.isArray(value)) {
            onChange(value.filter((_, i) => i !== indexToRemove));
        } else {
            onChange("");
        }
    };

    // Helper to render preview
    const renderPreview = (url: string, index: number) => (
        <div key={url + index} className="relative aspect-square bg-slate-100 rounded-lg overflow-hidden group border border-slate-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="Uploaded" className="absolute inset-0 w-full h-full object-contain" />
            <button
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                type="button"
            >
                <X size={14} />
            </button>
        </div>
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-[#0d141b] text-sm font-bold uppercase tracking-wide">{label}</h3>
                {multiple && <span className="text-xs text-[#4c739a]">Max {maxFiles} images</span>}
            </div>

            {/* Drag & Drop Area (Simplified as click to upload for now) */}
            <label className="border-2 border-dashed border-primary/30 bg-primary/5 rounded-xl p-8 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-primary/10 transition-colors">
                <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple={multiple}
                    onChange={handleUpload}
                    disabled={uploading}
                />
                <div className="bg-primary/20 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform">
                    {uploading ? (
                        <Loader2 className="text-primary animate-spin" size={24} />
                    ) : (
                        <Upload className="text-primary" size={24} />
                    )}
                </div>
                <p className="text-[#0d141b] font-semibold text-sm">
                    {uploading ? "Uploading..." : "Click to upload or drag and drop"}
                </p>
                <p className="text-[#4c739a] text-xs mt-1">PNG, JPG or WebP</p>
            </label>

            {/* Previews */}
            {multiple ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {Array.isArray(value) && value.map((url, i) => renderPreview(url, i))}
                </div>
            ) : (
                value && typeof value === 'string' && (
                    <div className="w-40">
                        {renderPreview(value, 0)}
                    </div>
                )
            )}
        </div>
    );
}
