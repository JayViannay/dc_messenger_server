/* eslint-disable no-unused-vars */
import db from './_index.js';

/**
 * Create a new message
 * Fields : author_id, conversation_id, created_at, content
 */
const add = (message) => {
    const { author_id, conversation_id, created_at, content} = message;
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO message (author_id, conversation_id, created_at, content) VALUES (?, ?, ?, ?)',
            [author_id, conversation_id, created_at, content],
            (err, result) => {
                if (err) reject(err);
                else resolve(result.insertId);
            });
    });
};

export default { add };
