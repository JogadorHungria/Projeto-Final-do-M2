import { contratarUser , usersContratacts , getUsers} from "./contrataDescontrata.js"
import {} from "./criarDepartamento.js"
import {editaDepartamento} from "./editDepartament.js"
import {deletDepartament} from "./deletDepartament.js"
import {renderUsersCadastrados} from "./usuariosCadastrados.js"


export const url = "http://localhost:6278/companies"
export const token = localStorage.getItem("@login")
const listEmpresas = document.querySelector("#select__departamentos")
const listDepartaments = document.querySelector("#departamentos ul")


export const getDepartaments = async ( ) => {

   const empresas =  await fetch(url , {
    method: "GET",
    headers:{
        "Content-Type":'application/json'
    } 
   })
   .then(result => result.json())
   .then(result => renderEmpresas(result))
   .catch(err => err)

   renderUsersCadastrados()

   buscaEmpresa()


   return empresas
}


export function renderEmpresas(empresas){

    empresas.forEach((element) => {
    
        listEmpresas.append(criaEmpresa(element))

    });

}

export function criaEmpresa(element){

    
    let option = document.createElement("option")
    option.innerText = element.name
    option.value = element.uuid

    return option

}


export function pegaIdEmpresa(){

    listEmpresas.addEventListener('change' , (e) =>{

        buscaEmpresa(e.target.value)
        
    })

}

export async function buscaEmpresa(id) {

    let urlDepartaments = `http://localhost:6278/departments/${id}` 

     if(!id){

        urlDepartaments = "http://localhost:6278/departments"

     }

    const empresa = await fetch( urlDepartaments , {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    })
    .then(respons => respons.json())
    .catch(err => err)

    renderDepartaments(empresa , id)

    if(!empresa[0]){
        
        semDepartamentos()

    }

    return empresa

}




function semDepartamentos(){
    
    listDepartaments.innerText = "SEM DEPARTAMENTOS"
}



export function renderDepartaments(departament){

    listDepartaments.innerHTML = ""

    departament.forEach((e) =>{

      listDepartaments.append(creantCardDepartament(e))

    })
   
}

export function creantCardDepartament(departament){

    const li = document.createElement('li')
    li.id = departament.uuid

    const departamentName = document.createElement('h3')
    departamentName.innerText = departament.name

    const description = document.createElement('span')
    description.innerText = departament.description

    const companyName = document.createElement('span')
    companyName.innerText = departament.companies.name

    const div = document.createElement('div')

    const olhoicon = document.createElement('img')
    olhoicon.style.cursor = "pointer"
    olhoicon.src = '../../src/imagens/olhoicon.png'

        olhoicon.addEventListener( 'click', () => {

            visualizarDepartamento(departament)
            
        }) 

    const lapisicon = document.createElement('img')
    lapisicon.style.cursor = "pointer"
    lapisicon.src = '../../src/imagens/lapisicon.png'
      
        lapisicon.addEventListener("click" , () => {
            editaDepartamento(departament)
        })



    const lixoicon = document.createElement('img')
    lixoicon.style.cursor = "pointer"
    lixoicon.src = '../../src/imagens/lixoicon.png'
    
        lixoicon.addEventListener("click" , () => {

            deletDepartament(departament)
            
            renderUsersCadastrados()
 
        })

    


    div.append(olhoicon , lapisicon , lixoicon)
    li.append(departamentName , description , companyName , div)

    return li

}


export function visualizarDepartamento (departament) {

    
   document.querySelector('dialog').showModal()

   const modal =  document.querySelector('dialog')

   modal.innerHTML = ""

   modal.append(departamentDescription(departament))

   usersContratacts()

}


export function departamentDescription(departament){
 
    const section = document.createElement('section')
    section.id = departament.uuid

    const h3 = document.createElement('h3')
    h3.innerText = departament.name

    const fechar = document.createElement('button')
          fechar.innerText = "X"
          fechar.className = "buttonModalOff"
          fechar.addEventListener('click' , () => {

            document.querySelector('dialog').close()

            renderUsersCadastrados()

        })

    const section2 = document.createElement('div')

        const div  = document.createElement('div')

            const h4  = document.createElement('h4')
            h4.innerText = departament.description

            const span   = document.createElement('span')
            span.innerText = departament.companies.name
            div.append(h4 , span)

        const div2  = document.createElement('div')
              div2.className ="section__contratar"
            const select   = document.createElement('select')
                  select.id = "totalUsers"

                const option = document.createElement('option')
                    option.innerText = 'Selecionar usuário'
                    option.value = ""
                    select.append(option)

            const button   = document.createElement('button')
                button.innerText = "Contratar"
                button.addEventListener('click' , () => {

                    contratarUser(select.value)
  
                    document.querySelector("#funcionariosAdmitidos").innerHTML = ""
                    
                })

            div2.append(select , button)
            section2.append(div , div2)

            const ul = document.createElement('ul')
            ul.id = "funcionariosAdmitidos"


    section.append(h3 , fechar, section2 , ul) 

    return section

}