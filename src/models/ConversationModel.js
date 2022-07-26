/* eslint-disable no-unused-vars */
import db from './_index.js';

const getMessages = (id) => { /* le id est celui d'une conversation */
return new Promise((resolve, reject) => {
    db.query('SELECT * FROM message WHERE conversation_id = ?', id, (err, results) => {/* ma requête me retourne une erreur oubien resultat dans results */
        
    if (err) reject(err);
        else resolve(results);
        
    });
});
};

const getParticipants = (idUser) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM conversation_user inner Join user WHERE id = conversation_user.user_id', idUser, (err, results) => {/* ma requête me retourne une erreur oubien resultat dans results */
            
        if (err) reject(err);
            else resolve(results);
            
        });
   });
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