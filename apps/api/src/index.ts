import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Logging middleware - first
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// CORS - before everything
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Root endpoint
app.get('/', (req, res) => {
    res.send('Portfolio API Running');
});

// AUTH ROUTES - BEFORE express.json() so better-auth can parse its own body
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth.js';

const authHandler = toNodeHandler(auth);
app.all('/api/auth/*', (req, res, next) => {
    console.log(`[AUTH] Handling ${req.method} ${req.url}`);
    const start = Date.now();
    res.on('finish', () => {
        console.log(`[AUTH] Completed ${req.method} ${req.url} in ${Date.now() - start}ms with status ${res.statusCode}`);
    });
    authHandler(req, res, next);
});

// JSON body parser - AFTER auth routes
app.use(express.json());

// API routes - after JSON parser
// API routes - after JSON parser
import { apiRouter } from './routes.js';
app.use('/api', apiRouter);

// Serve static uploads
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

