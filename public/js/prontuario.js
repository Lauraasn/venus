document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pacienteId = urlParams.get("id");
  
    if (pacienteId) {
      await carregarDadosDoPaciente(pacienteId);
    }
  });

  const carregarDadosDoPaciente = async (id) => {
    try {
      const response = await fetch(`/paciente/read/${id}`);
      if (!response.ok) throw new Error("Erro ao buscar dados do paciente.");
  
      const { data } = await response.json();
      console.log("data: ", data);

      console.log("Nome: vazio");
      document.getElementsByName("nome")[0].value = data.nome;
      document.getElementsByName("idade")[0].value = data.idade || null;
      document.getElementsByName("sexo")[0].value = data.sexo;
      document.getElementsByName("diagnostico")[0].value = data.diagnostico || null;
      document.getElementsByName("observacao")[0].value = data.observacao || null;
      document.getElementsByName("tel")[0].value = data.tel || null;

      console.log("Nome:",data.nome);
      console.log("Idade:",data.idade);
      console.log("Sexo:",data.sexo);
      console.log("Diagnóstico:",data.diagnostico);
      console.log("Observação:",data.observacao);
      console.log("Telefone:",data.tel);

      const formatDateForInput = (date) => {
        if (!date) return "";
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}T${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
      };
  
      document.getElementsByName("ultimoAtendimento")[0].value = formatDateForInput(data.ultimo_atendimento) || null;
      document.getElementsByName("proximoAtendimento")[0].value = formatDateForInput(data.proximo_atendimento) || null;

      console.log("Último atendimento:", formatDateForInput(data.ultimo_atendimento));
      console.log("Próximo atendimento:", formatDateForInput(data.proximo_atendimento));
    } catch (error) {
      console.error("Erro ao carregar dados do paciente:", error);
    }
  };
  
  