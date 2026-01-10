import { Router } from 'express';
import { db, blogs } from '@repo/db';
import { eq, desc } from 'drizzle-orm';
const router = Router();
// Get all blogs
router.get('/', async (req, res) => {
    try {
        const allBlogs = await db.select().from(blogs).orderBy(desc(blogs.createdAt));
        res.json(allBlogs);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch blogs' });
    }
});
// Get blog by slug
router.get('/:slug', async (req, res) => {
    try {
        const blog = await db.select().from(blogs).where(eq(blogs.slug, req.params.slug)).limit(1);
        if (!blog.length)
            return res.status(404).json({ error: 'Blog not found' });
        res.json(blog[0]);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch blog' });
    }
});
// Create blog
router.post('/', async (req, res) => {
    try {
        const newBlog = await db.insert(blogs).values(req.body).returning();
        res.json(newBlog[0]);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create blog' });
    }
});
// Update blog
router.put('/:id', async (req, res) => {
    try {
        const updatedBlog = await db.update(blogs).set(req.body).where(eq(blogs.id, req.params.id)).returning();
        res.json(updatedBlog[0]);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update blog' });
    }
});
// Delete blog
router.delete('/:id', async (req, res) => {
    try {
        await db.delete(blogs).where(eq(blogs.id, req.params.id));
        res.json({ message: 'Blog deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete blog' });
    }
});
export { router as blogRouter };
