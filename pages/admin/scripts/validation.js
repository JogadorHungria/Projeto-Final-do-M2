const url = "http://localhost:6278/auth/validate_user";
const deslogar = document.querySelector("#logout");

export const validation = () => {
  if (!localStorage.getItem("@login")) {
    location.replace("../login/index.html");

    return;
  }

  validationAdmin(localStorage.getItem("@login"));
};

const validationAdmin = (token) => {
  const user = fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((response) => confirmAdmin(response))
    .catch((err) => err);

  return user;
};

function confirmAdmin(user) {
  if (user.is_admin) {
  } else {
    location.replace("../user/index.html");
  }
}

export function logout() {
  deslogar.addEventListener("click", () => {
    localStorage.clear();
    location.replace("../../../index.html");
  });
}
