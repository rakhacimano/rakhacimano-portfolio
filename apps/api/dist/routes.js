import { Router } from 'express';
// import { authRouter } from './auth'; // To be implemented
import { blogRouter } from './blog';
import { projectRouter } from './project';
import { uploadRouter } from './upload';
const router = Router();
router.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
// router.use('/auth', authRouter);
router.use('/blogs', blogRouter);
router.use('/projects', projectRouter);
router.use('/upload', uploadRouter);
router.use('/projects', projectRouter);
export { router as apiRouter };
