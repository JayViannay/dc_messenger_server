/* eslint-disable no-unused-vars */
import express from 'express';
import ConversationModel from '../models/ConversationModel.js';

const router = express.Router();

router
    .get('/:id/participants', async (req, res) => {
        //::todo
    })

    .get('/:id/messages', async (req, res) => {
        try {
            const allconv = await ConversationModel.getMessages(Number(req.params.id));
            
            allconv ? (
                res.json(allconv).status(200)
            ) : res.json({ message : 'User not found' }).status(404);
        } catch (err) {
          res.json({ message : 'Error', error : err }).status(500);
        }
        
    }) 

    .post('/', async (req, res) => {
        //::todo
    });

export default router;