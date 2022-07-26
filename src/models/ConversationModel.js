/* eslint-disable no-unused-vars */
import db from './_index.js';

const getMessages = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM message WHERE conversation_id = ${id}`, (err, results) => { 
            if (err) reject(err);
            else resolve(results); /* la requête retourne une erreur et sinon affiche le resultat dans results */
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