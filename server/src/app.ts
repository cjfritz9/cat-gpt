import path from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';
import dotenv from 'dotenv';
import helmet from 'helmet';
import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();
dotenv.config();

const config = {
  google: {
    CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENTID!,
    CLIENT_SECRET: process.env.GOOGLE_OAUTH_SECRET!
  },
  cookie: {
    KEY_1: process.env.COOKIE_KEY_1!,
    KEY_2: process.env.COOKIE_KEY_2!
  }
};

const verifyCallback = (
  accessToken: string,
  _refreshToken: string,
  profile: any,
  done: Function
) => {
  console.log('token: ', accessToken);
  done(null, profile);
};

// Save the session to the Cookie
passport.serializeUser((user: any, done: Function) => {
  done(null, {
    email: user.emails[0].value,
    loggedIn: true
  });
});

// Read the session from the Cookie
passport.deserializeUser((obj: Object, done: Function) => {
  done(null, obj);
});

app.use(
  cors({
    origin: '*'
  })
);
app.use(helmet());
app.use(
  cookieSession({
    name: 'session',
    //hours * minutes * seconds * milliseconds = one day
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.cookie.KEY_1, config.cookie.KEY_2]
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

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

app.use((req, _res, next) => {
  const bodyCopy = { ...req.body };
  if (bodyCopy.password) {
    bodyCopy.password = 'hidden';
  }

  console.log('<-----Body Logger Start----->');
  console.log('Session User: ', req.user);
  console.log('Received: ', new Date().toLocaleString());
  console.log('Request Body: ', bodyCopy);
  console.log('<-----Body Logger End----->');

  next();
});

app.get('/test', async (_req, res) => {
  res.send('Server is Online');
});

import apiRouter from './routes/index.js';
app.use('/api', apiRouter);

app.get('/*', (_req, res) => {
  res.sendFile(path.join(path.join(__dirname, 'public', 'index.html')));
});
