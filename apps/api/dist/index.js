import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
import { apiRouter } from './routes';
app.get('/', (req, res) => {
    res.send('Portfolio API Running');
});
app.use('/api', apiRouter);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
