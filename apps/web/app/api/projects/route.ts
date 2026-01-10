import { NextRequest, NextResponse } from 'next/server';
import { db, projects } from '@/lib/db';
import { desc } from 'drizzle-orm';

// GET /api/projects - List all projects
export async function GET() {
    try {
        const data = await db.select().from(projects).orderBy(desc(projects.createdAt));
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST /api/projects - Create new project
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const projectData = {
            title: body.title,
            slug: body.slug,
            description: body.description,
            content: body.content,
            coverImage: body.cover_image,
            thumbnail: body.cover_image,
            images: body.images,
            techStack: body.tags,
            repoUrl: body.github_link,
            demoUrl: body.demo_link,
            published: body.published,
        };

        const data = await db.insert(projects).values(projectData).returning();
        return NextResponse.json(data[0]);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
