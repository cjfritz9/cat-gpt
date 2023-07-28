import express from 'express';
import passport from 'passport';
const authRouter = express.Router();
authRouter.get('/logout', async (req, res) => {
    //@ts-ignore
    req.logout();
    return res.send({ success: 'Logout successful' });
});
authRouter.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/failure',
    successRedirect: '/login/oauth/google',
    // session: true | default
    scope: ['email']
}), (_req, res) => {
    res.send({ success: 'Google response successful' });
});
export default authRouter;
