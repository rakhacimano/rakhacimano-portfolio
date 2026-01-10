import { NextRequest, NextResponse } from 'next/server';
import { db, projects } from '@/lib/db';
import { eq } from 'drizzle-orm';

// GET /api/projects/id/[id] - Get project by ID
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const data = await db.select().from(projects).where(eq(projects.id, id));

        if (!data[0]) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        return NextResponse.json(data[0]);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
