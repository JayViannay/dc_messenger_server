import express from 'express';
import UserModel from '../models/UserModel.js';

const router = express.Router(); 

router
// request to get all users in the table USER. 
    .get('/', async (req, res) => {
        try {
            res.json(await UserModel.findAll()).status(200); //resultat json waiting for - findAll executes itself on UserModel - destinataire ON requete
        } catch (err) {
            res.json({ message : 'Error', error : err }).status(500); //error from Model
        }
    })

// request to get user with id stated in the url
    .get('/:id', async (req, res) => {
        try {
            const result = await UserModel.find(Number(req.params.id)); // results saved in a constant result = send request to Model to find user with ID stipulated in the url
            result ? ( //instead if if/else / true/false
                res.json(result).status(200)
            ) : res.json({ message : 'User not found' }).status(404);
        } catch (err) {
            res.json({ message : 'Error', error : err }).status(500);
        }
    })

    // create a new user
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
    
    // get full conversation list for user = :id
    .get('/:id/conversations', async (req, res) => {
     try {
        const conversationList = await UserModel.getConversations(Number(req.params.id));
        //paranthese are not compulsory if only one instruction. Possible to put all on one line. 
        conversationList ? ( 
            res.json(conversationList).status(200)
        ) : res.json({ message : 'User not found' }).status(404); //Check la base de données USER 
// conversationList ? res.json(conversationList).status(200) : res.json({message : 'No conversations yet'}).status(404);
    } catch (err) {
            res.json({ message : 'Error', error : err }).status(500);     
        }
    });

    // try { Sending back an empty list = a results
    //     const userExist = await UserModel.find(Number(req.params.id));
    //     if (userExist) {
    //         const resultats = await UserModel.getConversations(Number(req.params.id));
    //         res.json(results).status(200);
    //     } else {
    //         res.json({ message : 'User not found' }).status(404);
    //     }catch (err) {
    //         res.json({ message : 'Error', error : err }).status(500); 
    // }};

export default router;