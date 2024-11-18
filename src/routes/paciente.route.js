const express = require('express');
const route = express.Router();
const { criaPaciente, retornaPacientes, buscaPaciente, atualizaPaciente } = require('../controllers/paciente.controller.js');

route.post('/create', criaPaciente);
route.get('/read', retornaPacientes);
route.put('/update/:id', atualizaPaciente);

module.exports = route;
