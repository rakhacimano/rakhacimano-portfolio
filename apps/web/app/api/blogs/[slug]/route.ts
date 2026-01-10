import { NextRequest, NextResponse } from 'next/server';
import { db, blogs } from '@/lib/db';
import { eq } from 'drizzle-orm';

// GET /api/blogs/[slug] - Get blog by slug
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        if (!process.env.DATABASE_URL) {
            console.warn('DATABASE_URL is missing, returning 404 (build mode?)');
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        const { slug } = await params;
        const data = await db.query.blogs.findFirst({
            where: eq(blogs.slug, slug),
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

// PUT /api/blogs/[slug] - Update blog (using ID from slug param for backwards compat)
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const body = await request.json();

        const updateData: any = {};
        if (body.title !== undefined) updateData.title = body.title;
        if (body.slug !== undefined) updateData.slug = body.slug;
        if (body.excerpt !== undefined) updateData.excerpt = body.excerpt;
        if (body.content !== undefined) updateData.content = body.content;
        if (body.category !== undefined) updateData.category = body.category;
        if (body.cover_image !== undefined) {
            updateData.coverImage = body.cover_image;
            updateData.thumbnail = body.cover_image;
        }
        if (body.tags !== undefined) updateData.tags = body.tags;
        if (body.reading_time !== undefined) updateData.readingTime = body.reading_time;
        if (body.published !== undefined) updateData.published = body.published;
        updateData.updatedAt = new Date();

        // The slug param is actually the ID in the admin panel
        const data = await db.update(blogs).set(updateData).where(eq(blogs.id, slug)).returning();
        return NextResponse.json(data[0]);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE /api/blogs/[slug]
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        await db.delete(blogs).where(eq(blogs.id, slug));
        return NextResponse.json({ message: 'Blog deleted' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
