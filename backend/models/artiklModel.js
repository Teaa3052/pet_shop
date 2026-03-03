import pool from "../db.js";

export const getAllArtikli = async () => {
    const result = await pool.query("SELECT * FROM artikl");
    return result.rows;
}

export const createArtikl = async (naziv, cijena) => {
    const query = `
    INSERT INTO artikl (naziv, cijena)
    VALUES ($1, $2)
    RETURNING idartikl, naziv, cijena
    `

    const values = [naziv, cijena]
    
try {
    const result = await pool.query(query, values);
    return result.rows[0];
} catch (err) {
    console.log("SQL ERROR:", err);
    throw err;
}
}

export const deleteArtikl = async (id) => {
    try {
        const query = `DELETE FROM artikl WHERE idartikl = $1`;
        const result = await pool.query(query, [id]);

        return result.rowCount;
    } catch (err) {
        console.error("Model error:", err.message);
        throw new Error(err.message);  
    }
};