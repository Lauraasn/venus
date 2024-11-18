const {
  fazCadastro,
  fazLogin,
} = require("../controllers/profissional.controller");
const express = require("express");
const route = express.Router();

route.post("/cadastro", fazCadastro);
route.post("/login", fazLogin);

module.exports = route;
