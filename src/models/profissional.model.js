const bcrypt = require("bcrypt");
const pool = require("../database/db");

const saltRounds = 10;

const cadastraProfissional = async (email, senha) => {
    const senhaHash = await bcrypt.hash(senha, saltRounds);

    const result = await pool.query(
      "INSERT INTO profissional (email, senha) VALUES ($1, $2) RETURNING *",
      [email, senhaHash]
    );

    return result.rows[0];
};

const buscaProfissional = async (email) => {
    const result = await pool.query(`
        SELECT * FROM profissional WHERE email = $1;    
    `, [email]);
    return result.rows[0];
};

module.exports = { cadastraProfissional, buscaProfissional };