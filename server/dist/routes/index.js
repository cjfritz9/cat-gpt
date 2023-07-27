import express from 'express';
import cors from 'cors';
const apiRouter = express.Router();
apiRouter.use(cors({
    origin: '*'
}));
import messagesRouter from './messages.js';
apiRouter.use('/messages', messagesRouter);
import usersRouter from './users.js';
apiRouter.use('/users', usersRouter);
import tokensRouter from './tokens.js';
apiRouter.use('/tokens', tokensRouter);
import authRouter from './auth.js';
apiRouter.use('/auth', authRouter);
export default apiRouter;
