/* eslint-disable no-unused-vars */
import express from 'express';
import ConversationModel from '../models/ConversationModel.js';

const router = express.Router();

router
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

    .get('/:id/messages', async (req, res) => {
        try {
            const convExist = await ConversationModel.getMessages(Number(req.params.id));
            if (convExist) {
                const listMessage = await ConversationModel.getMessages(Number(req.params.id)); // results saved in a constant result = send request to Model to find messages for conversation_id
                res.json(listMessage).status(200)
            } else res.json({ message : 'Message not found' }).status(404);
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

export default router;