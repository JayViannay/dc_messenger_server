/* eslint-disable no-unused-vars */
import db from './_index.js';

/**
 * Get all messages from a conversation 
 */
const getMessages = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM message WHERE conversation_id = ?', id, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

/**
 * Get all participants from a conversation
 */ 
 const getParticipants = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT user.id, user.email FROM conversation_user INNER JOIN user ON conversation_user.user_id = user.id WHERE conversation_id=?', id, (err, results) => {
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