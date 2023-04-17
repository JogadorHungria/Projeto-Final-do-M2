import {} from "./deparatments.js";
import {deletarUsuarioCadastrado} from "./deletUserCadastrado.js"


const listUsers = document.querySelector("#Usuarios_cadastrados ul")
const dialog = document.querySelector('dialog')


export async function renderUsersCadastrados(){

    

    listUsers.innerHTML = ""
    
    const users = await getUsers()
          users.shift()

    users.forEach(element => {
        
        listUsers.append( criaCardUsers(element))

    });

    verificaEmpresa(users)

    
}


async function getUsers(){

    const  users = await fetch('http://localhost:6278/users' , {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("@login")}`,
        }
    })
    .then(resposta => resposta.json())
    .catch(err => err)
    
    return users
    
}


 function criaCardUsers(user){


    const li = document.createElement('li')
    li.id = user.uuid

    const userName = document.createElement('h3')
    userName.innerText = user.username


    const cargo = document.createElement('span')
    cargo.innerText = user.professional_level


    const companyName = document.createElement('span')
    
    companyName.innerText = getDepartamentsName(user)

    const div = document.createElement('div')


    const lapisicon = document.createElement('img')
    lapisicon.style.cursor = "pointer"
    lapisicon.src = '../../src/imagens/lapisicon.png'
    
        lapisicon.addEventListener("click" , () => {
            
            inicioEditUser(user)

        })

    const lixoicon = document.createElement('img')
    lixoicon.style.cursor = "pointer"
    lixoicon.src = '../../src/imagens/lixoicon.png'

        lixoicon.addEventListener("click" , () => {
    
            deletarUsuarioCadastrado(user.uuid)

        })

    div.append(lapisicon , lixoicon)
    li.append(userName , cargo , companyName , div)

    return li
}


// FUNÇAO DE EDITAR USUARIO


function inicioEditUser(user){

    dialog.className = "editarUsuarios"

    dialog.showModal()

 
    dialog.innerHTML  = ""
    dialog.append( criaCardsEdit(user) )

}



function criaCardsEdit(user) {


    const section = document.createElement("section")
          section.id = user.uuid

    const buttonClose = document.createElement("button")  
          buttonClose.innerText = "X"
          buttonClose.id = "buttonCloseUser"
          buttonClose.addEventListener('click' , (e) => {

            e.preventDefault()

            dialog.classList.remove("editarUsuarios")

            dialog.innerHTML  = ""
            dialog.close()
            
        })

    const h3 = document.createElement("h3")
    h3.innerText = "Editar Usuário"
    const selectModalit = document.createElement("select")
          
          const optionInitialNivel = document.createElement("option")
                optionInitialNivel.innerText = "Selecionar Modalidade"
                optionInitialNivel.value = ""


          const optionModalit = document.createElement("option")
                optionModalit.innerText = "home office"
                optionModalit.value = "home office"

          const optionModalit2 = document.createElement("option")
                optionModalit2.innerText = "presencial"
                optionModalit2.value = "presencial"

          const optionModalit3 = document.createElement("option")
                optionModalit3.innerText = "hibrido"
                optionModalit3.value = "hibrido"     

          

    const selectNivelProfissional = document.createElement("select")
         
          const optionInitial = document.createElement("option")
                optionInitial.innerText = "Selecionar nível profissional"
                optionInitial.value = ""

          const optionNivelProfissional = document.createElement("option")
                optionNivelProfissional.innerText = "estágio"
                optionNivelProfissional.value = "estágio"

          const optionNivelProfissional2 = document.createElement("option")
                optionNivelProfissional2.innerText = "júnior"
                optionNivelProfissional2.value = "júnior"

          const optionNivelProfissional3 = document.createElement("option")
                optionNivelProfissional3.innerText = "pleno"
                optionNivelProfissional3.value = "pleno"

          const optionNivelProfissional4 = document.createElement("option")
                optionNivelProfissional4.innerText = "sênior"
                optionNivelProfissional4.value = "sênior"

    const button = document.createElement("button")
    button.innerText = 'Editar'
    
        button.addEventListener('click' , (e) => {
            
            editUser(user.uuid)

            dialog.innerHTML  = ""
            dialog.classList.remove("editarUsuarios")
            dialog.close()

        })
   

    selectNivelProfissional.append( optionInitial,optionNivelProfissional , optionNivelProfissional2 , optionNivelProfissional3 , optionNivelProfissional4)
    selectModalit.append( optionInitialNivel,optionModalit ,optionModalit2 , optionModalit3)
    section.append(buttonClose , h3 , selectModalit , selectNivelProfissional , button)

    return section
} 


async function editUser(id){

    const data = criaObjectData()
    

    if(data.kind_of_work == "" || data.professional_level == "" ){

        document.querySelector("#tost span").innerText = "Preencha os dados e tente novamente!"
        tost.style.background = "var(--color-2)"
        tost.classList.toggle("displaNone")

        setTimeout(() => {

        tost.classList.toggle("displaNone")


        }, 2000);

        return

    }else{


        document.querySelector("#tost span").innerText = "Alteração bem sucedida!"
        tost.style.background = "var(--color-3)"
        tost.classList.toggle("displaNone")

        setTimeout(() => {

        tost.classList.toggle("displaNone")


        }, 2000);



   

    const enviar = await fetch(`http://localhost:6278/admin/update_user/${id}` , {

        method: "PATCH",
        headers: {
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${localStorage.getItem('@login')}`
        },

        body:JSON.stringify(data)
        
    })
    .then(response => response.json())
    .then(response => response)

    renderUsersCadastrados()

}
}

function criaObjectData(){

    const object = {}

    object.kind_of_work = document.querySelector("dialog section select").value
    object.professional_level = document.querySelectorAll("dialog section select")[1].value

    return object
}




 function getDepartamentsName(user , ){

    if(user.department_uuid == null){

        return "Ainda não pertence a uma empresa"

    }else{
        return "Esta em uma empresa"
    }
}



async function verificaEmpresa(users){

    const departamen = await fetch(`http://localhost:6278/departments`, {
           
           method: 'GET',
           headers:{
           'Content-Type' : 'application/json',
           Authorization: `Bearer ${localStorage.getItem('@login')}`
           }
       })
       .then( retur => retur.json() )
       .then( retur => teste(users) )

}

async function teste(users){


    document.querySelectorAll("#Usuarios_cadastrados ul li").forEach( (e , i) => {

        if(e.childNodes[2].innerText == 'Esta em uma empresa'){

        // console.log(e.childNodes[2].innerText)
         verificaEmpresaParte2(users[i] , e , i)
        
        
        }
        
        // console.log(e.childNodes[2].innerText =  verificaEmpresaParte2(users[i].department_uuid))
    })

}


async function verificaEmpresaParte2(user , event , indiceAnterior){

    const departamen = await fetch(`http://localhost:6278/departments`, {
           
           method: 'GET',
           headers:{
           'Content-Type' : 'application/json',
           Authorization: `Bearer ${localStorage.getItem('@login')}`
           }

        }
        
       
       )
       .then( responsta => responsta.json())
       .then( responsta => responsta)

       departamen.forEach((e , i) => {


        if(user.department_uuid == e.uuid){

            event.childNodes[2].innerText = e.companies.name

        return
        }

       })

}