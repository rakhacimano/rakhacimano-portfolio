import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import sharp from 'sharp';

// Initialize Supabase client lazily or inside handler to avoid build errors
const getSupabase = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || '';

    if (!supabaseUrl || !supabaseKey) {
        throw new Error('Supabase URL or Key missing in environment variables');
    }
    return createClient(supabaseUrl, supabaseKey);
};

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('image') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Determine bucket from query param
        const url = new URL(request.url);
        const bucket = url.searchParams.get('bucket') === 'portfolio-images'
            ? 'portfolio-images'
            : 'blog-images';

        // Read file to buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Compress image with sharp
        const compressedBuffer = await sharp(buffer)
            .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
            .webp({ quality: 80 })
            .toBuffer();

        const fileName = `${Date.now()}-${file.name.split('.')[0]}.webp`;

        // Upload to Supabase Storage
        const { data, error } = await getSupabase().storage
            .from(bucket)
            .upload(fileName, compressedBuffer, {
                contentType: 'image/webp',
                upsert: false
            });

        if (error) {
            console.error('Supabase Upload Error:', error);
            return NextResponse.json({ error: 'Upload failed', details: error.message }, { status: 500 });
        }

        // Get public URL
        const { data: { publicUrl } } = getSupabase().storage
            .from(bucket)
            .getPublicUrl(fileName);

        return NextResponse.json({ url: publicUrl });
    } catch (error: any) {
        console.error('Upload Error:', error);
        return NextResponse.json({ error: 'Image upload failed' }, { status: 500 });
    }
}

// Disable body parser for file uploads
export const config = {
    api: {
        bodyParser: false,
    },
};
