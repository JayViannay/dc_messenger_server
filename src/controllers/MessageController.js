/* eslint-disable no-unused-vars */
import express from 'express';

const router = express.Router(); 
router
    /**
     * create a new message
     * fields for : message author_id conversation_id created_at content
     */
    .post('/', async (req, res) => {
        //::todo
    });

export default router;