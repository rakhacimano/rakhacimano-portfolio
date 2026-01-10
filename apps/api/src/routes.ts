import { Router } from 'express';
// import { authRouter } from './auth'; // To be implemented
import { blogRouter } from './blog.js';
import { projectRouter } from './project.js';
import { uploadRouter } from './upload.js';
import { userRouter } from './user.js'; // Import
import { statsRouter } from './stats.js';

const router = Router();

router.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// router.use('/auth', authRouter);
router.use('/blogs', blogRouter);
router.use('/projects', projectRouter);
router.use('/users', userRouter); // Register
router.use('/upload', uploadRouter);
router.use('/stats', statsRouter);

export { router as apiRouter };
