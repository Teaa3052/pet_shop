import { 
    getAllArtikli, 
    createArtikl
 } from "../models/artiklModel.js";

 import { deleteArtikl as deleteArtiklModel } from '../models/artiklModel.js';

// GET /api/atikl
export const getArtikli = async (req, res) => {
    try {
        const artikli = await getAllArtikli();
        res.json(artikli); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error"});
    }
};

export const addArtikl = async (req, res) => {

    const { naziv, cijena } = req.body; 

    try {
        const newArtikl = await createArtikl(naziv, cijena);
        res.status(201).json(newArtikl);
    } catch (err) {
        if (err.code === '23505') {
            return res.status(400).json({ error: "Artikl already exist "});
        }
        res.status(500).json({ error: err.message })
    }
}

export const deleteArtikl = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid ID" });
        }

        const deletedCount = await deleteArtiklModel(id);

        if (deletedCount === 0) {
            return res.status(404).json({ error: "Artikl not found" });
        }

        res.json({ message: "Artikl successfully deleted" });

    } catch (err) {
        console.error("Greška u deleteArtikl:", err.message);
        res.status(500).json({ error: err.message });
    }
};