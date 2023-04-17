import {renderUsersCadastrados} from "./usuariosCadastrados.js"

export async function deletarUsuarioCadastrado(id){

    const tost = document.querySelector("#tost")
    const text = document.querySelector("#tost span")
    text.innerText = "Usuario exluído com sucesso!"
    tost.style.background = "var(--color-1)"
    tost.classList.toggle("displaNone")

    setTimeout(() => {

        tost.classList.toggle("displaNone")
        

    } ,3000)


    const enviar = await fetch(`http://localhost:6278/admin/delete_user/${id}` , {

        method: "DELETE",
        headers: {
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${localStorage.getItem('@login')}`
        },
    })

    enviar
 
    renderUsersCadastrados()

}