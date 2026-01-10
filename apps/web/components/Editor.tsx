"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ImageExtension from '@tiptap/extension-image';
import { Bold, Italic, Heading2, Image as ImageIcon } from 'lucide-react';
import { useCallback } from 'react';
import { fetchAPI } from '@/lib/api';

interface EditorProps {
    content: string;
    onChange: (content: string) => void;
}

export default function Editor({ content, onChange }: EditorProps) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            ImageExtension.configure({
                inline: true,
                allowBase64: true,
            }),
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-lg max-w-none focus:outline-none min-h-[300px] text-[#0d141b]',
            },
        },
    });

    const addImage = useCallback(() => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async () => {
            if (input.files?.length) {
                const file = input.files[0];
                const formData = new FormData();
                formData.append('image', file);

                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/upload`, {
                        method: 'POST',
                        body: formData,
                    });
                    const data = await res.json();

                    if (data.url && editor) {
                        editor.chain().focus().setImage({ src: data.url }).run();
                    }
                } catch (error) {
                    console.error('Upload failed', error);
                    alert('Image upload failed');
                }
            }
        };
        input.click();
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
            <div className="bg-slate-50 border-b border-slate-200 p-2 flex gap-2">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-2 rounded text-slate-500 ${editor.isActive('bold') ? 'bg-slate-200 text-slate-900' : 'hover:bg-slate-100 hover:text-slate-900'}`}
                >
                    <Bold size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-2 rounded text-slate-500 ${editor.isActive('italic') ? 'bg-slate-200 text-slate-900' : 'hover:bg-slate-100 hover:text-slate-900'}`}
                >
                    <Italic size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`p-2 rounded text-slate-500 ${editor.isActive('heading', { level: 2 }) ? 'bg-slate-200 text-slate-900' : 'hover:bg-slate-100 hover:text-slate-900'}`}
                >
                    <Heading2 size={16} />
                </button>
                <button
                    type="button"
                    onClick={addImage}
                    className="p-2 rounded text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                >
                    <ImageIcon size={16} />
                </button>
            </div>
            <div className="p-4 bg-white">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}


