import express from 'express';
import { authenticateUser, createUser, getUserByEmail, getUserById } from '../db/users.js';
const usersRouter = express.Router();
usersRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await getUserById(id);
        if (typeof response === 'string') {
            const error = response;
            res.send({
                error
            });
        }
        else {
            const user = response;
            res.send({
                success: `User ${id} found`,
                user
            });
        }
    }
    catch (err) {
        console.error(err);
        res.send({
            error: err
        });
    }
});
usersRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const response = await authenticateUser({ email, password });
        if (typeof response === 'string') {
            const error = response;
            res.send({
                error
            });
        }
        else {
            const user = response;
            res.send({
                success: 'Authentication successful',
                user
            });
        }
    }
    catch (err) {
        console.error(err);
        res.send({
            error: err
        });
    }
});
usersRouter.get('/auth/google', async (req, res) => {
    try {
        // @ts-ignore
        if (!req.user || !req.user.email) {
            res.send({
                error: 'No user received from Google'
            });
        }
        else {
            //@ts-ignore
            let user = await getUserByEmail(req.user.email);
            if (typeof user === 'string') {
                //@ts-ignore
                user = await createUser({ email: req.user.email, password: null });
            }
            res.send({ userInfo: user, loggedIn: true });
        }
    }
    catch (err) {
        console.error(err);
        res.send({
            error: err
        });
    }
});
usersRouter.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const response = await createUser({ email, password });
        if (typeof response === 'string') {
            const error = response;
            res.send({
                error
            });
        }
        else {
            const user = response;
            res.send({
                success: 'Registration successful',
                user
            });
        }
    }
    catch (err) {
        console.error(err);
        res.send({
            error: err
        });
    }
});
export default usersRouter;
