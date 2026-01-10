import { NextRequest, NextResponse } from 'next/server';
import { db, projects } from '@/lib/db';
import { eq } from 'drizzle-orm';

// GET /api/projects/[slug] - Get project by slug
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const data = await db.select().from(projects).where(eq(projects.slug, slug));

        if (!data[0]) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        return NextResponse.json(data[0]);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PUT /api/projects/[slug] - Update project (slug is actually ID in admin)
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
        if (body.description !== undefined) updateData.description = body.description;
        if (body.content !== undefined) updateData.content = body.content;
        if (body.cover_image !== undefined) {
            updateData.coverImage = body.cover_image;
            updateData.thumbnail = body.cover_image;
        }
        if (body.images !== undefined) updateData.images = body.images;
        if (body.tags !== undefined) updateData.techStack = body.tags;
        if (body.github_link !== undefined) updateData.repoUrl = body.github_link;
        if (body.demo_link !== undefined) updateData.demoUrl = body.demo_link;
        if (body.published !== undefined) updateData.published = body.published;
        updateData.updatedAt = new Date();

        const data = await db.update(projects).set(updateData).where(eq(projects.id, slug)).returning();
        return NextResponse.json(data[0]);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE /api/projects/[slug]
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        await db.delete(projects).where(eq(projects.id, slug));
        return NextResponse.json({ message: 'Project deleted' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
