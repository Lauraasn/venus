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

  const handleSubmit1 = (e) => {
    e.preventDefault();

    const formData = {
      nome: document.getElementsByName("nome")[0].value,
      idade: document.getElementsByName("idade")[0].value || null,
      sexo: document.getElementsByName("sexo")[0].value,
      diagnostico: document.getElementsByName("diagnostico")[0].value || null,
      observacao: document.getElementsByName("observacao")[0].value || null,
      tel: document.getElementsByName("tel")[0].value || null,
      ultimoAtendimento: document.getElementsByName("ultimoAtendimento")[0].value || null,
      proximoAtendimento: document.getElementsByName("proximoAtendimento")[0].value || null,
    };
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
  