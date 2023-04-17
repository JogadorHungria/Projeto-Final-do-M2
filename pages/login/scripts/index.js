const url = "http://localhost:6278/auth/login";

const inputsLogin = document.querySelectorAll("input");
const btnLogin = document.getElementById("button_login");

const iniciarLogin = () => {
  btnLogin.addEventListener("click", (e) => {
    let cont = 0;

    e.preventDefault();

    inputsLogin.forEach((e) => {
      if (e.value.length == 0) {
        e.style.border = "solid 1px red";
        cont++;
      }
    });

    if (cont == 0) {
      Login();
    } else {
      document.querySelector("#tost span").innerText =
        "Preencha os campos solicitados!";
      tost.style.background = "var(--color-2)";
      tost.classList.toggle("displaNone");

      setTimeout(() => {
        tost.classList.toggle("displaNone");
      }, 3000);
    }
  });
};
iniciarLogin();

function retiraErroLogin() {
  inputsLogin.forEach((e) => {
    e.addEventListener("click", () => {
      e.style.border = "solid 1px black";
    });
  });
}
retiraErroLogin();

function getUser() {
  const result = {};

  inputsLogin.forEach((e) => {
    result[e.name] = e.value;
  });

  return result;
}

async function Login() {
  const user = fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(getUser()),
  })
    .then((response) => response.json())
    .then((response) => validaLogin(response))
    .catch((err) => err);

  return await user;
}

async function validaLogin(response) {
  if (response.token) {
    localStorage.setItem("@login", response.token);

    setTimeout(() => {
      location.replace("../admin/index.html");
    }, 500);
  } else {
    inputsLogin.forEach((e) => {
      e.style.border = "solid 1px var(--color-2)";
    });

    document.querySelector("#tost span").innerText =
      "Email ou senha incorreta!";
    tost.style.background = "var(--color-2)";
    tost.classList.toggle("displaNone");

    setTimeout(() => {
      tost.classList.toggle("displaNone");
    }, 2000);
  }
}

document.querySelector(".menu_amburguer").addEventListener("click", () => {
  document.querySelectorAll(".header__div-2 a").forEach((e) => {
    e.classList.toggle("displayOn");
  });
});
