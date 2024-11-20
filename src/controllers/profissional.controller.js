const bcrypt = require("bcrypt");
const {
  cadastraProfissional,
  buscaProfissional,
} = require("../models/profissional.model");

const fazCadastro = async (req, res) => {
  const { email, senha, confirmaSenha } = req.body;

  if (!email || !senha || !confirmaSenha) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios." });
  }

  if (senha !== confirmaSenha) {
    return res.status(400).json({ message: "As senhas não coincidem." });
  }

  try {
    await cadastraProfissional(email, senha);
    return res.redirect("/home");
  } catch (err) {
    console.error("Erro ao cadastrar profissional:", err.message);
    return res
      .status(500)
      .json({ message: "Erro ao cadastrar. Tente novamente mais tarde." });
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

    res.redirect("/home");
  } catch (err) {
    console.error("Erro ao logar profissional:", err.message);
    res
      .status(500)
      .json({ message: "Erro ao logar. Tente novamente mais tarde." });
  }
};

module.exports = { fazCadastro, fazLogin };
