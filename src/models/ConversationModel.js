/* eslint-disable no-unused-vars */
import db from './_index.js';

// Je veux récupérer tous les messages d'une de mes conversations A CORRIGER
/**
 * Get all messages from a conversation 
 */
const getMessages = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM message WHERE conversation_id = ? ORDER BY created_at DESC', id, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

/**
 * Get all participants from a conversation
 * Here you will need to join conversation_user table and user table to get user ids and user emails from a conversation
 * 
 * Example INNER JOIN with table plop (id, email) and table plopinette_plop (plop_id, plopinette_id) 
 * Like you have to do with table user (id, email) and table conversation_user (user_id, conversation_id)
 * 
 * SELECT plop.id plop.email FROM plopinette_plop INNER JOIN plop ON plopinette_plop.plop_id = plop.id WHERE plopinette_id = 1;
 * 
 */
const getParticipants = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT user.id, user.email FROM conversation_user INNER JOIN user ON conversation_user.user_id = user.id WHERE conversation_id = ?', id, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

/**
 * Update the last_message_id of a conversation
 */
const updateLastMessageId = (id, messageId) => {
    //::todo
};

/**
 * Create a conversation
 */
const add = () => {
    //::todo
};

/**
 * Add a participant to a conversation
 * Bdd table : conversation_user (fields : conversation_id, user_id)
 */
const addParticipant = (conversation_id, user_id) => {
    //::todo
};

export default { getMessages, getParticipants, updateLastMessageId, add, addParticipant };