const path = require("path");

const helloWorld = (req, res) => {
  res.send("Hello World");
};

const paginaCadastro = (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/html/cadastro.html"));
};

const paginaLogin = (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/html/login.html"));
};

const paginaPrincipal = (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/html/home.html"));
};

const paginaProntuario = (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/html/prontuário.html"));
};

const paginaDashboard = (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/html/dashboard.html"));
};

module.exports = {
  helloWorld,
  paginaCadastro,
  paginaLogin,
  paginaPrincipal,
  paginaProntuario,
  paginaDashboard,
};
