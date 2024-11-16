const express = require("express");
const app = express();
const db = require("./src/database/db");

const route = require("./src/routes/main.route");
const authRoute = require("./src/routes/auth.route");
const pacienteRoute = require("./src/routes/paciente.route");

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/", route);
app.use("/auth", authRoute);
app.use("/paciente", pacienteRoute);

db.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
  } else {
    console.log("Conexão com o banco bem-sucedida:", res.rows[0]);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
