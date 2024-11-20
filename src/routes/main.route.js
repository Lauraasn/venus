const express = require("express");
const route = express.Router();

const {
  helloWorld,
  paginaCadastro,
  paginaLogin,
  paginaPrincipal,
  paginaProntuario,
  paginaDashboard,
} = require("../controllers/main.controller");

route.get("/", helloWorld);
route.get("/cadastro", paginaCadastro);
route.get("/login", paginaLogin);
route.get("/home", paginaPrincipal);
route.get("/prontuario", paginaProntuario);
route.get("/dashboard", paginaDashboard);

module.exports = route;
