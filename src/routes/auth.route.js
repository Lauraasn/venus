const { fazCadastro, fazLogin } = require("../controllers/main.controller");
const express = require("express");
const route = express.Router();

route.post("/cadastro", fazCadastro);
route.post("/login", fazLogin);

module.exports = route;
