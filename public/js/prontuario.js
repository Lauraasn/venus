document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pacienteId = urlParams.get("id");
  
    if (pacienteId) {
      await carregarDadosDoPaciente(pacienteId);
    }
  });

  const form1 = document.getElementById("anamneseGeralForm");
  const form2 = document.getElementById("anamneseFisioForm");
  const form3 = document.getElementById("anamneseEsteticaForm");

  let editMode = false;
  let currentEditId = null;

  const resetForm1 = () => {
    editMode = false;
    currentEditId = null;
    form1.reset();
  };

  const resetForm2 = () => {
    editMode = false;
    currentEditId = null;
    form2.reset();
  };

  const resetForm3 = () => {
    editMode = false;
    currentEditId = null;
    form3.reset();
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();

    const endereco = {};
    const enderecoInputs = document.getElementsByClassName("endereco");

    Array.from(enderecoInputs).forEach((input) => {
      let value = input.value || null;

      if (input.type === "number") {
        value = value !== null ? parseInt(value, 10) : null;
      } else if (input.type === "checkbox") {
        value = input.checked;
      }

      endereco[input.name] = value || null;
    });

    const infoExtra = {};
    const infoExtraInputs = document.getElementsByClassName("infoExtra");

    Array.from(infoExtraInputs).forEach((input) => {
      let value = input.value || null;

      if (input.type === "number") {
        value = value !== null ? parseInt(value, 10) : null;
      } else if (input.type === "checkbox") {
        value = input.checked;
      }
      
      infoExtra[input.name] = value || null;
    });

    const emergencia = {};
    const emergenciaInputs = document.getElementsByClassName("emergencia");

    Array.from(emergenciaInputs).forEach((input) => {
      let value = input.value || null;

      if (input.type === "number") {
        value = value !== null ? parseInt(value, 10) : null;
      } else if (input.type === "checkbox") {
        value = input.checked;
      }
      
      emergencia[input.name] = value || null;
    });

    const historico = {};
    const historicoInputs = document.getElementsByClassName("historico");

    Array.from(historicoInputs).forEach((input) => {
      let value = input.value || null;

      if (input.type === "number") {
        value = value !== null ? parseInt(value, 10) : null;
      } else if (input.type === "checkbox") {
        value = input.checked;
      }
      
      historico[input.id] = value || null;
    });

    const patologia = {};
    const patologiaInputs = document.getElementsByClassName("patologia");

    Array.from(patologiaInputs).forEach((input) => {
      let value = input.value || null;

      if (input.type === "number") {
        value = value !== null ? parseInt(value, 10) : null;
      } else if (input.type === "checkbox") {
        value = input.checked;
      }
      
      patologia[input.id] = value || null;
    });

    const dispProt = {};
    const dispProtInputs = document.getElementsByClassName("dispProt");

    Array.from(dispProtInputs).forEach((input) => {
      let value = input.value || null;

      if (input.type === "number") {
        value = value !== null ? parseInt(value, 10) : null;
      } else if (input.type === "checkbox") {
        value = input.checked;
      }
      
      dispProt[input.id] = value || null;
    });

    const muscDerma = {};
    const muscDermaInputs = document.getElementsByClassName("muscDerma");

    Array.from(muscDermaInputs).forEach((input) => {
      let value = input.value || null;

      if (input.type === "number") {
        value = value !== null ? parseInt(value, 10) : null;
      } else if (input.type === "checkbox") {
        value = input.checked;
      }
      
      muscDerma[input.id] = value || null;
    });

    const endoMeta = {};
    const endoMetaInputs = document.getElementsByClassName("endoMeta");

    Array.from(endoMetaInputs).forEach((input) => {
      let value = input.value || null;

      if (input.type === "number") {
        value = value !== null ? parseInt(value, 10) : null;
      } else if (input.type === "checkbox") {
        value = input.checked;
      }
      
      endoMeta[input.id] = value || null;
    });

    const autoNeuroOnco = {};
    const autoNeuroOncoInputs = document.getElementsByClassName("autoNeuroOnco");

    Array.from(autoNeuroOncoInputs).forEach((input) => {
      let value = input.value || null;

      if (input.type === "number") {
        value = value !== null ? parseInt(value, 10) : null;
      } else if (input.type === "checkbox") {
        value = input.checked;
      }
      
      autoNeuroOnco[input.id] = value || null;
    });

    const cardioCircul = {};
    const cardioCirculInputs = document.getElementsByClassName("cardioCircul");

    Array.from(cardioCirculInputs).forEach((input) => {
      let value = input.value || null;

      if (input.type === "number") {
        value = value !== null ? parseInt(value, 10) : null;
      } else if (input.type === "checkbox") {
        value = input.checked;
      }
      
      cardioCircul[input.id] = value || null;
    });

    const medicamento = {};
    const medicamentoInputs = document.getElementsByClassName("medicamento");

    Array.from(medicamentoInputs).forEach((input) => {
      let value = input.value || null;

      if (input.type === "number") {
        value = value !== null ? parseInt(value, 10) : null;
      } else if (input.type === "checkbox") {
        value = input.checked;
      }
      
      medicamento[input.id] = value || null;
    });

    const infoMed = {};
    const infoMedInputs = document.getElementsByClassName("infoMed");

    Array.from(infoMedInputs).forEach((input) => {
      let value = input.value || null;

      if (input.type === "number") {
        value = value !== null ? parseInt(value, 10) : null;
      } else if (input.type === "checkbox") {
        value = input.checked;
      }
      
      infoMed[input.id] = value || null;
    });

    const estiloVida = {};
    const estiloVidaInputs = document.getElementsByClassName("estiloVida");

    Array.from(estiloVidaInputs).forEach((input) => {
      let value = input.value || null;

      if (input.type === "number") {
        value = value !== null ? parseInt(value, 10) : null;
      } else if (input.type === "checkbox") {
        value = input.checked;
      }
      
      estiloVida[input.id] = value || null;
    });

    const alimentacao = {};
    const alimentacaoInputs = document.getElementsByClassName("alimentacao");

    Array.from(alimentacaoInputs).forEach((input) => {
      let value = input.value || null;

      if (input.type === "number") {
        value = value !== null ? parseInt(value, 10) : null;
      } else if (input.type === "checkbox") {
        value = input.checked;
      }
      
      alimentacao[input.id] = value || null;
    });

    const formData = {
      nome: document.getElementsByName("nome")[0].value,
      idade: document.getElementsByName("idade")[0].value || null,
      sexo: document.getElementsByName("sexo")[0].value,
      diagnostico: document.getElementsByName("diagnostico")[0].value || null,
      observacao: document.getElementsByName("observacao")[0].value || null,
      tel: document.getElementsByName("tel")[0].value || null,
      ultimoAtendimento: document.getElementsByName("ultimoAtendimento")[0].value || null,
      proximoAtendimento: document.getElementsByName("proximoAtendimento")[0].value || null,
      endereco: endereco,
      infoExtra: infoExtra,
      emergencia: emergencia,
      historico: historico,
      patologia: patologia,
      dispProt: dispProt,
      muscDerma: muscDerma,
      endoMeta: endoMeta,
      autoNeuroOnco: autoNeuroOnco,
      cardioCircul: cardioCircul,
      medicamento: medicamento,
      infoMed: infoMed,
      estiloVida: estiloVida,
      alimentacao: alimentacao,
    };

    console.log("formData de prontuario.js:", formData);

    try {
      const method = editMode ? "PUT" : "POST";
      const url = editMode
        ? `/paciente/update/${currentEditId}`
        : "/paciente/create-anamnese-geral";
  
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      console.log("response:", response);
  
      if (!response.ok){
        const errorDetails = await response.text();
        throw new Error(`Erro no envio: ${errorDetails}`);
      }
  
      const result = await response.json();
      console.log(result.message);

      resetForm1();
    } catch (error) {
      console.error("Erro ao enviar ou atualizar paciente:", error);
    }
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
  };

  const handleSubmit3 = (e) => {
    e.preventDefault();
  };

  const carregarDadosDoPaciente = async (id) => {
    try {
      const response = await fetch(`/paciente/read/${id}`);
      if (!response.ok) throw new Error("Erro ao buscar dados do paciente.");
  
      const { data } = await response.json();

      document.getElementsByName("nome")[0].value = data.nome;
      document.getElementsByName("idade")[0].value = data.idade || null;
      document.getElementsByName("sexo")[0].value = data.sexo;
      document.getElementsByName("diagnostico")[0].value = data.diagnostico || null;
      document.getElementsByName("observacao")[0].value = data.observacao || null;
      document.getElementsByName("tel")[0].value = data.tel || null;

      const formatDateForInput = (date) => {
        if (!date) return "";
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}T${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
      };
  
      document.getElementsByName("ultimoAtendimento")[0].value = formatDateForInput(data.ultimo_atendimento) || null;
      document.getElementsByName("proximoAtendimento")[0].value = formatDateForInput(data.proximo_atendimento) || null;
    } catch (error) {
      console.error("Erro ao carregar dados do paciente:", error);
    }
  };
  

  form1.addEventListener("submit", handleSubmit1);
  form2.addEventListener("submit", handleSubmit2);
  form3.addEventListener("submit", handleSubmit3);
  