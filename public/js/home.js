document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");
});

const form = document.getElementById("pacienteForm");
const alertDiv = document.getElementById("alert");
const tableBody = document.getElementById("pacienteTableBody");
const pacienteModal = new bootstrap.Modal(document.getElementById("pacienteModal"));

let editMode = false;
let currentEditId = null;

const fetchData = async () => {
  try {
    const response = await fetch("/paciente/read");
    const responseData = await response.json();
    populateTable(responseData.data);
  } catch (error) {
    console.error("Erro ao coletar dados:", error);
  }
};

const populateTable = (data) => {
  tableBody.innerHTML = "";
  data.forEach((item) => {
    const formatDateTime = (dateString) => {
      if(!dateString) return "-";
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    const ultimoAtendimento = formatDateTime(item.ultimo_atendimento);
    const proximoAtendimento = formatDateTime(item.proximo_atendimento);

    const row = document.createElement("tr");
    row.setAttribute("data-id", item.paciente_id);
    row.innerHTML = `
            <td>${item.nome || "-"}</td>
            <td>${item.tel || "-"}</td>
            <td>${item.idade || "-"}</td>
            <td>${item.sexo || "-"}</td>
            <td>${item.diagnostico || "-"}</td>
            <td>${item.observacao || "-"}</td>
            <td>${ultimoAtendimento}</td>
            <td>${proximoAtendimento}</td>

            <td>
                <a onclick="editPaciente(${item.id})"><i id="pencil" class="bi bi-pencil-square"></i></a>
                <a onclick="deletePaciente(${item.id})"><i id="trash" class="bi bi-trash3"></i></a>
            </td>
        `;
    tableBody.appendChild(row);
  });
};

const resetForm = () => {
  editMode = false;
  currentEditId = null;
  form.reset();
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = {
    nome: document.getElementById("nome").value,
    idade: document.getElementById("idade").value,
    sexo: document.getElementById("sexo").value,
    diagnostico: document.getElementById("diagnostico").value,
    observacao: document.getElementById("observacao").value,
  };

  try {
    const method = editMode ? "PUT" : "POST";
    const url = editMode ? `/paciente/update/${currentEditId}` : "/paciente/create";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error("Erro no envio");

    const result = await response.json();
    console.log(result.message);

    alertDiv.classList.remove("hidden");
    setTimeout(() => alertDiv.classList.add("hidden"), 1500);

    fetchData();
    resetForm();
    pacienteModal.hide();
  } catch (error) {
    console.error("Erro ao enviar ou atualizar paciente:", error);
  }
};

const editPaciente = (id) => {
  const row = document.querySelector(`tr[data-id="${id}"]`);
  document.getElementById("nome").value = row.children[0].textContent;
  document.getElementById("idade").value = row.children[1].textContent;
  document.getElementById("sexo").value = row.children[2].textContent;
  document.getElementById("diagnostico").value = row.children[3].textContent;
  document.getElementById("observacao").value = row.children[4].textContent;

  editMode = true;
  currentEditId = id;

  pacienteModal.show();
};

const deletePaciente = async (id) => {
  try {
    await fetch(`/paciente/delete/${id}`, { method: "DELETE" });
    fetchData();
  } catch (error) {
    console.error("Erro ao deletar paciente:", error);
  }
};

document.getElementById("pacienteModal").addEventListener("hidden.bs.modal", () => {
  resetForm();
});

form.addEventListener("submit", handleSubmit);
fetchData();
