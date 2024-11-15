-- Tabela "profissional"
CREATE TABLE IF NOT EXISTS profissional (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    id_google VARCHAR(255)
);

-- Tabela "paciente"
CREATE TABLE IF NOT EXISTS paciente (
    id SERIAL PRIMARY KEY,
    id_profissional INTEGER REFERENCES profissional(id) ON DELETE CASCADE,
    nome VARCHAR(255) NOT NULL,
    idade INTEGER,
    sexo CHAR(1) NOT NULL,
    diagnostico VARCHAR(255),
    observacao VARCHAR(255)
);

-- Tabela "endereco"
CREATE TABLE IF NOT EXISTS endereco (
    id SERIAL PRIMARY KEY,
    id_paciente INTEGER REFERENCES paciente(id) ON DELETE CASCADE,
    rua VARCHAR(255),
    num INTEGER,
    bairro VARCHAR(255),
    cidade VARCHAR(255),
    estado CHAR(2),
    obs_endereco VARCHAR(255)
);

-- Tabela "info_extra"
CREATE TABLE IF NOT EXISTS info_extra (
    id SERIAL PRIMARY KEY,
    id_paciente INTEGER REFERENCES paciente(id) ON DELETE CASCADE,
    tel VARCHAR(20),
    data_nasc DATE,
    naturalidade VARCHAR(255),
    profissao VARCHAR(255),
    estado_civil VARCHAR(20),
    indicacao VARCHAR(255),
    encaminhamento VARCHAR(255)
);

-- Tabela "emergencia"
CREATE TABLE IF NOT EXISTS emergencia (
    id SERIAL PRIMARY KEY,
    id_paciente INTEGER REFERENCES paciente(id) ON DELETE CASCADE,
    ctt_emergencia VARCHAR(255),
    tel_ctt VARCHAR(20),
    medico VARCHAR(255),
    tel_med VARCHAR(20),
    convenio VARCHAR(255),
    cart_conv VARCHAR(255),
    hospital VARCHAR(255)
);

-- Tabela "historico"
CREATE TABLE IF NOT EXISTS historico (
    id SERIAL PRIMARY KEY,
    id_paciente INTEGER REFERENCES paciente(id) ON DELETE CASCADE,
    antecedente_cirurgico VARCHAR(255),
    result_cirurgia VARCHAR(255),
    tratamento_anterior VARCHAR(255),
    result_tratamento VARCHAR(255),
    antecedente_alergico VARCHAR(255),
    antecedente_oncologico VARCHAR(255),
    tratamento_ortomolecular VARCHAR(255),
    obs_historico_clinico VARCHAR(255)
);

-- Tabela "patologia"
CREATE TABLE IF NOT EXISTS patologia (
    id SERIAL PRIMARY KEY,
    id_paciente INTEGER REFERENCES paciente(id) ON DELETE CASCADE,
    obs_patologia VARCHAR(255)
);

-- Tabela "disp_prot"
CREATE TABLE IF NOT EXISTS disp_prot (
    id SERIAL PRIMARY KEY,
    id_patologia INTEGER REFERENCES patologia(id) ON DELETE CASCADE,
    marcapasso BOOLEAN,
    placa BOOLEAN,
    pino BOOLEAN,
    lente_ctt BOOLEAN,
    protese_dentaria BOOLEAN
);

-- Tabela "musc_derma"
CREATE TABLE IF NOT EXISTS musc_derma (
    id SERIAL PRIMARY KEY,
    id_patologia INTEGER REFERENCES patologia(id) ON DELETE CASCADE,
    problema_ortopedico BOOLEAN,
    osteoporose BOOLEAN,
    queloide BOOLEAN,
    mancha BOOLEAN,
    vitiligo BOOLEAN,
    mioma_uterino BOOLEAN
);

-- Tabela "endo_meta"
CREATE TABLE IF NOT EXISTS endo_meta (
    id SERIAL PRIMARY KEY,
    id_patologia INTEGER REFERENCES patologia(id) ON DELETE CASCADE,
    hipertiroidismo BOOLEAN,
    diabetes BOOLEAN,
    ovario_policistico BOOLEAN,
    desequilibrio_hormonal BOOLEAN
);

