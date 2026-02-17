import express from 'express'
import {
    getUsers,
    getUser,
    updateUserController,
    deleteUser,
    addUserNoPass
} from '../controllers/korisnikController.js';

const router = express.Router() 

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', addUserNoPass);
router.put('/:id', updateUserController);
router.delete('/:id', deleteUser);

export default router; 