const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../database/db");
const router = express.Router();

const saltRounds = 10;

router.post("/cadastro", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const senhaHash = await bcrypt.hash(senha, saltRounds);

    const result = await pool.query(
      "INSERT INTO profissional (email, senha) VALUES ($1, $2) RETURNING *",
      [email, senhaHash]
    );

    res.status(201).json({
      message: "Profissional cadastrado com sucesso!",
      user: result.rows[0],
    });
  } catch (err) {
    console.error("Erro ao cadastrar profissional:", err);
    res.status(500).json({ message: "Erro no servidor." });
  }
});

module.exports = router;
