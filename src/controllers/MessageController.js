/* eslint-disable no-unused-vars */
import express from 'express';
import ConversationModel from '../models/ConversationModel.js';
import MessageModel from '../models/MessageModel.js';

const router = express.Router(); 
router
    /**
     * create a new message
     * fields for : message author_id conversation_id created_at content
     */
    .post('/', async (req, res) => {
       
        const message = req.body;
        try {
            const newMsgId = await MessageModel.add(message); //create the message and get the id of the message (insertId)
            await ConversationModel.updateLastMessageId(message.conversation_id, newMsgId); //update the conversation with the last id-message that was just created
            res.send({success : 'Message has been send succesfully'}).status(200); //{ if I have a key "success / message"}
        } catch (err) {
            res.json({ message : 'Error', error: err }).status(500);
        }
    });

export default router;