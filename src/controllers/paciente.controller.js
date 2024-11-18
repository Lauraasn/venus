const pool = require("../database/db");

const criaPaciente = async (req, res, next) => {
  try {
    const { nome, idade, sexo, diagnostico, observacao } = req.body;

    if (!nome || !idade || !sexo || !diagnostico) {
      return res
        .status(400)
        .json({ message: "Campos obrigatórios não foram preenchidos." });
    }

    const query = `
            INSERT INTO paciente (nome, idade, sexo, diagnostico, observacao)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
    const values = [nome, idade, sexo, diagnostico, observacao];

    const result = await pool.query(query, values);

    res.status(201).json({
      message: "Paciente criado com sucesso.",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Erro ao criar paciente:", error);
    next(error);
  }
};

const retornaPacientes = async (req, res, next) => {
  try {
    const query = `
            SELECT * FROM paciente;
        `;

    const result = await pool.query(query);

    res.status(200).json({
      message: "Pacientes retornados com sucesso.",
      data: result.rows,
    });
  } catch (error) {
    console.error("Erro ao buscar pacientes:", error);
    next(error);
  }
};

const buscaPaciente = async (req, res, next) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID do paciente é obrigatório."});
    };

    const query = `
            SELECT * FROM paciente WHERE id= $1;
        `;

    const result = await pool.query(query, [id]);

    if(result.rows.length === 0) {
      return res.status(401).json({ message: "Paciente não encontrado"});
    }

    res.status(200).json({
      message: "Paciente encontrado com sucesso.",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Erro ao buscar paciente:", error);
    next(error);
  }
};

const atualizaPaciente = async (req, res, next) => {
  try {
    const { nome, idade, sexo, diagnostico, observacao } = req.body;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID do paciente é obrigatório." });
    }

    const query = `
      UPDATE paciente
      SET 
        nome = COALESCE($2, nome),
        idade = COALESCE($3, idade),
        sexo = COALESCE($4, sexo),
        diagnostico = COALESCE($5, diagnostico),
        observacao = COALESCE($6, observacao)
      WHERE id = $1
      RETURNING *;
    `;

    const values = [id, nome, idade, sexo, diagnostico, observacao];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Paciente não encontrado." });
    }

    res.status(200).json({
      message: "Paciente atualizado com sucesso.",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Erro ao atualizar paciente:", error);
    next(error);
  }
};


module.exports = { criaPaciente, retornaPacientes, buscaPaciente, atualizaPaciente };
