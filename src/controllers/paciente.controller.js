const pool = require('../database/db');

const criaPaciente = async (req, res, next) => {
    try {
        const { nome, idade, sexo, diagnostico, observacao } = req.body;

        if (!nome || !idade || !sexo || !diagnostico) {
            return res.status(400).json({ message: "Campos obrigatórios não foram preenchidos." });
        }

        const query = `
            INSERT INTO paciente (nome, idade, sexo, diagnostico, observacao)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const values = [nome, idade, sexo, diagnostico, observacao];

        const result = await pool.query(query, values);

        res.status(201).json({
            message: 'Paciente criado com sucesso.',
            data: result.rows[0],
        });
    } catch (error) {
        console.error('Erro ao criar paciente:', error);
        next(error); // Passa o erro para o middleware de erros
    }
};

module.exports = { criaPaciente };
