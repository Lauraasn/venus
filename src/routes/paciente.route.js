const express = require("express");
const route = express.Router();
const {
  criaPaciente,
  retornaTodosPacientes,
  retornaPaciente,
  atualizaPaciente,
} = require("../controllers/paciente.controller.js");

route.post("/create", criaPaciente);
route.get("/read", retornaTodosPacientes);
route.get("/read/:id", retornaPaciente);
route.put("/update/:id", atualizaPaciente);

module.exports = route;
