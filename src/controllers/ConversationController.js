/* eslint-disable no-unused-vars */
import express from 'express';
/* Importation du ConversationModel à partir du dossier des modèles. */
import ConversationModel from '../models/ConversationModel.js';

const router = express.Router();

router
    /* Écouter une requête get à l'url `/:id/participants` puis exécuter la fonction qui lui est
    transmise. */
    .get('/:id/participants', async (req, res) => {
       /* Obtenir les participants d'une conversation. */
        try {
            const participants = await ConversationModel.getParticipants(Number(req.params.id));
            participants ? res.json(participants).status(200) : res.json({ message: 'User not found' }).status(404);
        } catch (err) {
            res.json({ message: 'Error', error: err }).status(500);
        }
    })

    /* Une route qui écoute une requête get à l'url `/:id/messages` et qui exécute ensuite la fonction
    qui lui est transmise. */
    .get('/:id/messages', async (req, res) => {
        /* Obtenir les messages d'une conversation. */
        try{
            const messages = await ConversationModel.getMessages(Number(req.params.id));
            messages ? res.json(messages).status(200) : res.json({ message: 'Message not found' }).status(404);
        } catch (err) {
            res.json({ message: 'Error', error: err }).status(500);
        }
    })

    .post('/', async (req, res) => {
               
    });

export default router;
