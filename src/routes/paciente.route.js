const express = require('express');
const route = express.Router();
const { criaPaciente } = require('../controllers/paciente.controller.js');

route.post('/create', criaPaciente);

module.exports = route;