-- Tabela "auto_neuro_onco"
CREATE TABLE IF NOT EXISTS auto_neuro_onco (
    id SERIAL PRIMARY KEY,
    id_patologia INTEGER REFERENCES patologia(id) ON DELETE CASCADE,
    psoriase BOOLEAN,
    epilepsia BOOLEAN,
    lupus BOOLEAN,
    cancer BOOLEAN
);

-- Tabela "cardio_circul"
CREATE TABLE IF NOT EXISTS cardio_circul (
    id SERIAL PRIMARY KEY,
    id_patologia INTEGER REFERENCES patologia(id) ON DELETE CASCADE,
    hipertensao BOOLEAN,
    problema_cardiaco BOOLEAN,
    trombose BOOLEAN,
    has BOOLEAN
);

-- Tabela medicamento
CREATE TABLE IF NOT EXISTS medicamento (
    id SERIAL PRIMARY KEY,
    id_paciente INTEGER REFERENCES paciente(id) ON DELETE CASCADE,
    corticoide BOOLEAN,
    complexo_b BOOLEAN,
    vit_e BOOLEAN,
    anticoncepcional BOOLEAN,
    reposicao_hormonal BOOLEAN,
    diuretico BOOLEAN,
    roacutan BOOLEAN,
    sibutramina BOOLEAN,
    outro_med VARCHAR(255)
);

-- Tabela info_med
CREATE TABLE IF NOT EXISTS info_med (
    id SERIAL PRIMARY KEY,
    id_medicamento INTEGER REFERENCES medicamento(id) ON DELETE CASCADE,
    alergia_cosm_med VARCHAR(255) DEFAULT 'Não',
    mt_sensibilidade BOOLEAN,
    gestante BOOLEAN,
    qtd_filhos INTEGER,
    ciclo_menstrual VARCHAR(255)
);

-- Tabela estilo_vida
CREATE TABLE IF NOT EXISTS estilo_vida (
    id SERIAL PRIMARY KEY,
    id_paciente INTEGER REFERENCES paciente(id) ON DELETE CASCADE,
    mt_tempo_sentado BOOLEAN,
    atv_fis VARCHAR(255) DEFAULT 'Não',
    horas_sono INTEGER,
    bebe_alcool VARCHAR(255) DEFAULT 'Não',
    fumante BOOLEAN,
    preenchimento VARCHAR(255) DEFAULT 'Não',
    tratamento_med VARCHAR(255) DEFAULT 'Não'
);

-- Tabela alimentacao
CREATE TABLE IF NOT EXISTS alimentacao (
    id SERIAL PRIMARY KEY,
    id_estilo_vida INTEGER REFERENCES estilo_vida(id) ON DELETE CASCADE,
    gordura BOOLEAN,
    doce BOOLEAN,
    condimentada BOOLEAN,
    verdura BOOLEAN,
    dieta BOOLEAN,
    fibra BOOLEAN,
    intestino_preso BOOLEAN,
    pouca_agua BOOLEAN,
    pouca_urina BOOLEAN
);

-- Tabela fisioterapia
CREATE TABLE IF NOT EXISTS fisioterapia (
    id SERIAL PRIMARY KEY,
    id_paciente INTEGER REFERENCES paciente(id) ON DELETE CASCADE,
    obj_tratamento TEXT,
    recurso_terapeutico TEXT,
    plano_tratamento_fisio TEXT
);

-- Tabela fisio_avaliacao_clinica
CREATE TABLE IF NOT EXISTS fisio_avaliacao_clinica (
    id SERIAL PRIMARY KEY,
    id_fisio INTEGER REFERENCES fisioterapia(id) ON DELETE CASCADE,
    queixa_fisio TEXT,
    lesoes_fisio TEXT,
    semiologia TEXT,
    intensidade_dor INTEGER
);

