const express = require("express");
const app = express();
const db = require("./src/database/db");

const route = require("./src/routes/main.route");

app.use(express.json());
app.use(express.static("public"));

app.use("/", route);

db.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
  } else {
    console.log("Conexão com o banco bem-sucedida:", res.rows[0]);
  }
});

const port = 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
