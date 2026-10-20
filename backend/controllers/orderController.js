import { createNarudzba } from '../models/narudzbaModel.js';

// POST /api/narudzba
export const addNarudzba = async (req, res) => {
    const { stavke } = req.body;

    if (!Array.isArray(stavke) || stavke.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
    }

    const ispravne = stavke.every(s =>
        Number.isInteger(s.idartikl) && Number.isInteger(s.kolicina) && s.kolicina > 0
    );
    if (!ispravne) {
        return res.status(400).json({ message: "Invalid order items" });
    }

    try {
        const narudzba = await createNarudzba(req.session.user.id, stavke);
        res.status(201).json(narudzba);
    } catch (err) {
        if (err.status === 400) {
            return res.status(400).json({ message: err.message });
        }
        console.error("Greška u addNarudzba:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};
