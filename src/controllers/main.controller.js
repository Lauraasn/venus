const path = require("path");
const { cadastrarProfissional } = require("../models/profissional.model");

const helloWorld = (req, res) => {
  res.send("Hello World");
};

const paginaCadastro = (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/cadastro.html"));
};

const fazCadastro = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await cadastrarProfissional(email, senha);

    res.status(201).json({
      message: "Profissional cadastrado com sucesso!",
      user,
    });
  } catch (err) {
    console.error("Erro ao cadastrar profissional:", err);
    res.status(500).json({ message: "Erro no servidor." });
  }
};

module.exports = { helloWorld, paginaCadastro, fazCadastro };
