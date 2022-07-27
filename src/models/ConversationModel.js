/* eslint-disable no-unused-vars */
import db from './_index.js';

// Je veux récupérer tous les messages d'une de mes conversations A CORRIGER
const getMessages = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM conversation id = ?', (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

const getParticipants = (id) => {
    //::todo
};

const updateLastMessageId = (id, messageId) => {
    //::todo
};

const add = () => {
    //::todo
};

const addParticipant = (conversation_id, user_id) => {
    //::todo
};


const convExist = (user_id, recipient_id) => {
    //::todo
};

export default { getMessages, getParticipants, updateLastMessageId, add, addParticipant, convExist };