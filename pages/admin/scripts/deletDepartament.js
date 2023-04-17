const dialog = document.querySelector("dialog");
import { token } from "./deparatments.js";

export function deletDepartament(element) {
  dialog.showModal();
  dialog.innerHTML = "";

  dialog.className = "exluirDepartamentos";

  dialog.append(criaModalDeletDepartament(element));
}

// Renderiza os dados no Modal

function criaModalDeletDepartament(element) {
  const section = document.createElement("form");

  const buttonClose = document.createElement("button");
  buttonClose.innerText = "X";
  buttonClose.className = "buttonClose";
  buttonClose.addEventListener("click", (e) => {
    e.preventDefault();

    dialog.classList.remove("exluirDepartamentos");

    dialog.close();
  });

  let alertText = document.createElement("h3");
  alertText.innerText = `Realmente deseja deletar o Departamento ${element.name} e demitir seus funcionários?`;

  let button = document.createElement("button");
  button.innerText = "Confirmar";

  button.addEventListener("click", (e) => {
    e.preventDefault();

    deletDepartamentOk(element.uuid);

    dialog.classList.remove("exluirDepartamentos");
    dialog.close();
  });

  section.append(buttonClose, alertText, button);

  return section;
}

function deletDepartamentOk(id) {
  const exluir = fetch(`http://localhost:6278/departments/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response)
    .then((response) => deletDepartamentDom(id));
}

function deletDepartamentDom(id) {
  document.getElementById(`${id}`).remove();
}
