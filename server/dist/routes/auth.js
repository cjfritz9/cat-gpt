import express from 'express';
import passport from 'passport';
const authRouter = express.Router();
authRouter.get('/logout', async (req, res) => {
    res.send(req.originalUrl);
});
authRouter.get('/google', passport.authenticate('google', {
    scope: ['email']
}), async (req, res) => {
    res.send(req.originalUrl);
    console.log('Google response successful');
});
authRouter.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/failure',
    successRedirect: '/login/oauth/google',
    // session: true | default
    scope: ['email']
}), (req, res) => {
    console.log('Google response successful');
    res.send(req.originalUrl);
});
export default authRouter;
