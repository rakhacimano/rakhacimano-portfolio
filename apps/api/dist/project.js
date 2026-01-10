import { Router } from 'express';
import { db, projects } from '@repo/db';
import { eq, desc } from 'drizzle-orm';
const router = Router();
// Get all projects
router.get('/', async (req, res) => {
    try {
        const allProjects = await db.select().from(projects).orderBy(desc(projects.createdAt));
        res.json(allProjects);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});
// Get project by slug
router.get('/:slug', async (req, res) => {
    try {
        const project = await db.select().from(projects).where(eq(projects.slug, req.params.slug)).limit(1);
        if (!project.length)
            return res.status(404).json({ error: 'Project not found' });
        res.json(project[0]);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch project' });
    }
});
// Create project
router.post('/', async (req, res) => {
    try {
        const newProject = await db.insert(projects).values(req.body).returning();
        res.json(newProject[0]);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create project' });
    }
});
// Update project
router.put('/:id', async (req, res) => {
    try {
        const updatedProject = await db.update(projects).set(req.body).where(eq(projects.id, req.params.id)).returning();
        res.json(updatedProject[0]);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update project' });
    }
});
// Delete project
router.delete('/:id', async (req, res) => {
    try {
        await db.delete(projects).where(eq(projects.id, req.params.id));
        res.json({ message: 'Project deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete project' });
    }
});
export { router as projectRouter };
