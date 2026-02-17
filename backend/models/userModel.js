import pool from '../db.js' 

async function createUser (ime, email, passwordHash) {
    const query = `
        INSERT INTO korisnik (ime, email, password)
        VALUES ($1, $2, $3) 
        RETURNING idkorisnik, ime, email
    ` 

    const values = [ime, email, passwordHash] 

    const result = await pool.query(query, values)
    return result.rows[0]
}

async function findByEmail(email) {
    const query = `SELECT * FROM korisnik WHERE email = $1` 
    const values = [email]

    const result = await pool.query(query, values)
    return result.rows[0]

}

async function getAllUsers() {
    const result = await pool.query('SELECT * FROM korisnik');
    return result.rows;
}

async function getUserById(id) {
    const query = `SELECT * FROM korisnik WHERE idkorisnik = $1`;
    const result = await pool.query(query, [id]);
    return result.rows[0] 
} 

async function updateUser(id, ime, prezime, email) {
    const query = `
    UPDATE korisnik 
    SET ime = $1, prezime = $2, email = $3
    WHERE idkorisnik = $4
    RETURNING *
    `; 
    const values = [ime, prezime, email, id];
    const result = await pool.query(query, values);
    return result.rows[0];
}

async function deleteUser(id) {
    const query = `DELETE FROM korisnik WHERE idkorisnik = $1`;
    await pool.query(query, [id]);
    return true;
}

async function createUserNoPassword(ime, prezime, email) {
  const query = `
    INSERT INTO korisnik (ime, prezime, email)
    VALUES ($1, $2, $3)
    RETURNING idkorisnik, ime, prezime, email
  `;

  const values = [ime, prezime, email];

  const result = await pool.query(query, values);
  return result.rows[0];
}


export { createUser, findByEmail, getAllUsers, getUserById, updateUser, deleteUser, createUserNoPassword }