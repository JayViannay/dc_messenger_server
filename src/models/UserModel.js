import db from './_index.js';

const findAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM user', (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

const find = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM user WHERE id = ?', id, (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
};

const add = (user) => {
    const { email, password } = user;
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO user (email, password) VALUES (?, ?)',
            [email, password],
            (err, result) => {
                if (err) reject(err);
                else resolve(result.insertId);
            });
    });
};

const edit = (user, id) => {
    const { email, password } = user;
    return new Promise((resolve, reject) => {
        db.query('UPDATE user SET email = ? SET password = ? WHERE id = ?',
            [email, password, id],
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
    });
};

const findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM user WHERE email = ?', email, (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
};

// modèle getConversations à utiliser pour récupérer la liste des conversation par userId
const getConversations = (userId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT conversation_id FROM conversation_user WHERE user_id = ?', userId, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

export default { findAll, find, add, edit, findByEmail, getConversations };