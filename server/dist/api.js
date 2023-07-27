import express from 'express';
const apiRouter = express.Router();
import chatAppRouter from './routes/index.js';
apiRouter.use('/chat-app', chatAppRouter);
export default apiRouter;
