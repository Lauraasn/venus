const bcrypt = require("bcrypt");
const {
  cadastraProfissional,
  buscaProfissional,
} = require("../models/profissional.model");

const fazCadastro = async (req, res) => {
  const { email, senha } = req.body;

  try {
    await cadastraProfissional(email, senha);

    res.redirect("/home");
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

    res.redirect("/home");
  } catch (err) {
    console.error("Erro ao logar profissional:", err);
    res.status(500).json({ message: "Erro no servidor." });
  }
};

module.exports = { fazCadastro, fazLogin };
