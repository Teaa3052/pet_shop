import express from 'express'
import {
    getUsers,
    getUser,
    addUser,
    updateUserController,
    deleteUser
} from '../controllers/korisnikController.js';

const router = express.Router() 

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', addUser);
router.put('/:id', updateUserController);
router.delete('/:id', deleteUser);
router.get('/:id', getUser);

export default router; 