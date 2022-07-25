import express from 'express';
import UserModel from '../models/UserModel.js';

const router = express.Router(); 

router
    .get('/', async (req, res) => {
        try {
            res.json(await UserModel.findAll()).status(200);
        } catch (err) {
            res.json({ message : 'Error', error : err }).status(500);
        }
    })

    .get('/:id', async (req, res) => {
        try {
            const result = await UserModel.find(Number(req.params.id));
            result ? (
                res.json(result).status(200)
            ) : res.json({ message : 'User not found' }).status(404);
        } catch (err) {
            res.json({ message : 'Error', error : err }).status(500);
        }
    })

    .post('/', async (req, res) => {
        if (req.body.email && req.body.password) {
            const newUser = req.body;
            try {
                const user = await UserModel.findByEmail(newUser.email);
                if (user) res.json({ errors: 'User already exist !' }).status(409);
                else {
                    const userId = await UserModel.add(newUser);
                    res.json({ success: 'User added successfully !', new_user_id : userId }).status(200);
                }
            } catch (err) {
                res.json({ errors: err }).status(500);
            }
        } else res.json({ errors : 'All fields are required : email & password' }).status(409);
    })
    
    // ::TODO
    .get('/:id/conversations', async (req, res) => {
        try {
            const result = await UserModel.getConversations(Number(req.params.id));
            result ? (
                res.json(result).status(200)
            ) : res.json({ message : 'User not found' }).status(404);
        } catch (err) {
            res.json({ message : 'Error', error : err }).status(500);
        }
    
    });

export default router;