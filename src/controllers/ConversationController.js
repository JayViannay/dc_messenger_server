/* eslint-disable no-unused-vars */
import express from 'express';
import ConversationModel from '../models/ConversationModel.js';

const router = express.Router();

router
    .get('/:id/participants', async (req, res) => {
        try {
            const participant = await ConversationModel.getParticipants(Number(req.params.id));
            participant ? (
                res.json(participant).status(200)
            ) : res.json({ message : 'User not found' }).status(404);
        } catch (err) {
          res.json({ message : 'Error', error : err }).status(500);
        }
    })

    .get('/:id/messages', async (req, res) => {
        try {
            const convExist = await ConversationModel.getMessages(Number(req.params.id));/* req.params.id est converti en integer en mettant number car c'est string a la base*/
           
            if (convExist){
                const results = await ConversationModel.getMessages(Number(req.params.id));
                res.json(results).status(200)
             }else res.json({ message : 'conversation not found' }).status(404);

        } catch (err) {
            res.json({ message : 'Error', error : err }).status(500);
        }
    })

    .post('/', async (req, res) => {
        //::todo
    });

export default router;