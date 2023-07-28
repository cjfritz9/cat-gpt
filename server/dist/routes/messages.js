import express from 'express';
import { openai } from '../openai.js';
const messagesRouter = express.Router();
messagesRouter.post('/send', async (req, res) => {
    const body = req.body;
    if (!body[1]) {
        res.send({ error: 'Invalid Request, Try Again' });
    }
    else {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: body
        });
        if (!response.data.choices || !response.data.choices[0].message) {
            res.send({ error: 'Server Error, Wait and Try Again' });
        }
        else {
            res.send({ success: response.data.choices[0].message?.content });
        }
    }
});
export default messagesRouter;
