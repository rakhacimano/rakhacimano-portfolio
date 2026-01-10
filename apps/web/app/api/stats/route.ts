import { NextResponse } from 'next/server';
import { db, blogs, projects, users } from '@/lib/db';
import { count } from 'drizzle-orm';

// GET /api/stats - Dashboard statistics
export async function GET() {
    try {
        const [blogCount] = await db.select({ value: count() }).from(blogs);
        const [projectCount] = await db.select({ value: count() }).from(projects);
        const [userCount] = await db.select({ value: count() }).from(users);

        return NextResponse.json({
            blogs: blogCount?.value || 0,
            projects: projectCount?.value || 0,
            users: userCount?.value || 0,
            visitors: 12400 // Mock for now
        });
    } catch (error: any) {
        console.error('Failed to fetch stats', error);
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
}
