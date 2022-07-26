/* eslint-disable no-unused-vars */
import db from './_index.js';

/* Une fonction qui prend un message comme paramètre. */
const add = (message) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO message (conversation_id, author_id, content) VALUES (?, ?, ?)',
            [message.conversation_id, message.author_id, message.content],
            (err, result) => {
                if (err) reject(err);
                else resolve(result.insertId);
            });
    });
};

export default { add };
