
import { Router } from 'express';
import { db, users } from '@repo/db';
import { desc } from 'drizzle-orm';

const router = Router();

// Get all users
router.get('/', async (req, res) => {
    try {
        const data = await db.select().from(users).orderBy(desc(users.createdAt));
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export { router as userRouter };
