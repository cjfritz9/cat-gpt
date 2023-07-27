import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';

const authRouter = express.Router();
dotenv.config();

const config = {
  google: {
    CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENTID!,
    CLIENT_SECRET: process.env.GOOGLE_OAUTH_SECRET!
  }
};

const verifyCallback = (
  accessToken: string,
  _refreshToken: string,
  profile: any,
  done: Function
) => {
  console.log('Google Profile', profile);
  console.log(accessToken);
  done(null, profile);
};

passport.use(
  new Strategy(
    {
      callbackURL: '/api/auth/google/callback',
      clientID: config.google.CLIENT_ID,
      clientSecret: config.google.CLIENT_SECRET
    },
    verifyCallback
  )
);

authRouter.use(passport.initialize());

authRouter.get('/logout', async (req, res) => {
  res.send(req.originalUrl);
});

authRouter.get(
  '/google',
  passport.authenticate('google', {
    scope: ['email']
  }),
  async (req, res) => {
    res.send(req.originalUrl);
    console.log('Google response successful');
  }
);

authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/failure',
    successRedirect: '/',
    session: false,
    scope: ['email']
  }),
  (req, res) => {
    console.log('Google response successful');
    res.send(req.originalUrl);
  }
);

export default authRouter;
