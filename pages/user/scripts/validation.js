const deslogar = document.querySelector("#logout")

export const validation = () => {

    if(!localStorage.getItem("@login")){

        location.replace("../login/index.html")

    }

}
validation()


export function logout(){

    deslogar.addEventListener("click" , ( ) => {

        localStorage.clear()
        location.replace("../../../index.html")

    })

}
logout()



