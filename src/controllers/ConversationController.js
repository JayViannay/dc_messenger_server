/* eslint-disable no-unused-vars */
import express from 'express';
import ConversationModel from '../models/ConversationModel.js';
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
        const participants = req.body.participants;
        try {
            if (participants.length === 2) {
                let convExist = false;
                const current_user_conversations = await UserModel.getConversations(
                    participants[0]
                );

                current_user_conversations.forEach(async (conversation) => {
                    const conversationParticipants = await ConversationModel.getParticipants(
                        conversation.conversation_id
                    );
                    const idsParticipant = conversationParticipants.map(
                        (participant) => participant.id.toString()
                    );
                    if (idsParticipant.length === 2 && idsParticipant[1] == participants[1]) convExist = conversation.conversation_id;

                    if (convExist ==! false) {
                        console.log('ici conv exist ?', convExist);
                        const message = { author_id: req.body.author_id, conversation_id: convExist, content: req.body.content, created_at: req.body.created_at };
                        const newMessageId = await MessageModel.add(message);
                        await ConversationModel.updateLastMessageId(convExist, newMessageId);
                        res.send({ conversation_id: convExist }).status(200);
                    } else {
                        const newConversationId = await ConversationModel.add();
                        participants.forEach(async participant => {
                            await ConversationModel.addParticipant(newConversationId, participant);
                        });
                        const message = { author_id: req.body.author_id, conversation_id: newConversationId, content: req.body.content, created_at: req.body.created_at };
                        const newMessageId = await MessageModel.add(message);
                        await ConversationModel.updateLastMessageId(newConversationId, newMessageId);
                        res.send({ conversation_id: newConversationId }).status(200);
                    }
                });
            } else {
                const newConversationId = await ConversationModel.add();
                participants.forEach(async participant => {
                    await ConversationModel.addParticipant(newConversationId, participant);
                });
                const message = { author_id: req.body.author_id, conversation_id: newConversationId, content: req.body.content, created_at: req.body.created_at };
                const newMessageId = await MessageModel.add(message);
                await ConversationModel.updateLastMessageId(newConversationId, newMessageId);
                res.send({ conversation_id: newConversationId }).status(200);
            }
        
        } catch (err) {
            res.json({ message: 'Error', error: err }).status(500);
        }
    });

export default router;