-- Tabela fisio_apresentacao
CREATE TABLE IF NOT EXISTS fisio_apresentacao (
    id SERIAL PRIMARY KEY,
    id_fisio INTEGER REFERENCES fisioterapia(id) ON DELETE CASCADE,
    cadeira_rodas BOOLEAN,
    orientado BOOLEAN,
    internado BOOLEAN,
    deambulando BOOLEAN,
    deambulando_apoio BOOLEAN
);

-- Tabela fisio_avaliacao_historica
CREATE TABLE IF NOT EXISTS fisio_avaliacao_historica (
    id SERIAL PRIMARY KEY,
    id_fisio INTEGER REFERENCES fisioterapia(id) ON DELETE CASCADE,
    obs_historico_clinico TEXT,
    HMA TEXT,
    HMP TEXT,
    antecedentes_pessoais TEXT,
    antecedentes_familiares TEXT,
    exames_complementares BOOLEAN
);

-- Tabela fisio_inspecao
CREATE TABLE IF NOT EXISTS fisio_inspecao (
    id SERIAL PRIMARY KEY,
    id_fisio INTEGER REFERENCES fisioterapia(id) ON DELETE CASCADE,
    normal BOOLEAN,
    edema BOOLEAN,
    cicatrizacao_incompleta BOOLEAN,
    eritemas BOOLEAN,
    outro_result_inspecao VARCHAR(255)
);

-- Tabela estetica_corpo
CREATE TABLE IF NOT EXISTS estetica_corpo (
    id SERIAL PRIMARY KEY,
    id_paciente INTEGER REFERENCES paciente(id) ON DELETE CASCADE,
    queixa_corpo TEXT,
    usa_usou_acidos VARCHAR(255) DEFAULT 'Não',
    cuidado_produto_diario VARCHAR(255) DEFAULT 'Não',
    tem_varizes VARCHAR(255) DEFAULT 'Não',
    lesoes_corpo VARCHAR(255) DEFAULT 'Não',
    plano_tratamento_corpo TEXT
);

-- Tabela "estetica_facial"
CREATE TABLE IF NOT EXISTS estetica_facial (
    id SERIAL PRIMARY KEY,
    id_paciente INTEGER NOT NULL REFERENCES paciente(id) ON DELETE CASCADE,
    tratamento_indicado TEXT,
    manutencao_diurna TEXT,
    manutencao_noturna TEXT
);

-- Tabela "queixa_facial"
CREATE TABLE IF NOT EXISTS queixa_facial (
    id SERIAL PRIMARY KEY,
    id_facial INTEGER NOT NULL REFERENCES estetica_facial(id) ON DELETE CASCADE,
    outras_queixas_face VARCHAR(255)
);

-- Tabela "queixa_estrutura_contorno"
CREATE TABLE IF NOT EXISTS queixa_estrutura_contorno (
    id SERIAL PRIMARY KEY,
    id_queixa INTEGER NOT NULL REFERENCES queixa_facial(id) ON DELETE CASCADE,
    colo BOOLEAN,
    contorno_face BOOLEAN,
    papada BOOLEAN,
    palpebras BOOLEAN,
    pescoco BOOLEAN,
    flacidez_muscular BOOLEAN,
    flacidez_pele BOOLEAN,
    face_completa BOOLEAN
);

-- Tabela "queixa_condicao_pele"
CREATE TABLE IF NOT EXISTS queixa_condicao_pele (
    id SERIAL PRIMARY KEY,
    id_queixa INTEGER NOT NULL REFERENCES queixa_facial(id) ON DELETE CASCADE,
    vasinhos BOOLEAN,
    excesso_oleosidade BOOLEAN,
    rugas_olhos BOOLEAN,
    sardas BOOLEAN,
    olheiras BOOLEAN,
    ressecamento_pele BOOLEAN
);

