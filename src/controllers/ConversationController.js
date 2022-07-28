/* eslint-disable no-unused-vars */
import express from 'express';
/* Importation du ConversationModel à partir du dossier des modèles. */
import ConversationModel from '../models/ConversationModel.js';
import MessageModel from '../models/MessageModel.js';

const router = express.Router();

router
    /* Écouter une requête get à l'url `/:id/participants` puis exécuter la fonction qui lui est transmise. */
    .get('/:id/participants', async (req, res) => {
        /* Obtenir les participants d'une conversation. */
        try {
            const participants = await ConversationModel.getParticipants(Number(req.params.id));
            participants ? res.json(participants).status(200) : res.json({ message: 'User not found' }).status(404);
        } catch (err) {
            res.json({ message: 'Error', error: err }).status(500);
        }
    })

    /* Une route qui écoute une requête get à l'url `/:id/messages` et qui exécute ensuite la fonction qui lui est transmise. */
    .get('/:id/messages', async (req, res) => {
        /* Obtenir les messages d'une conversation. */
        try{
            const messages = await ConversationModel.getMessages(Number(req.params.id));
            messages ? res.json(messages).status(200) : res.json({ message: 'Message not found' }).status(404);
        } catch (err) {
            res.json({ message: 'Error', error: err }).status(500);
        }
    })
    /* create a new conversation
    * fields for a conversation : you don't need to give anything to create a conversation
    * id is auto increment and last_message_id is nullable 
    */
/* créer une nouvelle conversation
    * champs pour une conversation : vous n'avez pas besoin de donner quoi que ce soit pour créer une conversation
    * id est auto incrémenté et last_message_id est nullable
    */
    .post('/', async (req, res) => {
        /* Obtenir les participants du corps de la requête. req.body contient les paramètres envoyés par le client dans le cadre d’une requête POST.*/
        const participants = req.body.participants;
        try {
            if (participants.length === 2) {

            }
        const newConvID = await ConversationModel.add();

        participants.forEach(userID => {
            ConversationModel.addParticipant(newConvID, userId);
        });

        const message = { author_id: req.body.author_id, conversation_id: newConvID, content: req.body.content.content, created_at: req.body.created_at };
        const newMessageId = await MessageModel.add(message);

        await ConversationModel.updateLastMessageId(newConvID, newMessageId);

        res.json({ conversation_id: newConvId }).status(200);
    } catch (err) {
        res.json({ message: 'Error', error: err }).status(500);

        });
    };

// 1 - Obtenir l'identifiant des participants (req.body.participants)
// 2 - Traiter la conversation entre 2 participants :
// 2.a Vérifier si la conversation existe et si ce n'est pas une conversation entre l'utilisateur et lui-même
// 2.a Si la conversation existe, il suffit de créer un nouveau message et de mettre à jour le last_message_id de la conversation existante.
// 2.b Si la conversation n'existe pas, il suffit de créer une nouvelle conversation avec le last_message_id null.
// puis retourner l'identifiant de la conversation (le client s'attend à un résultat du type : { conversation_id : int_value }
// 3 Gérer les conversations avec plus de 2 participants 
// 3.a créer une nouvelle conversation et garder le dernier insert id.
// 3.b ajouter tous les participants dans la table conversation_user
// 3.c créer le message et garder le dernier ID d'insertion
// 3.d mettre à jour le last_message_id de la conversation
// 3.c retourne l'identifiant de la conversation (le client s'attend à un résultat du type : { conversation_id : int_value [newconversationid] }

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
//      3.c return the conversation_id (client exepected output like : { conversation_id : int_value [newconversationid] }



export default router;
