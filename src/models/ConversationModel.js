/* eslint-disable no-unused-vars */
import db from './_index.js';

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
//Need to add conversation_user first, as it is condition by the WHERE conversation_id=? so that is the entrance point. Exclude the password, we don't want it stocked locally on the user's computer.
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
const updateLastMessageId = (id, messageId) => { //id=conversation_id & messageId=InsertId
    return new Promise((resolve, reject) => {
        db.query('UPDATE conversation SET last_message_id = ? WHERE id = ?',
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
       db.query('INSERT INTO `conversation`(`id`) VALUES (NULL)');
           (err, result) => {
               if (err) reject(err);
               else resolve(result);
          };
        })};
    

/**
 * Add a participant to a conversation
 * Bdd table : conversation_user (fields : conversation_id, user_id)
 */
const addParticipant = (conversation_id, user_id) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO conversation_user (conversation_id, user_id) VALUES (?, ?)');
        [conversation_id, user_id];
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
           };
         });
        };

export default { getMessages, getParticipants, updateLastMessageId, add, addParticipant };