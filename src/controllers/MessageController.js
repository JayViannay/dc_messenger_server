/* eslint-disable no-unused-vars */
import express from 'express';
import ConversationModel from '../models/ConversationModel.js';
import MessageModel from '../models/MessageModel.js';

const router = express.Router();

router
    /* Méthode utilisée pour créer un nouveau message.*/
    .post('/', async (req, res) => {
        const message = req.body;
        try {
            const newMsgId = await MessageModel.add(message);
            await ConversationModel.updateLastMessageId(message.conversation_id, newMsgId);
            res.send({ success: 'Message added successfully !' }).status(200);
        } catch (err) {
            res.json({ message: 'Error', error: err }).status(500);
        }
    });

export default router;
