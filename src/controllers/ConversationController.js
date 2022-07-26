/* eslint-disable no-unused-vars */
import express from 'express';
import ConversationModel from '../models/ConversationModel.js';

const router = express.Router();

router
    //get participants of a conversation
    .get('/:id/participants', async (req, res) => {
        try {
            const result = await ConversationModel.getParticipants(Number(req.params.id));
            result ? (
                res.json(result).status(200)
            ) : res.json({ message : 'Conversation not found' }).status(404);
        } catch (err) {
            res.json({ message : 'Error', error : err }).status(500);
        }
       })  

    //aficher les messages d'une conversation
    .get('/:id/messages', async (req, res) => {
        try {
            const conversationExists = await ConversationModel.getMessages(Number(req.params.id));
            if (conversationExists) {
                const results = await ConversationModel.getMessages(Number(req.params.id))
                res.json(results).status(200)
            } else  res.json({ message : 'Conversation not found'}).status(404);
                } catch (err) {
                    res.json({ message : 'Error', error : err }).status(500);
                }
        })


    .post('/', async (req, res) => {
        //::todo
    });

export default router;