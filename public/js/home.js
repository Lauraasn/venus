document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");
});

const form = document.getElementById("pacienteForm");
const toggleFormButton = document.getElementById("toggleFormButton");
const alertDiv = document.getElementById("alert");
const tableBody = document.getElementById("pacienteTableBody");

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
    const row = document.createElement("tr");
    row.setAttribute("data-id", item.id);
    row.innerHTML = `
            <td>${item.nome}</td>
            <td>${item.idade}</td>
            <td>${item.sexo}</td>
            <td>${item.diagnostico}</td>
            <td>${item.observacao}</td>
            <td>
                <button onclick="editPaciente(${item.id})">Editar</button>
                <button onclick="deletePaciente(${item.id})">Deletar</button>
            </td>
        `;
    tableBody.appendChild(row);
  });
};

const toggleForm = () => {
  form.classList.toggle("hidden");
  if (editMode) {
    editMode = false;
    currentEditId = null;
    form.reset();
  }
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
    const url = editMode ? `/create/${currentEditId}` : "/paciente/create";

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

    form.reset();
    fetchData();
    toggleForm();
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

  toggleForm();
  editMode = true;
  currentEditId = id;
};

const deletePaciente = async (id) => {
  try {
    await fetch(`/paciente/${id}`, { method: "DELETE" });
    fetchData();
  } catch (error) {
    console.error("Erro ao deletar paciente:", error);
  }
};

toggleFormButton.addEventListener("click", toggleForm);
form.addEventListener("submit", handleSubmit);

fetchData();
