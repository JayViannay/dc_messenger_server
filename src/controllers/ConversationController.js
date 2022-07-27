/* eslint-disable no-unused-vars */
import express from 'express';
import ConversationModel from '../models/ConversationModel.js';

const router = express.Router();

router
    /**
     * url to get participants from a conversation
     */
    .get('/:id/participants', async (req, res) => {
        //::todo
    })

    /**
     * url to get messages from a conversation
     */
    .get('/:id/messages', async (req, res) => {
        try {
            const results = await ConversationModel.getMessages(Number(req.params.id));
            res.json(results).status(200);
        } catch (err) {
            res.json({ message: 'Error', error: err }).status(500);
        }
    })

    /**
     * create a new conversation
     * fields for a conversation : you don't need to give anything to create a conversation
     * id is auto increment and last_message_id is nullable 
     */
    .post('/', async (req, res) => {
        //::todo

        // 1 - Get the participants id (req.body.participants)
        // 2 - Handle conversation between 2 participants : 
        //      2.a Check if conversation exist
        //      2.a If the conversation exist so you just have to create the new message & update last_message_id of the conversation
        //          then return the conversation_id (client exepected output like : { conversation_id : int_value }
        // 3 Handle converation with more than 2 participants / create a conversation in any case :
        //      3.a create a new conversation and keep the last insert id 
        //      3.b add all participants in conversation_user table
        //      3.c create the message and keep the last insert id
        //      3.d update the last_message_id of the conversation
        //      3.c return the conversation_id (client exepected output like : { conversation_id : int_value }
    });

export default router;