const { fazCadastro } = require("../controllers/main.controller");
const express = require("express");
const router = express.Router();

router.post("/cadastro", fazCadastro);

module.exports = router;
