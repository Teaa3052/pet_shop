import express from 'express'
import {
    getUsers,
    getUser,
    updateUserController,
    deleteUser,
} from '../controllers/korisnikController.js';
import { requireRole } from '../middleware/requireRole.js';

const router = express.Router() 

router.get('/', requireRole('superuser'), getUsers);
router.delete('/:id', requireRole('superuser'), deleteUser);

export default router; 