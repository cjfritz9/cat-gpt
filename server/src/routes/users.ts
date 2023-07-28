import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import {
  authenticateUser,
  createUser,
  getUserByEmail,
  getUserById
} from '../db/users.js';
dotenv.config();
const usersRouter = express.Router();

usersRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const response = await getUserById(id);
    if (typeof response === 'string') {
      const error = response;
      res.send({
        error
      });
    } else {
      const user = response;
      res.send({
        success: `User ${id} found`,
        user
      });
    }
  } catch (err) {
    console.error(err);
    res.send({
      error: err
    });
  }
});

usersRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const response = await authenticateUser({ email, password });
    if (typeof response === 'string') {
      const error = response;
      res.send({
        error
      });
    } else {
      const user = response;
      res.send({
        success: 'Authentication successful',
        user
      });
    }
  } catch (err) {
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
    } else {
      //@ts-ignore
      let user = await getUserByEmail(req.user.email);
      if (typeof user === 'string') {
        user = await createUser({
          //@ts-ignore
          email: req.user.email,
          password: process.env.GOOGLE_OAUTH_PASSWORD!,
          isSSO: true
        });
      }
      console.log('user from db: ', await user);
      res.send({ userInfo: await user, loggedIn: true });
    }
  } catch (err) {
    console.error(err);
    res.send({
      error: err
    });
  }
});

usersRouter.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const response = await createUser({ email, password });
    if (typeof response === 'string') {
      const error = response;
      res.send({
        error
      });
    } else {
      const user = response;
      res.send({
        success: 'Registration successful',
        user
      });
    }
  } catch (err) {
    console.error(err);
    res.send({
      error: err
    });
  }
});

export default usersRouter;
