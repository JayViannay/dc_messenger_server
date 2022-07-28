/* eslint-disable no-unused-vars */
import express from 'express';
import ConversationModel from '../models/ConversationModel.js';
import UserModel from '../models/UserModel.js';
import MessageModel from '../models/MessageModel.js';

const router = express.Router();

router
    /**
     * url to get participants from a conversation
     */
    .get('/:id/participants', async (req, res) => {
        try {
            const partiExist = await ConversationModel.getParticipants(Number(req.params.id));
            if (partiExist) {
                const listParticipant = await ConversationModel.getParticipants(Number(req.params.id)); // results saved in a constant result = send request to Model to find messages for conversation_id
                res.json(listParticipant).status(200)
            } else res.json({ message : 'No participant' }).status(404);
        } catch (err) {
            res.json({ message : 'Error', error : err }).status(500);
            }
    })

    /**
     * url to get messages from a conversation
     */
    .get('/:id/messages', async (req, res) => {
        try {
            const convExist = await ConversationModel.getMessages(Number(req.params.id)); //not necessary
            if (convExist) { //not necessary
                const listMessage = await ConversationModel.getMessages(Number(req.params.id)); // results saved in a constant result = send request to Model to find messages for conversation_id
                res.json(listMessage).status(200)
            } else res.json({ message : 'Message not found' }).status(404); //not necessary 
        } catch (err) {
            res.json({ message : 'Error', error : err }).status(500);
            }
        })
   

 //   .post('/', async (req, res) => {
    //         if (req.body.last_message_id) {
    //             const newConv = req.body;
    //             try {
    //                 const conv = await ConversationModel.add(NewConv.last_message_id);
    //                 // if (conv) res.json({ errors: 'User already exist !' }).status(409);
    //                 // else {
    //                 //     const userId = await UserModel.add(newUser);
    //                 //     res.json({ success: 'User added successfully !', new_user_id : userId }).status(200);
                    
    //             } catch (err) {
    //                 res.json({ errors: err }).status(500);
    //             }
    //         } else res.json({ errors : 'All fields are required : email & password' }).status(409);
    // });
    /**
     * create a new conversation
     * fields for a conversation : you don't need to give anything to create a conversation
     * id is auto increment and last_message_id is nullable 
     */
     .post('/', async (req, res) => {
        try {
            const participants = req.body.participants;
            
            // handle conv with two particpants
            if (participants.length === 2) {
                const current_user_conversations = await UserModel.getConversations(
                    participants[0]
                );

                // check if conv exist
                let convExist = false;
                for (let i = 0; i < current_user_conversations.length; i++) {
                    const conversationParticipants = await ConversationModel.getParticipants(current_user_conversations[i].conversation_id);
                    //console.log(conversationParticipants);
                    const idsParticipant = conversationParticipants.map(
                        (participant) => participant.id.toString()
                    );
                   
                    if (idsParticipant.length === 2) {
                        if (idsParticipant.includes(participants[0]) === true && idsParticipant.includes(participants[1]) === true) {
                            convExist = current_user_conversations[i].conversation_id;
                        }
                    } 
                }
                // if conv exist just add the message, update the conv and return conv_id
                if (convExist !== false) {
                    const message = { author_id: req.body.author_id, conversation_id: convExist, content: req.body.content, created_at: req.body.created_at };
                    const newMessageId = await MessageModel.add(message);
                    await ConversationModel.updateLastMessageId(convExist, newMessageId);
                    res.send({ conversation_id: convExist }).status(200);
                }
                // if conv doesn't exist create new conv / new message / add participant / update conv last insert message id then return conv id
                if (convExist === false) {
                    console.log('conv exsit');
                    const newConversationId = await ConversationModel.add();
                    participants.forEach(async participant => {
                        await ConversationModel.addParticipant(newConversationId, participant);
                    });
                    const message = { author_id: req.body.author_id, conversation_id: newConversationId, content: req.body.content, created_at: req.body.created_at };
                    const newMessageId = await MessageModel.add(message);
                    await ConversationModel.updateLastMessageId(newConversationId, newMessageId);
                    res.send({ conversation_id: newConversationId }).status(200);
                }
            }
            // create new conv when participants > 2 
            if (participants.length > 2) {
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