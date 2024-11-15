const express = require("express");
const route = express.Router();

const userController = require("../controllers/main.controller");

route.get("/", userController.helloWorld);

module.exports = route;
