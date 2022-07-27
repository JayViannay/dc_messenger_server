/* eslint-disable no-unused-vars */
import express from 'express';
import MessageModel from '../models/MessageModel.js';
import ConversationModel from '../models/ConversationModel.js';

const router = express.Router(); 
router
    /**
     * create a new message
     * fields for : message author_id conversation_id created_at content
     */
    .post('/', async (req, res) => {
        const message = req.body;
        try {
            const newMsgId = await MessageModel.add(message);
            await ConversationModel.updateLastMessageId(message.conversation_id, newMsgId);
            res.send({ success : 'Message has been succesfully sent' }).status(200);
        } catch (err) {
            res.json({ errors: err }).status(500);
        }
            
    });

export default router;