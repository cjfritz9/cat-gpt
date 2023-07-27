import express from 'express';
import cors from 'cors';
import apiRouter from './routes/index.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const app = express();
app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, _res, next) => {
    const bodyCopy = { ...req.body };
    if (bodyCopy.password) {
        bodyCopy.password = 'hidden';
    }
    console.log('<-----Body Logger Start----->');
    console.log('Received: ', new Date().toLocaleString());
    console.log('Request Body: ', bodyCopy);
    console.log('<-----Body Logger End----->');
    next();
});
app.get('/test', async (_req, res) => {
    res.send('Server is Online');
});
app.use('/api', apiRouter);
app.get('/*', (_req, res) => {
    res.sendFile(path.join(path.join(__dirname, 'public', 'index.html')));
});
