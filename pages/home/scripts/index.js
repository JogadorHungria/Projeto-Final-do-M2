const url = "http://localhost:6278/companies";
const listaEmpresas = document.querySelector("ul");
const setores = document.querySelector("#setores");

function empresasApi() {
  const empresas = fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => renderEmpresas(response))
    .catch((err) => err);

  return empresas;
}
empresasApi();

async function empresasApi2() {
  const empresas = fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((e) => e.json());
  let resultado = await empresas;

  await resultado.map((e) => {
    if (e.sectors.description == setores.value) {
      let card = criaEmpresas(e);

      listaEmpresas.append(card);
    }
  });
}

function getSectors() {
  fetch(`http://localhost:6278/sectors`)
    .then((e) => e.json())
    .then((e) => renderSectors(e));
}
getSectors();

function renderSectors(sectorsApi) {
  sectorsApi.forEach((e) => {
    // console.log(e.description)

    const option = document.createElement("option");
    option.innerText = e.description;

    setores.append(option);
  });
}

setores.addEventListener("change", (e) => {
  if (setores.value == "") {
    empresasApi();
  } else {
    listaEmpresas.innerText = "";
    empresasApi2();
  }
});

function renderEmpresas(empresas) {
  if (setores.value == "") {
    empresas.forEach((element, i) => {
      listaEmpresas.append(criaEmpresas(element));
    });
  }
}

function criaEmpresas(empresas) {
  let li = document.createElement("li");

  let empresaNome = document.createElement("h3");
  empresaNome.innerText = empresas.name;

  let horas = document.createElement("span");
  horas.innerText = empresas.opening_hours;

  let setor = document.createElement("a");
  setor.innerText = empresas.sectors.description;

  li.append(empresaNome, horas, setor);

  return li;
}

document.querySelector(".menu_amburguer").addEventListener("click", () => {
  document.querySelectorAll(".header__div-2 a").forEach((e) => {
    e.classList.toggle("displayOn");
  });
});
