import express from 'express'
import { addArtikl, getArtikli, deleteArtikl } from '../controllers/artikliController.js';
import { requireRole } from '../middleware/requireRole.js';

const router = express.Router(); 

router.get("/", getArtikli);
router.post("/", requireRole('superuser'), addArtikl);
router.delete('/:id', requireRole('superuser'), deleteArtikl); 


export default router; 