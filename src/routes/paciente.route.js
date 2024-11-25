const express = require("express");
const route = express.Router();
const {
  criaPaciente,
  criaPacienteGeral,
  retornaTodosPacientes,
  retornaPaciente,
  atualizaPaciente,
  deletaPaciente,
} = require("../controllers/paciente.controller.js");

route.post("/create", criaPaciente);
route.post("/create-anamnese-geral", criaPacienteGeral);
route.get("/read", retornaTodosPacientes);
route.get("/read/:id", retornaPaciente);
route.put("/update/:id", atualizaPaciente);
route.delete("/delete/:id", deletaPaciente);

module.exports = route;
