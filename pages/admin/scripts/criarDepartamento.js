import { url, token, getDepartaments } from "./deparatments.js";

const buttonAddDepartament = document.querySelector("#creat__departament");
const dialog = document.querySelector("dialog");

buttonAddDepartament.addEventListener("click", async () => {
  dialog.showModal();
  dialog.innerHTML = "";

  dialog.className = "addDepartamentos";

  dialog.append(criaNewDepartament());

  getEmpresas();
});

export function criaNewDepartament() {
  const formulario = document.createElement("form");

  const title = document.createElement("h3");
  title.innerText = "Criar Departamento";

  const buttonClose = document.createElement("button");
  buttonClose.innerText = "X";
  buttonClose.className = "buttonClose";
  buttonClose.addEventListener("click", (e) => {
    buscaEmpresa();

    dialog.classList.remove("addDepartamentos");
    dialog.close();
  });

  const nameDepartament = document.createElement("input");
  nameDepartament.placeholder = "Nome do departamento";
  nameDepartament.name = "name";

  const descriptionDepartament = document.createElement("input");
  descriptionDepartament.placeholder = "Descrição";
  descriptionDepartament.name = "description";

  const selectEmpresa = document.createElement("select");
  selectEmpresa.id = "selectEmpresas";

  const option = document.createElement("option");
  option.innerText = "Selecionar empresa";
  option.value = "";

  const button = document.createElement("button");
  button.innerText = "Criar o departamento";
  button.addEventListener("click", (e) => {
    e.preventDefault();

    enviaDepartamentCriado();
  });

  selectEmpresa.append(option);
  formulario.append(
    buttonClose,
    title,
    nameDepartament,
    descriptionDepartament,
    selectEmpresa,
    button
  );

  return formulario;
}

const getEmpresas = async () => {
  const empresas = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => result.json())
    .then((result) => enviaEmpresas(result))
    .catch((err) => err);

  return empresas;
};

function enviaEmpresas(result) {
  result.forEach((element) => {
    const option = document.createElement("option");
    option.innerText = element.name;
    option.value = element.uuid;

    document.querySelector("#selectEmpresas").append(option);
  });
}

function enviaDepartamentCriado() {
  const form = document.querySelectorAll("dialog input");

  const data = {};

  form.forEach((e) => {
    data[e.name] = e.value;
  });

  if (document.querySelector("#selectEmpresas").value == "") {
    const tost = document.querySelector("#tost");
    const text = document.querySelector("#tost span");
    text.innerText = "Selecione um departamento!";
    tost.classList.toggle("displaNone");

    setTimeout(() => {
      tost.classList.toggle("displaNone");
    }, 3000);

    return;
  }

  if (!data.name) {
    const tost = document.querySelector("#tost");
    const text = document.querySelector("#tost span");
    text.innerText = "Preencha os dados e tente novamente!";
    tost.style.background = "var(--color-2)";
    tost.classList.toggle("displaNone");

    setTimeout(() => {
      tost.classList.toggle("displaNone");
    }, 3000);

    return;
  } else if (!data.description) {
    const tost = document.querySelector("#tost");
    const text = document.querySelector("#tost span");
    text.innerText = "Erro dados incompletos!";
    tost.style.background = "var(--color-2)";
    tost.classList.toggle("displaNone");

    setTimeout(() => {
      tost.classList.toggle("displaNone");
    }, 3000);

    return;
  } else {
    const tost = document.querySelector("#tost");
    const text = document.querySelector("#tost span");
    text.innerText = "Departamento cadastrado com sucesso!";
    tost.style.background = "var(--color-3)";
    tost.classList.toggle("displaNone");

    setTimeout(() => {
      tost.classList.toggle("displaNone");
    }, 3000);

    data.company_uuid = document.querySelector("#selectEmpresas").value;
    enviaDepartamentAPI(data);

    return;
  }
}

function enviaDepartamentAPI(data) {
  const criaNewDepartament = fetch(`http://localhost:6278/departments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then((respons) => respons);
}
