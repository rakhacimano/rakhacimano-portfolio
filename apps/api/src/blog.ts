import { Router } from 'express';
import { db, blogs, users } from '@repo/db';
import { eq, desc } from 'drizzle-orm';

const router = Router();

// Get all blogs
router.get('/', async (req, res) => {
    try {
        const data = await db.query.blogs.findMany({
            orderBy: [desc(blogs.createdAt)],
            with: {
                author: true
            }
        });

        // Map data to match frontend expectations if needed, or rely on relation
        // Frontend expects author.name, author.role, author.avatar
        // Ensure dummy data or real data has these.
        // If author relation returns null (it shouldn't if constrained), handle it.
        const mappedData = data.map(blog => ({
            ...blog,
            author: blog.author || { name: 'Unknown', role: 'Author', avatar: '' }
        }));

        res.json(mappedData);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Get blog by ID
router.get('/id/:id', async (req, res) => {
    try {
        const data = await db.query.blogs.findFirst({
            where: eq(blogs.id, req.params.id),
            with: {
                author: true
            }
        });

        if (!data) return res.status(404).json({ error: 'Blog not found' });

        res.json({
            ...data,
            author: data.author || { name: 'Unknown', role: 'Author', avatar: '' }
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Get blog by slug
router.get('/:slug', async (req, res) => {
    try {
        const data = await db.query.blogs.findFirst({
            where: eq(blogs.slug, req.params.slug),
            with: {
                author: true
            }
        });

        if (!data) return res.status(404).json({ error: 'Blog not found' });

        res.json({
            ...data,
            author: data.author || { name: 'Unknown', role: 'Author', avatar: '' }
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Create blog
router.post('/', async (req, res) => {
    try {
        // Map snake_case from frontend to camelCase for Drizzle
        const blogData = {
            title: req.body.title,
            slug: req.body.slug,
            excerpt: req.body.excerpt,
            content: req.body.content,
            category: req.body.category,
            coverImage: req.body.cover_image,
            thumbnail: req.body.cover_image, // Use same as cover
            tags: req.body.tags,
            readingTime: req.body.reading_time,
            published: req.body.published,
            authorId: req.body.author_id,
        };
        const data = await db.insert(blogs).values(blogData).returning();
        res.json(data[0]);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Update blog
router.put('/:id', async (req, res) => {
    try {
        // Map snake_case from frontend to camelCase for Drizzle
        const updateData: any = {};
        if (req.body.title !== undefined) updateData.title = req.body.title;
        if (req.body.slug !== undefined) updateData.slug = req.body.slug;
        if (req.body.excerpt !== undefined) updateData.excerpt = req.body.excerpt;
        if (req.body.content !== undefined) updateData.content = req.body.content;
        if (req.body.category !== undefined) updateData.category = req.body.category;
        if (req.body.cover_image !== undefined) {
            updateData.coverImage = req.body.cover_image;
            updateData.thumbnail = req.body.cover_image;
        }
        if (req.body.tags !== undefined) updateData.tags = req.body.tags;
        if (req.body.reading_time !== undefined) updateData.readingTime = req.body.reading_time;
        if (req.body.published !== undefined) updateData.published = req.body.published;
        updateData.updatedAt = new Date();

        const data = await db.update(blogs).set(updateData).where(eq(blogs.id, req.params.id)).returning();
        res.json(data[0]);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Delete blog
router.delete('/:id', async (req, res) => {
    try {
        await db.delete(blogs).where(eq(blogs.id, req.params.id));
        res.json({ message: 'Blog deleted' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export { router as blogRouter };
