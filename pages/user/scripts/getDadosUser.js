const getUserBtn = document.querySelector("#userEdit")
const modal = document.querySelector("dialog")
const sectionColegas = document.querySelector('#departaments_funcionarios ul')

const url = "http://localhost:6278/users/profile"

function getUser(){

   const dadosUser = fetch( url , {

    method: "GET",
    headers: {
        'Content-Type' : 'application/json',
         authorization: `Bearer ${localStorage.getItem("@login")}`
    },
    
    })

    .then(result => result.json())
    .then(result => renderDadosUser(result))

}

getUser()


function renderDadosUser(userDados){

    document.querySelector("#userName").innerText = userDados.username

    document.querySelector("#email").innerText = userDados.email

    document.querySelector("#profissional").innerText = userDados.professional_level
 
    if(userDados.kind_of_work){
    
         document.querySelector("#modalidade").innerText = userDados.kind_of_work

    }

    renderDadosEmpresa(userDados)

}

function editarPerfil (){

    document.querySelector("#userEdit").addEventListener( 'click', () => {
        
        modal.innerText = ""

        modal.showModal()

        modal.append(renderEditModal())

    })

}
editarPerfil ()


function renderEditModal(){


const form = document.createElement("form")

const buttonFechar = document.createElement("button")
buttonFechar.id = "buttonFechar"
buttonFechar.innerText = "X"

const title = document.createElement("h2")
title.innerText ="Editar Perfil" 

const newName = document.createElement("input")
newName.placeholder = "Seu nome"
newName.name = "username"

const newSenha = document.createElement("input")
newSenha.type = "password"
newSenha.placeholder = "Sua senha"
newSenha.name = "password"

const newEmail = document.createElement("input")
newEmail.placeholder = "Seu e-mail"
newEmail.name = "email"

const buttonEditar = document.createElement("button")
buttonEditar.innerText = "Editar perfil"

    buttonEditar.addEventListener( "click" , () => {

        enviarAlteracaoUser()

        modal.close()


    })

form.append(buttonFechar,title,newName , newEmail , newSenha , buttonEditar)

return form

}


function enviarAlteracaoUser(){

    const data = formationObject()

    fetch( "http://localhost:6278/users" , {
        method: "PATCH",
        headers:{
            'Content-Type': 'Application/json',
            Authorization : `Bearer ${localStorage.getItem("@login")}`
        },
        body: JSON.stringify(data)
    })

}


function formationObject(){

    const data = {}

    document.querySelectorAll("input").forEach( (e) => {

        data[e.name] = e.value

    })

    console.log(data)
    return data
}


function renderDadosEmpresa(userDados){

    const departaments = fetch("http://localhost:6278/users/departments/coworkers" , {
         
    method: "GET",
    headers:{
        'Content-Type' : 'application/json',
        authorization: `Bearer ${localStorage.getItem("@login")}` 
    }
    })
    .then(reposta => reposta.json())
    .then(reposta => renderColegas(reposta))

    
}


function renderColegas(dados){
    

    if(dados.length == 0){

        
        return
    }

   

    sectionColegas.innerHTML = ""

    renderNameCompany(dados)

    dados[0].users.forEach((e) => {

      

      sectionColegas.append(criaCards(e))
        
    })

}


async function renderNameCompany(id){

    console.log(id[0])


    const empresa = await fetch (`http://localhost:6278/companies/`,{

    })

   
    const result = await empresa.json()
    

    let resultado = result.filter((e) =>   {return e.uuid == id[0].company_uuid})

    const title = document.createElement('h2')
    title.innerText = `${resultado[0].name} - ${id[0].name}`
  
    console.log(title)
    document.querySelector("#departaments_funcionarios div").style.background = 'var(--color-1)'
    document.querySelector("#departaments_funcionarios div").style.color = 'var(--color-grey-5)' , 
    document.querySelector("#empresa_departamento").innerText = ""
    document.querySelector("#empresa_departamento").append(title)

    return 
}



function criaCards(e){


    const li = document.createElement('li')

    const name = document.createElement('h3') 
    name.innerText = e.username

    const nivel = document.createElement('span')
    nivel.innerText = e.professional_level


    li.append(name , nivel)


    return li
    
}