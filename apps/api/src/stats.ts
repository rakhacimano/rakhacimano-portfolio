import { Router } from 'express';
import { db, blogs, projects, users } from '@repo/db';
import { count } from 'drizzle-orm';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const [blogCount] = await db.select({ value: count() }).from(blogs);
        const [projectCount] = await db.select({ value: count() }).from(projects);
        const [userCount] = await db.select({ value: count() }).from(users);

        res.json({
            blogs: blogCount?.value || 0,
            projects: projectCount?.value || 0,
            users: userCount?.value || 0,
            visitors: 12400 // Mock for now or implement real tracking later
        });
    } catch (error) {
        console.error('Failed to fetch stats', error);
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

export { router as statsRouter };
