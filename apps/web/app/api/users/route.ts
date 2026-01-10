import { NextResponse } from 'next/server';
import { db, users } from '@/lib/db';
import { desc } from 'drizzle-orm';

// GET /api/users - List all users
export async function GET() {
    try {
        const data = await db.select().from(users).orderBy(desc(users.createdAt));
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
