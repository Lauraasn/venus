const pool = require("../database/db");

const cadastraPaciente = async (nome, idade, sexo, diagnostico, observacao, tel, ultimo_atendimento, proximo_atendimento) => {
  const query = `
            INSERT INTO paciente (nome, idade, sexo, diagnostico, observacao, tel, ultimo_atendimento, proximo_atendimento)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `;
  const values = [nome, idade, sexo, diagnostico, observacao, tel, ultimo_atendimento, proximo_atendimento];

  const result = await pool.query(query, values);
  return result.rows[0];
};

const buscaTodosPacientes = async () => {
  const query = `
            SELECT * FROM paciente;
        `;

  const result = await pool.query(query);
  return result.rows;
};

const buscaPaciente = async (id) => {
  const query = `
            SELECT * FROM paciente WHERE id= $1;
        `;
  const values = [id];

  const result = await pool.query(query, values);

  if (result.rows.length === 0) {
    return res.status(401).json({ message: "Paciente não encontrado" });
  }

  return result.rows[0];
};

const updatePaciente = async (
  id,
  nome,
  idade,
  sexo,
  diagnostico,
  observacao,
  tel,
  ultimo_atendimento,
  proximo_atendimento
) => {
  const query = `
      UPDATE paciente
      SET 
        nome = COALESCE($2, nome),
        idade = COALESCE($3, idade),
        sexo = COALESCE($4, sexo),
        diagnostico = COALESCE($5, diagnostico),
        observacao = COALESCE($6, observacao),
        tel = COALESCE($7, tel), 
        ultimo_atendimento = COALESCE($8, ultimo_atendimento), 
        proximo_atendimento = COALESCE($9, proximo_atendimento)

      WHERE id = $1
      RETURNING *;
    `;

  const values = [id, nome, idade, sexo, diagnostico, observacao, tel, ultimo_atendimento, proximo_atendimento];
  const result = await pool.query(query, values);

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Paciente não encontrado." });
  }

  return result.rows[0];
};

const deletePaciente = async (id) => {
    const query = `
        DELETE FROM paciente
        WHERE id = $1;
    `;
    

    const values = [id];
    const result = await pool.query(query, values);

    return result.rowCount;
}

module.exports = {
  cadastraPaciente,
  buscaTodosPacientes,
  buscaPaciente,
  updatePaciente,
  deletePaciente,
};
