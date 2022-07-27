/* eslint-disable no-unused-vars */
import db from './_index.js';
//requete pour récupérer les conversations et messages d'un utilisateur

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
 */
const getParticipants = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT user.id, user.email FROM conversation_user INNER JOIN user ON user.id=conversation_user.user_id WHERE conversation_id=?', id, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

/**
 * Update the last_message_id of a conversation
 */
const updateLastMessageId = (id, messageId) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE conversation SET messageId = ? WHERE id = ?',
            [messageId, id],
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
    });
};

/**
 * Create a conversation
 */
const add = () => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO conversation (last_message_id) VALUES (?)', [], (err, result) => {
            if (err) reject(err);
            else resolve(result.insertId);
        });
    });
}

/**
 * Add a participant to a conversation
 * Bdd table : conversation_user (fields : conversation_id, user_id)
 */
const addParticipant = (conversation_id, user_id) => {
    //::todo
};

export default { getMessages, getParticipants, updateLastMessageId, add, addParticipant };
