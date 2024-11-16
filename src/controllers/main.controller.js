const path = require("path");
const bcrypt = require("bcrypt");
const {
  cadastraProfissional,
  buscaProfissional,
} = require("../models/profissional.model");

const helloWorld = (req, res) => {
  res.send("Hello World");
};

const paginaCadastro = (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/html/cadastro.html"));
};

const paginaLogin = (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/html/login.html"));
};

const fazCadastro = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await cadastraProfissional(email, senha);

    res.status(201).json({
      message: "Profissional cadastrado com sucesso!",
      user,
    });
  } catch (err) {
    console.error("Erro ao cadastrar profissional:", err);
    res.status(500).json({ message: "Erro no servidor." });
  }
};

const fazLogin = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const profissional = await buscaProfissional(email);

    if (!profissional) {
      return res.status(404).json({ message: "Profissional não encontrado." });
    }

    const senhaCorreta = await bcrypt.compare(senha, profissional.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    res.status(201).json({
      message: "Profissional logado com sucesso!",
      user: { id: profissional.id, email: profissional.email },
    });
  } catch (err) {
    console.error("Erro ao logar profissional:", err);
    res.status(500).json({ message: "Erro no servidor." });
  }
};

module.exports = {
  helloWorld,
  paginaCadastro,
  paginaLogin,
  fazCadastro,
  fazLogin,
};
