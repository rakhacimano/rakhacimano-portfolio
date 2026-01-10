import { Router } from 'express';
import multer from 'multer';
import sharp from 'sharp';
import { supabase } from './lib/supabase.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Upload endpoint with bucket selection
// Usage: POST /api/upload?bucket=blog-images or POST /api/upload?bucket=portfolio-images
router.post('/', upload.single('image'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    try {
        // Determine bucket - default to blog-images
        const bucket = req.query.bucket === 'portfolio-images' ? 'portfolio-images' : 'blog-images';

        // Compress image
        const compressedBuffer = await sharp(req.file.buffer)
            .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
            .webp({ quality: 80 })
            .toBuffer();

        const fileName = `${Date.now()}-${req.file.originalname.split('.')[0]}.webp`;

        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(fileName, compressedBuffer, {
                contentType: 'image/webp',
                upsert: false
            });

        if (error) {
            console.error('Supabase Upload Error:', error);
            return res.status(500).json({ error: 'Upload to storage failed', details: error.message });
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from(bucket)
            .getPublicUrl(fileName);

        res.json({ url: publicUrl });
    } catch (error) {
        console.error('Upload Error:', error);
        res.status(500).json({ error: 'Image upload failed' });
    }
});

export { router as uploadRouter };
