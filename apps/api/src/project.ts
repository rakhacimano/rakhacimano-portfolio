import { Router } from 'express';
import { db, projects } from '@repo/db';
import { eq, desc } from 'drizzle-orm';

const router = Router();

// Get all projects
router.get('/', async (req, res) => {
    try {
        const data = await db.select().from(projects).orderBy(desc(projects.createdAt));
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Get project by ID
router.get('/id/:id', async (req, res) => {
    try {
        const data = await db.select().from(projects).where(eq(projects.id, req.params.id));
        if (!data[0]) return res.status(404).json({ error: 'Project not found' });
        res.json(data[0]);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Get project by slug
router.get('/:slug', async (req, res) => {
    try {
        const data = await db.select().from(projects).where(eq(projects.slug, req.params.slug));
        if (!data[0]) return res.status(404).json({ error: 'Project not found' });
        res.json(data[0]);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Create project
router.post('/', async (req, res) => {
    try {
        const data = await db.insert(projects).values(req.body).returning();
        res.json(data[0]);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Update project
router.put('/:id', async (req, res) => {
    try {
        const data = await db.update(projects).set(req.body).where(eq(projects.id, req.params.id)).returning();
        res.json(data[0]);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Delete project
router.delete('/:id', async (req, res) => {
    try {
        await db.delete(projects).where(eq(projects.id, req.params.id));
        res.json({ message: 'Project deleted' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export { router as projectRouter };
