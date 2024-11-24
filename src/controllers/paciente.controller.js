const {
  cadastraPaciente,
  buscaTodosPacientes,
  buscaPaciente,
  updatePaciente,
  deletePaciente,
} = require("../models/paciente.model");

const criaPaciente = async (req, res, next) => {
  try {
    const trataCampos = (campo) => (campo === "" ? null : campo);
    const { nome, idade, sexo, diagnostico, observacao, tel, ultimoAtendimento, proximoAtendimento } = req.body;

    const ultimo_atendimento = ultimoAtendimento ? new Date(ultimoAtendimento) : null;
    const proximo_atendimento = proximoAtendimento ? new Date(proximoAtendimento) : null;
    
    if (!nome || !sexo) {
      return res
        .status(400)
        .json({ message: "Campos obrigatórios não foram preenchidos." });
    }

    const paciente = await cadastraPaciente(
      nome,
      trataCampos(idade),
      sexo,
      trataCampos(diagnostico),
      trataCampos(observacao),
      trataCampos(tel),
      ultimo_atendimento,
      proximo_atendimento
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
    const trataCampos = (campo) => (campo === "" ? null : campo);
    const { nome, idade, sexo, diagnostico, observacao, tel, ultimoAtendimento, proximoAtendimento } = req.body;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID do paciente é obrigatório." });
    }

    const ultimo_atendimento = ultimoAtendimento ? new Date(ultimoAtendimento) : null;
    const proximo_atendimento = proximoAtendimento ? new Date(proximoAtendimento) : null;

    const paciente = await updatePaciente(
      id,
      nome,
      trataCampos(idade),
      sexo,
      trataCampos(diagnostico),
      trataCampos(observacao),
      trataCampos(tel),
      ultimo_atendimento,
      proximo_atendimento
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
