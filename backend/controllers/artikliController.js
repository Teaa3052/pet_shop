import { getAllArtikli } from "../models/artiklModel.js";

export const getArtikli = async (req, res) => {
    try {
        const artikli = await getAllArtikli();
        res.json(artikli); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Greska na serveru "});
    }
};