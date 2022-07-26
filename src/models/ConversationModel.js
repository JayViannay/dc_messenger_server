/* eslint-disable no-unused-vars */
import db from './_index.js';

/* Une fonction qui prend un identifiant et renvoie les messages. SELECT * FROM `message` WHERE `conversation_id` = ?;*/
const getMessages = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM message WHERE conversation_id = ?', id, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

/* Une fonction qui prend un identifiant et renvoie les participants. */
const getParticipants = (id) => {
    return new Promise((resolve, reject) => {
        /* Sélection de tous les utilisateurs qui sont dans la conversation avec l'identifiant passé en paramètre. */
        db.query('SELECT * FROM user WHERE id IN (SELECT user_id FROM conversation_user WHERE conversation_id = ?)', id, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

/* Une fonction qui prend deux paramètres, id et messageId, et renvoie une valeur. */
const updateLastMessageId = (id, messageId) => {
    /*/return new Promise((resolve, reject) => {
        /* Mise à jour du dernier identifiant de message d'une conversation. UPDATE `conversation` SET `last_message_id` = '?' WHERE `conversation`.`id` = ?;*/
        /*SELECT * FROM conversation WHERE (sender_id='user_id' OR receiver_id='user_id) ORDER BY timestamp DESC LIMIT 1
        db.query('UPDATE conversation SET last_message_id = ? WHERE id = ?',
            [messageId, id],
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
    });*/

};

/* Une fonction qui ajoute une conversation à la base de données. INSERT INTO `conversation` (`id`, `last_message_id`) VALUES (NULL, NULL);*/
const add = () => {
};

/* Une fonction qui prend deux paramètres, conversation_id et user_id, et renvoie une valeur.*/
const addParticipant = (conversation_id, user_id) => {
    return new Promise((resolve, reject) => {
        /* Insertion d'un nouveau conversation_user dans la base de données. */
        db.query('INSERT INTO conversation_user (conversation_id, user_id) VALUES (?, ?)',
            [conversation_id, user_id],
            (err, result) => {
                if (err) reject(err);
                else resolve(result.insertId);
            });
    });
};


/* Vérifier si une conversation existe entre deux utilisateurs. */
const convExist = (user_id, recipient_id) => {
};

export default { getMessages, getParticipants, updateLastMessageId, add, addParticipant, convExist };
