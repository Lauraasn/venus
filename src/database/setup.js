const fs = require("fs");
const path = require("path");
const pool = require("./db");
require("dotenv").config();

const setup = async () => {
    const client = await pool.connect();
    const schemaPath = path.join(__dirname, "schema.sql");
    const schemaSQL = fs.readFileSync(schemaPath, "utf-8");

    try {
        await client.query(schemaSQL);
        console.log("tabelas criadas ou já existentes.");
    } catch (err) {
        console.error("erro ao configurar o banco de dados:", err.message);
    } finally {
        client.release();
    }
};

setup();