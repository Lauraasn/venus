const express = require("express");
const app = express();

const route = require("./src/routes/main.route");

app.use(express.json());
app.use(express.static("public"));

app.use("/", route);

const port = 3000;

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
