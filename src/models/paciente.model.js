const pool = require("../database/db");

const cadastraPaciente = async (
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
            INSERT INTO paciente (nome, idade, sexo, diagnostico, observacao, tel, ultimo_atendimento, proximo_atendimento)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `;
  const values = [
    nome,
    idade,
    sexo,
    diagnostico,
    observacao,
    tel,
    ultimo_atendimento,
    proximo_atendimento,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

const cadastraPacienteGeral = async (pacienteData) => {
  console.log("Dados do paciente:", pacienteData);
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const pacienteQuery = `
      INSERT INTO paciente (nome, idade, sexo, diagnostico, observacao, tel, ultimo_atendimento, proximo_atendimento)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id;
    `;
    const pacienteValues = [
      pacienteData.nome,
      pacienteData.idade,
      pacienteData.sexo,
      pacienteData.diagnostico,
      pacienteData.observacao,
      pacienteData.tel,
      pacienteData.ultimo_atendimento,
      pacienteData.proximo_atendimento,
    ];
    const pacienteResult = await client.query(pacienteQuery, pacienteValues);
    const pacienteId = pacienteResult.rows[0].id;

    const enderecoQuery = `
      INSERT INTO endereco (id_paciente, rua, num, bairro, cidade, estado, obs_endereco)
      VALUES ($1, $2, $3, $4, $5, $6, $7);
    `;
    const enderecoValues = [
      pacienteId,
      pacienteData.endereco.rua,
      pacienteData.endereco.num,
      pacienteData.endereco.bairro,
      pacienteData.endereco.cidade,
      pacienteData.endereco.estado,
      pacienteData.endereco.obs_endereco,
    ];
    await client.query(enderecoQuery, enderecoValues);

    const infoExtraQuery = `
      INSERT INTO info_extra (id_paciente, data_nasc, naturalidade, profissao, estado_civil, indicacao, encaminhamento)
      VALUES ($1, $2, $3, $4, $5, $6, $7);
    `;
    const infoExtraValues = [
      pacienteId,
      pacienteData.info_extra.data_nasc,
      pacienteData.info_extra.naturalidade,
      pacienteData.info_extra.profissao,
      pacienteData.info_extra.estado_civil,
      pacienteData.info_extra.indicacao,
      pacienteData.info_extra.encaminhamento,
    ];
    await client.query(infoExtraQuery, infoExtraValues);

    const emergenciaQuery = `
      INSERT INTO emergencia (id_paciente, ctt_emergencia, tel_ctt, medico, tel_med, convenio, cart_conv, hospital)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `;
    const emergenciaValues = [
      pacienteId,
      pacienteData.emergencia.ctt_emergencia,
      pacienteData.emergencia.tel_ctt,
      pacienteData.emergencia.medico,
      pacienteData.emergencia.tel_med,
      pacienteData.emergencia.convenio,
      pacienteData.emergencia.cart_conv,
      pacienteData.emergencia.hospital,
    ];
    await client.query(emergenciaQuery, emergenciaValues);

    const historicoQuery = `
      INSERT INTO historico (id_paciente, antecedente_cirurgico, result_cirurgia, tratamento_anterior, result_tratamento, antecedente_alergico, antecedente_oncologico, tratamento_ortomolecular, obs_historico_clinico)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
    `;
    const historicoValues = [
      pacienteId,
      pacienteData.historico.antecedente_cirurgico,
      pacienteData.historico.result_cirurgia,
      pacienteData.historico.tratamento_anterior,
      pacienteData.historico.result_tratamento,
      pacienteData.historico.antecedente_alergico,
      pacienteData.historico.antecedente_oncologico,
      pacienteData.historico.tratamento_ortomolecular,
      pacienteData.historico.obs_historico_clinico,
    ];
    await client.query(historicoQuery, historicoValues);

    const patologiaQuery = `
      INSERT INTO patologia (id_paciente, obs_patologia)
      VALUES ($1, $2)
      RETURNING id;
    `;
    const patologiaValues = [
      pacienteId,
      pacienteData.patologia.obs_patologia,
    ];
    const patologiaResult = await client.query(patologiaQuery, patologiaValues);
    const patologiaId = patologiaResult.rows[0].id;

    const dispProtQuery = `
      INSERT INTO disp_prot (id_patologia, marcapasso, placa, pino, lente_ctt, protese_dentaria)
      VALUES ($1, $2, $3, $4, $5, $6);
    `;
    const dispProtValues = [
      patologiaId,
      pacienteData.disp_prot.marcapasso,
      pacienteData.disp_prot.placa,
      pacienteData.disp_prot.pino,
      pacienteData.disp_prot.lente_ctt,
      pacienteData.disp_prot.protese_dentaria,
    ];
    await client.query(dispProtQuery, dispProtValues);

    const muscDermaQuery = `
      INSERT INTO musc_derma (id_patologia, problema_ortopedico, osteoporose, queloide, mancha, vitiligo, mioma_uterino)
      VALUES ($1, $2, $3, $4, $5, $6, $7);
    `;
    const muscDermaValues = [
      patologiaId,
      pacienteData.musc_derma.problema_ortopedico,
      pacienteData.musc_derma.osteoporose,
      pacienteData.musc_derma.queloide,
      pacienteData.musc_derma.mancha,
      pacienteData.musc_derma.vitiligo,
      pacienteData.musc_derma.mioma_uterino,
    ];
    await client.query(muscDermaQuery, muscDermaValues);

    const endoMetaQuery = `
      INSERT INTO endo_meta (id_patologia, hipertiroidismo, diabetes, ovario_policistico, desequilibrio_hormonal)
      VALUES ($1, $2, $3, $4, $5);
    `;
    const endoMetaValues = [
      patologiaId,
      pacienteData.endo_meta.hipertiroidismo,
      pacienteData.endo_meta.diabetes,
      pacienteData.endo_meta.ovario_policistico,
      pacienteData.endo_meta.desequilibrio_hormonal,
    ];
    await client.query(endoMetaQuery, endoMetaValues);

    const autoNeuroOncoQuery = `
      INSERT INTO auto_neuro_onco (id_patologia, psoriase, epilepsia, lupus, cancer)
      VALUES ($1, $2, $3, $4, $5);
    `;
    const autoNeuroOncoValues = [
      patologiaId,
      pacienteData.auto_neuro_onco.psoriase,
      pacienteData.auto_neuro_onco.epilepsia,
      pacienteData.auto_neuro_onco.lupus,
      pacienteData.auto_neuro_onco.cancer,
    ];
    await client.query(autoNeuroOncoQuery, autoNeuroOncoValues);

    const cardioCirculQuery = `
      INSERT INTO cardio_circul (id_patologia, hipertensao, problema_cardiaco, trombose, has)
      VALUES ($1, $2, $3, $4, $5);
    `;
    const cardioCirculValues = [
      patologiaId,
      pacienteData.cardio_circul.hipertensao,
      pacienteData.cardio_circul.problema_cardiaco,
      pacienteData.cardio_circul.trombose,
      pacienteData.cardio_circul.has,
    ];
    await client.query(cardioCirculQuery, cardioCirculValues);

    const medicamentoQuery = `
      INSERT INTO medicamento (id_paciente, corticoide, complexo_b, vit_e, anticoncepcional, reposicao_hormonal, diuretico, roacutan, sibutramina, outro_med)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id;
    `;
    const medicamentoValues = [
      pacienteId,
      pacienteData.medicamento.corticoide,
      pacienteData.medicamento.complexo_b,
      pacienteData.medicamento.vit_e,
      pacienteData.medicamento.anticoncepcional,
      pacienteData.medicamento.reposicao_hormonal,
      pacienteData.medicamento.diuretico,
      pacienteData.medicamento.roacutan,
      pacienteData.medicamento.sibutramina,
      pacienteData.medicamento.outro_med,
    ];
    const medicamentoResult = await client.query(medicamentoQuery, medicamentoValues);
    const medicamentoId = medicamentoResult.rows[0].id;

    const infoMedQuery = `
      INSERT INTO info_med (id_medicamento, alergia_cosm_med, mt_sensibilidade, gestante, qtd_filhos, ciclo_menstrual)
      VALUES ($1, $2, $3, $4, $5, $6);
    `;
    const infoMedValues = [
      medicamentoId,
      pacienteData.info_med.alergia_cosm_med,
      pacienteData.info_med.mt_sensibilidade,
      pacienteData.info_med.gestante,
      pacienteData.info_med.qtd_filhos,
      pacienteData.info_med.ciclo_menstrual,
    ];
    await client.query(infoMedQuery, infoMedValues);

    const estiloVidaQuery = `
      INSERT INTO estilo_vida (id_paciente, mt_tempo_sentado, atv_fis, horas_sono, bebe_alcool, fumante, preenchimento, tratamento_med)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id;
    `;
    const estiloVidaValues = [
      pacienteId,
      pacienteData.estilo_vida.mt_tempo_sentado,
      pacienteData.estilo_vida.atv_fis,
      pacienteData.estilo_vida.horas_sono,
      pacienteData.estilo_vida.bebe_alcool,
      pacienteData.estilo_vida.fumante,
      pacienteData.estilo_vida.preenchimento,
      pacienteData.estilo_vida.tratamento_med,
    ];
    const estiloVidaResult = await client.query(estiloVidaQuery, estiloVidaValues);
    const estiloVidaId = estiloVidaResult.rows[0].id;

    const alimentacaoQuery = `
      INSERT INTO alimentacao (id_estilo_vida, gordura, doce, condimentada, verdura, dieta, fibra, intestino_preso, pouca_agua, pouca_urina)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
    `;
    const alimentacaoValues = [
      estiloVidaId,
      pacienteData.alimentacao.gordura,
      pacienteData.alimentacao.doce,
      pacienteData.alimentacao.condimentada,
      pacienteData.alimentacao.verdura,
      pacienteData.alimentacao.dieta,
      pacienteData.alimentacao.fibra,
      pacienteData.alimentacao.intestino_preso,
      pacienteData.alimentacao.pouca_agua,
      pacienteData.alimentacao.pouca_urina,
    ];
    await client.query(alimentacaoQuery, alimentacaoValues);

    await client.query("COMMIT");
    return { success: true, pacienteId };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
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

  const values = [
    id,
    nome,
    idade,
    sexo,
    diagnostico,
    observacao,
    tel,
    ultimo_atendimento,
    proximo_atendimento,
  ];
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
};

module.exports = {
  cadastraPaciente,
  cadastraPacienteGeral,
  buscaTodosPacientes,
  buscaPaciente,
  updatePaciente,
  deletePaciente,
};
