/* eslint-disable no-unused-vars */
import express from 'express';
import ConversationModel from '../models/ConversationModel.js';
import ConversationService from '../service/ConversationService.js';
import MessageModel from '../models/MessageModel.js';
import UserModel from '../models/UserModel.js';

const router = express.Router();

router
    /**
     * url to get participants from a conversation
     */
    .get('/:id/participants', async (req, res) => {
        try {
            const results = await ConversationModel.getParticipants(
                Number(req.params.id)
            );
            res.json(results).status(200);
        } catch (err) {
            res.json({ message: 'Error', error: err }).status(500);
        }
    })

    /**
     * url to get messages from a conversation
     */
    .get('/:id/messages', async (req, res) => {
        try {
            const results = await ConversationModel.getMessages(
                Number(req.params.id)
            );
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
        try {
            const participants = req.body.participants;
            if (participants.length === 2) {
                const convExist = await ConversationService.conversationAlreadyExist(participants);
                console.log(convExist);
                if (convExist !== false) {
                    await ConversationService.updateConversation(req, convExist);
                    res.send({ conversation_id: convExist }).status(200);
                } else {
                    const newConversationId = await ConversationService.newConversation(participants, req);
                    res.send({ conversation_id: newConversationId }).status(200);
                }
            } else {
                const newConversationId = await ConversationService.newConversation(participants, req);
                res.send({ conversation_id: newConversationId }).status(200);
            }
        } catch (err) {
            res.json({ message: 'Error', error: err }).status(500);
        }
    });

export default router;
