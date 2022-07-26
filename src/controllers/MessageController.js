/* eslint-disable no-unused-vars */
import express from 'express';
import MessageModel from '../models/MessageModel.js';

const router = express.Router();

router
    /* Méthode utilisée pour créer un nouveau message. */
    .post('/', async (req, res) => {});

export default router;
