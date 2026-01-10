import { NextRequest, NextResponse } from 'next/server';
import { db, blogs } from '@/lib/db';
import { desc } from 'drizzle-orm';

// GET /api/blogs - List all blogs with author
export async function GET() {
    try {
        if (!process.env.DATABASE_URL) {
            console.warn('DATABASE_URL is missing, returning empty list (build mode?)');
            return NextResponse.json([]);
        }

        const data = await db.query.blogs.findMany({
            orderBy: [desc(blogs.createdAt)],
            with: {
                author: true
            }
        });

        const mappedData = data.map(blog => ({
            ...blog,
            author: blog.author || { name: 'Unknown', role: 'Author', avatar: '' }
        }));

        return NextResponse.json(mappedData);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST /api/blogs - Create new blog
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const blogData = {
            title: body.title,
            slug: body.slug,
            excerpt: body.excerpt,
            content: body.content,
            category: body.category,
            coverImage: body.cover_image,
            thumbnail: body.cover_image,
            tags: body.tags,
            readingTime: body.reading_time,
            published: body.published,
            authorId: body.author_id,
        };

        const data = await db.insert(blogs).values(blogData).returning();
        return NextResponse.json(data[0]);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
