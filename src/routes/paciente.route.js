const express = require('express');
const route = express.Router();
const { criaPaciente, retornaPacientes } = require('../controllers/paciente.controller.js');

route.post('/create', criaPaciente);
route.get('/read', retornaPacientes);

module.exports = route;
