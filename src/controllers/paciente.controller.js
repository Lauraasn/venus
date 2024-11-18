const {
  cadastraPaciente,
  buscaTodosPacientes,
  buscaPaciente,
  updatePaciente,
  deletePaciente,
} = require("../models/paciente.model");

const criaPaciente = async (req, res, next) => {
  try {
    const { nome, idade, sexo, diagnostico, observacao } = req.body;

    if (!nome || !idade || !sexo || !diagnostico) {
      return res
        .status(400)
        .json({ message: "Campos obrigatórios não foram preenchidos." });
    }

    const paciente = await cadastraPaciente(
      nome,
      idade,
      sexo,
      diagnostico,
      observacao
    );

    res.status(201).json({
      message: "Paciente criado com sucesso.",
      data: paciente,
    });
  } catch (error) {
    console.error("Erro ao criar paciente:", error);
    next(error);
  }
};

const retornaTodosPacientes = async (req, res, next) => {
  try {
    const pacientes = await buscaTodosPacientes();

    res.status(200).json({
      message: "Pacientes retornados com sucesso.",
      data: pacientes,
    });
  } catch (error) {
    console.error("Erro ao buscar pacientes:", error);
    next(error);
  }
};

const retornaPaciente = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID do paciente é obrigatório." });
    }

    const paciente = await buscaPaciente(id);

    res.status(200).json({
      message: "Paciente encontrado com sucesso.",
      data: paciente,
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

    const paciente = await updatePaciente(
      id,
      nome,
      idade,
      sexo,
      diagnostico,
      observacao
    );

    res.status(200).json({
      message: "Paciente atualizado com sucesso.",
      data: paciente,
    });
  } catch (error) {
    console.error("Erro ao atualizar paciente:", error);
    next(error);
  }
};

const deletaPaciente = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID do paciente é obrigatório." });
    }

    const paciente = await deletePaciente(id);

    res.status(200).json({
      message: "Paciente deletado com sucesso.",
      data: paciente,
    });
  } catch (error) {
    console.error("Erro ao deletar paciente:", error);
    next(error);
  }
};

module.exports = {
  criaPaciente,
  retornaTodosPacientes,
  retornaPaciente,
  atualizaPaciente,
  deletaPaciente,
};
