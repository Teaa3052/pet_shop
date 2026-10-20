import express from 'express'
import { addNarudzba } from '../controllers/orderController.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = express.Router()

router.post('/', requireAuth, addNarudzba);

export default router;