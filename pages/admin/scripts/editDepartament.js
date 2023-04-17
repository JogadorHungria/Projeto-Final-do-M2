import { token } from "./deparatments.js" 

const dialog = document.querySelector('dialog')

export async function editaDepartamento(element){


    dialog.innerHTML = ""

    dialog.className = "addDepartamentos"

    dialog.showModal()

    dialog.append( criaFormEdit(element) )


}


function criaFormEdit(element){

    const form = document.createElement("form")

    const buttonClose = document.createElement("button")  
          buttonClose.innerText = "X"
          buttonClose.className = "buttonClose"
          buttonClose.addEventListener('click' , (e) => {

            e.preventDefault()

            dialog.classList.remove("addDepartamentos")
            dialog.close()
            
         })

    const title = document.createElement('h3')
    title.innerText = "Editar Departamento"

    const textArea = document.createElement('textarea')
    textArea.placeholder = element.description
    
    textArea.rows ="10"

    const button = document.createElement('button')
    button.innerText = "Salvar alterações"
    button.addEventListener('click' , (e) => {

        e.preventDefault()

        enviaDadosAtualizados(element)

        const tost = document.querySelector("#tost")
        const text = document.querySelector("#tost span")
        text.innerText = "Edição efetuada!"
        tost.style.background = "var(--color-1)"
        tost.classList.toggle("displaNone")
    
        setTimeout( () => {
            tost.classList.toggle("displaNone")
            location.reload()
        },2000)
        
       
        
    })
 
    form.append(buttonClose , title , textArea , button)


    return form
}


function enviaDadosAtualizados(id){

   const newDescription =  getSelectValue()

   console.log(newDescription)

   const enviando = fetch(`http://localhost:6278/departments/${id.uuid} `, {

   method: "PATCH",
   headers: {

    'Content-Type' : 'application/json',
    Authorization: `Bearer ${token}`,

   },
    body:JSON.stringify(newDescription)
   })
   .then(response => response.json())
   .then(response => comfirmacao(response))
   .catch(err => err)

}

function getSelectValue(){

    const data = {}

    data.description = document.querySelector('dialog form textarea').value

    return data

}
