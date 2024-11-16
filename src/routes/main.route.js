const express = require("express");
const path = require("path");
const route = express.Router();

const userController = require("../controllers/main.controller");

route.get("/", userController.helloWorld);
route.get("/cadastro", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/cadastro.html"));
});

module.exports = route;
