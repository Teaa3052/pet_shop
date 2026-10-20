import pool from '../db.js';

// stavke: [{ idartikl, kolicina }]
// Cijene se uzimaju iz baze, ne s frontenda.
export const createNarudzba = async (idkorisnik, stavke) => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const ids = stavke.map(s => s.idartikl);
        const artikliResult = await client.query(
            `SELECT idartikl, cijena FROM artikl WHERE idartikl = ANY($1)`,
            [ids]
        );
        const cijene = new Map(artikliResult.rows.map(a => [a.idartikl, Number(a.cijena)]));

        if (ids.some(id => !cijene.has(id))) {
            const err = new Error("Artikl not found");
            err.status = 400;
            throw err;
        }

        // računa se u centima da se izbjegnu greške zaokruživanja
        const iznosCenti = stavke.reduce(
            (acc, s) => acc + Math.round(cijene.get(s.idartikl) * 100) * s.kolicina,
            0
        );
        const iznos = iznosCenti / 100;

        const dokumentResult = await client.query(
            `INSERT INTO dokument (do_iznos, korisnik_idkorisnik)
             VALUES ($1, $2)
             RETURNING iddokument`,
            [iznos, idkorisnik]
        );
        const iddokument = dokumentResult.rows[0].iddokument;
        const broj = `NAR-${iddokument}`;

        await client.query(
            `UPDATE dokument SET do_broj = $1 WHERE iddokument = $2`,
            [broj, iddokument]
        );

        for (const s of stavke) {
            await client.query(
                `INSERT INTO dokumentstavke (ds_kolicina, ds_cijena, artikl_idartikl, dokument_iddokument)
                 VALUES ($1, $2, $3, $4)`,
                [s.kolicina, cijene.get(s.idartikl), s.idartikl, iddokument]
            );
        }

        await client.query('COMMIT');

        return { iddokument, do_broj: broj, do_iznos: iznos };
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};
