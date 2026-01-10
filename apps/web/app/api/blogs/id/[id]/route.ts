import { NextRequest, NextResponse } from 'next/server';
import { db, blogs } from '@/lib/db';
import { eq } from 'drizzle-orm';

// GET /api/blogs/id/[id] - Get blog by ID
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const data = await db.query.blogs.findFirst({
            where: eq(blogs.id, id),
            with: {
                author: true
            }
        });

        if (!data) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json({
            ...data,
            author: data.author || { name: 'Unknown', role: 'Author', avatar: '' }
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
