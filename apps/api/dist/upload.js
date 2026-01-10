import { Router } from 'express';
import multer from 'multer';
import sharp from 'sharp';
import { createClient } from '@supabase/supabase-js';
const router = Router();
const upload = multer({ storage: multer.memoryStorage() });
// Initialize Supabase client
const supabase = createClient('https://ppmplykbiwnftsrrxbuw.supabase.co', process.env.SUPABASE_KEY // Need to ensure this is available
);
router.post('/', upload.single('image'), async (req, res) => {
    if (!req.file)
        return res.status(400).json({ error: 'No file uploaded' });
    try {
        // Compress image
        const compressedBuffer = await sharp(req.file.buffer)
            .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
            .webp({ quality: 80 })
            .toBuffer();
        const fileName = `${Date.now()}-${req.file.originalname.split('.')[0]}.webp`;
        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
            .from('portfolio-images') // Bucket name
            .upload(fileName, compressedBuffer, {
            contentType: 'image/webp',
            upsert: false
        });
        if (error)
            throw error;
        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('portfolio-images')
            .getPublicUrl(fileName);
        res.json({ url: publicUrl });
    }
    catch (error) {
        console.error('Upload Error:', error);
        res.status(500).json({ error: 'Image upload failed' });
    }
});
export { router as uploadRouter };
