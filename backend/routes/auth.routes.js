import express, { Router } from 'express';
import { register, login, logout, currentUser } from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { validateLogin, validateRegister } from '../middleware/validateRequest.js';

const router = Router(); 

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/me', requireAuth, currentUser);

export default router;