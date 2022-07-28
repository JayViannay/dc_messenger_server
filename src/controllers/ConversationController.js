/* eslint-disable no-unused-vars */
import express from 'express';
import ConversationModel from '../models/ConversationModel.js';
import MessageModel from '../models/MessageModel.js';
import ConversationService from '../service/ConversationService.js';

const router = express.Router();

router
    /**
     * url to get participants from a conversation
     */
    .get('/:id/participants', async (req, res) => {
        try {
            const listConversations = await ConversationModel.getParticipants(Number(req.params.id));
            res.json(listConversations).status(200);
        } catch (err) {
            res.json({ message: 'Error', error: err }).status(500);
        }
    })

    /**
     * url to get messages from a conversation
     */
    .get('/:id/messages', async (req, res) => {
        try {
            const listMessages = await ConversationModel.getMessages(Number(req.params.id));
            res.json(listMessages).status(200);
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
        console.log(req.body);
        const participants = req.body.participants;
        try {
            // 2 - Handle conversation between 2 participants : 
            if (participants.length === 2) {
                //      2.a Check if conversation exist
                const convExist = await ConversationService.conversationAlreadyExist(participants);
                console.log(convExist);
                //      2.a If the conversation exist so you just have to create the new message & update last_message_id of the conversation
                //          then return the conversation_id (client exepected output like : { conversation_id : int_value }
            }
            // 3.a create a new conversation and keep the last insert id
            const newConvId = await ConversationModel.add();
            
            // 3.b add all participants in conversation_user table
            participants.forEach(userId => {
                ConversationModel.addParticipant(newConvId, userId);
            });

            // 3.c create the message and keep the last insert id
            const message = { author_id : req.body.author_id, conversation_id: newConvId, content: req.body.content, created_at : req.body.created_at };
            const newMessageId = await MessageModel.add(message);
            
            // 3.d update the last_message_id of the conversation
            await ConversationModel.updateLastMessageId(newConvId, newMessageId);

            // 3.c return the conversation_id (client exepected output like : { conversation_id : int_value }
            res.json({ conversation_id : newConvId}).status(200);
        } catch (err) {
            res.json({ message: 'Error', error: err }).status(500);
        }
    });

export default router;