const { fazCadastro, fazLogin } = require("../controllers/main.controller");
const express = require("express");
const router = express.Router();

router.post("/cadastro", fazCadastro);
router.post("/login", fazLogin);

module.exports = router;
