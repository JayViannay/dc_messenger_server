/* eslint-disable no-unused-vars */
import express from 'express';
import ConversationModel from '../models/ConversationModel.js';

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