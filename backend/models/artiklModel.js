import pool from "../db.js";

export const getAllArtikli = async () => {
    const result = await pool.query("SELECT * FROM artikl");
    return result.rows;
}