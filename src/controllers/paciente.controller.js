const {
  cadastraPaciente,
  cadastraPacienteGeral,
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

const criaPacienteGeral = async (req, res, next) => {
  try {
    const trataCampos = (campo) => campo === undefined || campo === null || campo === "" ? null : campo;

    const {
      nome,
      idade,
      sexo,
      diagnostico,
      observacao,
      tel,
      ultimoAtendimento,
      proximoAtendimento,
      endereco,
      infoExtra,
      emergencia,
      historico,
      patologia,
      dispProt,
      muscDerma,
      endoMeta,
      autoNeuroOnco,
      cardioCircul,
      medicamento,
      infoMed,
      estiloVida,
      alimentacao,
    } = req.body;

    if (!nome || !sexo) {
      return res
        .status(400)
        .json({ message: "Campos obrigatórios não foram preenchidos." });
    }

    const pacienteData = {
      nome: trataCampos(nome),
      idade: trataCampos(idade),
      sexo: trataCampos(sexo),
      diagnostico: trataCampos(diagnostico),
      observacao: trataCampos(observacao),
      tel: trataCampos(tel),
      ultimo_atendimento: ultimoAtendimento ? new Date(ultimoAtendimento) : null,
      proximo_atendimento: proximoAtendimento ? new Date(proximoAtendimento) : null,
      endereco: {
        rua: trataCampos(endereco?.rua),
        num: trataCampos(endereco?.num),
        bairro: trataCampos(endereco?.bairro),
        cidade: trataCampos(endereco?.cidade),
        estado: trataCampos(endereco?.estado),
        obs_endereco: trataCampos(endereco?.obs_endereco),
      },
      info_extra: {
        data_nasc: trataCampos(infoExtra?.data_nasc),
        naturalidade: trataCampos(infoExtra?.naturalidade),
        profissao: trataCampos(infoExtra?.profissao),
        estado_civil: trataCampos(infoExtra?.estado_civil),
        indicacao: trataCampos(infoExtra?.indicacao),
        encaminhamento: trataCampos(infoExtra?.encaminhamento),
      },
      emergencia: {
        ctt_emergencia: trataCampos(emergencia?.ctt_emergencia),
        tel_ctt: trataCampos(emergencia?.tel_ctt),
        medico: trataCampos(emergencia?.medico),
        tel_med: trataCampos(emergencia?.tel_med),
        convenio: trataCampos(emergencia?.convenio),
        cart_conv: trataCampos(emergencia?.cart_conv),
        hospital: trataCampos(emergencia?.hospital),
      },
      historico: {
        antecedente_cirurgico: trataCampos(historico?.antecedente_cirurgico),
        result_cirurgia: trataCampos(historico?.result_cirurgia),
        tratamento_anterior: trataCampos(historico?.tratamento_anterior),
        result_tratamento: trataCampos(historico?.result_tratamento),
        antecedente_alergico: trataCampos(historico?.antecedente_alergico),
        antecedente_oncologico: trataCampos(historico?.antecedente_oncologico),
        tratamento_ortomolecular: trataCampos(historico?.tratamento_ortomolecular),
        obs_historico_clinico: trataCampos(historico?.obs_historico_clinico),
      },
      patologia: {
        obs_patologia: trataCampos(patologia?.obs_patologia),
      },
      disp_prot: {
        marcapasso: trataCampos(dispProt?.marcapasso),
        placa: trataCampos(dispProt?.placa),
        pino: trataCampos(dispProt?.pino),
        lente_ctt: trataCampos(dispProt?.lente_ctt),
        protese_dentaria: trataCampos(dispProt?.protese_dentaria),
      },
      musc_derma: {
        problema_ortopedico: trataCampos(muscDerma?.problema_ortopedico),
        osteoporose: trataCampos(muscDerma?.osteoporose),
        queloide: trataCampos(muscDerma?.queloide),
        mancha: trataCampos(muscDerma?.mancha),
        vitiligo: trataCampos(muscDerma?.vitiligo),
        mioma_uterino: trataCampos(muscDerma?.mioma_uterino),
      },
      endo_meta: {
        hipertiroidismo: trataCampos(endoMeta?.hipertiroidismo),
        diabetes: trataCampos(endoMeta?.diabetes),
        ovario_policistico: trataCampos(endoMeta?.ovario_policistico),
        desequilibrio_hormonal: trataCampos(endoMeta?.desequilibrio_hormonal),
      },
      auto_neuro_onco: {
        psoriase: trataCampos(autoNeuroOnco?.psoriase),
        epilepsia: trataCampos(autoNeuroOnco?.epilepsia),
        lupus: trataCampos(autoNeuroOnco?.lupus),
        cancer: trataCampos(autoNeuroOnco?.cancer),
      },
      cardio_circul: {
        hipertensao: trataCampos(cardioCircul?.hipertensao),
        problema_cardiaco: trataCampos(cardioCircul?.problema_cardiaco),
        trombose: trataCampos(cardioCircul?.trombose),
        has: trataCampos(cardioCircul?.has),
      },
      medicamento: {
        corticoide: trataCampos(medicamento?.corticoide),
        complexo_b: trataCampos(medicamento?.complexo_b),
        vit_e: trataCampos(medicamento?.vit_e),
        anticoncepcional: trataCampos(medicamento?.anticoncepcional),
        reposicao_hormonal: trataCampos(medicamento?.reposicao_hormonal),
        diuretico: trataCampos(medicamento?.diuretico),
        roacutan: trataCampos(medicamento?.roacutan),
        sibutramina: trataCampos(medicamento?.sibutramina),
        outro_med: trataCampos(medicamento?.outro_med),
      },
      info_med: {
        alergia_cosm_med: trataCampos(infoMed?.alergia_cosm_med),
        mt_sensibilidade: trataCampos(infoMed?.mt_sensibilidade),
        gestante: trataCampos(infoMed?.gestante),
        qtd_filhos: trataCampos(infoMed?.qtd_filhos),
        ciclo_menstrual: trataCampos(infoMed?.ciclo_menstrual),
      },
      estilo_vida: {
        mt_tempo_sentado: trataCampos(estiloVida?.mt_tempo_sentado),
        atv_fis: trataCampos(estiloVida?.atv_fis),
        horas_sono: trataCampos(estiloVida?.horas_sono),
        bebe_alcool: trataCampos(estiloVida?.bebe_alcool),
        fumante: trataCampos(estiloVida?.fumante),
        preenchimento: trataCampos(estiloVida?.preenchimento),
        tratamento_med: trataCampos(estiloVida?.tratamento_med),
      },
      alimentacao: {
        gordura: trataCampos(alimentacao?.gordura),
        doce: trataCampos(alimentacao?.doce),
        condimentada: trataCampos(alimentacao?.condimentada),
        verdura: trataCampos(alimentacao?.verdura),
        dieta: trataCampos(alimentacao?.dieta),
        fibra: trataCampos(alimentacao?.fibra),
        intestino_preso: trataCampos(alimentacao?.intestino_preso),
        pouca_agua: trataCampos(alimentacao?.pouca_agua),
        pouca_urina: trataCampos(alimentacao?.pouca_urina),
      },
    };

    const resultado = await cadastraPacienteGeral(pacienteData);

    res.status(201).json({
      message: "Paciente e informações relacionadas cadastrados com sucesso.",
      data: resultado,
    });
  } catch (error) {
    console.error("Erro ao criar paciente e informações relacionadas:", error);
    res.status(500).json({ message: 'Erro ao cadastrar paciente', error: error.message });
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
  criaPacienteGeral,
  retornaTodosPacientes,
  retornaPaciente,
  atualizaPaciente,
  deletaPaciente,
};