-- Tabela "higiene_facial"
CREATE TABLE IF NOT EXISTS higiene_facial (
    id SERIAL PRIMARY KEY,
    id_facial INTEGER NOT NULL REFERENCES estetica_facial(id) ON DELETE CASCADE,
    qtd_lava_face VARCHAR(255),
    qual_produto VARCHAR(255),
    usa_cosm VARCHAR(255),
    limpeza BOOLEAN,
    tonico BOOLEAN,
    hidratante BOOLEAN,
    fps BOOLEAN,
    usa_make VARCHAR(255),
    remove_make BOOLEAN
);

-- Tabela "lesao_alteracao_facial"
CREATE TABLE IF NOT EXISTS lesao_alteracao_facial (
    id SERIAL PRIMARY KEY,
    id_facial INTEGER NOT NULL REFERENCES estetica_facial(id) ON DELETE CASCADE,
    obs_lesao TEXT
);

-- Tabela "alteracao_envelhecimento"
CREATE TABLE IF NOT EXISTS alteracao_envelhecimento (
    id SERIAL PRIMARY KEY,
    id_lesao INTEGER NOT NULL REFERENCES lesao_alteracao_facial(id) ON DELETE CASCADE,
    atrofia BOOLEAN,
    rugas_estaticas BOOLEAN,
    rugas_dinamicas BOOLEAN
);

-- Tabela "alteracao_cabelo_cicatriz"
CREATE TABLE IF NOT EXISTS alteracao_cabelo_cicatriz (
    id SERIAL PRIMARY KEY,
    id_lesao INTEGER NOT NULL REFERENCES lesao_alteracao_facial(id) ON DELETE CASCADE,
    escoriacao BOOLEAN,
    ptose BOOLEAN,
    hipertricose BOOLEAN,
    hirsurtismo BOOLEAN,
    cicatriz BOOLEAN
);

-- Tabela "lesao_pigmentar"
CREATE TABLE IF NOT EXISTS lesao_pigmentar (
    id SERIAL PRIMARY KEY,
    id_lesao INTEGER NOT NULL REFERENCES lesao_alteracao_facial(id) ON DELETE CASCADE,
    poiquilodermia BOOLEAN,
    melasma BOOLEAN,
    acromia BOOLEAN,
    efelides BOOLEAN,
    angioma BOOLEAN,
    petequias BOOLEAN
);

-- Tabela "lesao_vascular_nodular"
CREATE TABLE IF NOT EXISTS lesao_vascular_nodular (
    id SERIAL PRIMARY KEY,
    id_lesao INTEGER NOT NULL REFERENCES lesao_alteracao_facial(id) ON DELETE CASCADE,
    xantelasma BOOLEAN,
    verrugas BOOLEAN,
    seringoma BOOLEAN,
    cisto BOOLEAN,
    telangectasia BOOLEAN,
    milium BOOLEAN,
    nevos BOOLEAN,
    papulas BOOLEAN
);

-- Tabela "lesao_acneia_inflamatoria"
CREATE TABLE IF NOT EXISTS lesao_acneia_inflamatoria (
    id SERIAL PRIMARY KEY,
    id_lesao INTEGER NOT NULL REFERENCES lesao_alteracao_facial(id) ON DELETE CASCADE,
    herpes BOOLEAN,
    pustulas BOOLEAN,
    comedoes_abertos BOOLEAN,
    comedoes_fechados BOOLEAN,
    abcesos BOOLEAN,
    rosacea BOOLEAN
);

-- Tabela "avaliacao_pele"
CREATE TABLE IF NOT EXISTS avaliacao_pele (
    id SERIAL PRIMARY KEY,
    id_facial INTEGER NOT NULL REFERENCES estetica_facial(id) ON DELETE CASCADE,
    tipo_pele TEXT,
    biotipo_cutaneo TEXT,
    pele_acne BOOLEAN,
    ao_tato TEXT,
    hidratacao BOOLEAN,
    avaliacao_flacidez_pele BOOLEAN
);

-- Tabela "evolucao"
CREATE TABLE IF NOT EXISTS evolucao (
    id SERIAL PRIMARY KEY,
    id_paciente INTEGER NOT NULL REFERENCES paciente(id) ON DELETE CASCADE,
    data DATE NOT NULL,
    evolucao TEXT NOT NULL
);
