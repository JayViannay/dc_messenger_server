/* eslint-disable no-unused-vars */
import db from './_index.js';
//faire une requete pour récupérer les conversations et messages d'un utilisateur
const getMessages = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM message WHERE conversation_id = ?', id, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

const getParticipants = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM conversation_user INNER JOIN user ON user.id=conversation_user.user_id', id, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

const updateLastMessageId = (id, messageId) => {
    //::todo
};

const add = () => {
   
};

const addParticipant = (conversation_id, user_id) => {
    //::todo
};


const convExist = (user_id, recipient_id) => {
   
};

export default { getMessages, getParticipants, updateLastMessageId, add, addParticipant, convExist };