import express from 'express';
import UserModel from '../models/UserModel.js';

const router = express.Router(); 

router
    .get('/', async (req, res) => {
        try {
            res.json(await UserModel.findAll()).status(200); /*j'appelle une methode findall du ficheir usermodel: je demande qu'il me trouve
            tous les users et les envoyer au controller*/
        } catch (err) {
            res.json({ message : 'Error', error : err }).status(500);
        }
    })

    .get('/:id', async (req, res) => {
        try {
            const result = await UserModel.find(Number(req.params.id));/* req.params.id est converti en integer en mettant number car c'est string a la base*/
            result ? ( /*est-ce que result existe*/
                        /* C'est un opérateur ternaire. C'est une déclaration abrégée if/else. */
                res.json(result).status(200)
            ) : res.json({ message : 'User not found' }).status(404);
        } catch (err) {
            res.json({ message : 'Error', error : err }).status(500);
        }
    })

    .post('/', async (req, res) => {
        if (req.body.email && req.body.password) { /* si req.body.email et .password n'est pas vide */
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
    
    /* Une route qui sera utilisée pour récupérer toutes les conversations d'un utilisateur. 
    get : méthode du routeur express. Il est utilisé pour définir un itinéraire.*/
    .get('/:id/conversations', async (req, res) => {
        try {
            const userExist = await UserModel.find(Number(req.params.id));

            if (userExist){
                const results = await UserModel.getConversations(Number(req.params.id));
                res.json(results).status(200)
            }else res.json({ message : 'User not found' }).status(404);
            
        } catch (err) {  
            /* Attraper une erreur et renvoyer un objet json avec un message et l'erreur. */
            res.json({ message : 'Error', error : err }).status(500);

        }
    });

export default router;