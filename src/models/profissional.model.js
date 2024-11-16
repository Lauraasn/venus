const bcrypt = require("bcrypt");
const pool = require("../database/db");

const saltRounds = 10;

const cadastrarProfissional = async (email, senha) => {
    const senhaHash = await bcrypt.hash(senha, saltRounds);

    const result = await pool.query(
      "INSERT INTO profissional (email, senha) VALUES ($1, $2) RETURNING *",
      [email, senhaHash]
    );

    return result.rows[0];
};

module.exports = { cadastrarProfissional };