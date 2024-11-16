const express = require("express");
const route = express.Router();

const userController = require("../controllers/main.controller");

route.get("/", userController.helloWorld);
route.get("/cadastro", userController.paginaCadastro);
route.get("/login", userController.paginaLogin);

module.exports = route;
