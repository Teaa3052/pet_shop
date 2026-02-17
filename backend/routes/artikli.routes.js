import express from 'express'
import { getArtikli } from '../controllers/artikliController.js';

const router = express.Router(); 

router.get("/", getArtikli)

export default router; 