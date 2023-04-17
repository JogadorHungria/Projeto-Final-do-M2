import { token } from "./deparatments.js"




//DEMITE FUNCIONARIO

export async function desligarFuncionario(id){

    const users = await fetch( `http://localhost:6278/departments/dismiss/${id}` , {
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    })
    .then(respons => respons.json())
    

    usersContratacts()
}


// CONTRATA USER E CHAMA FUNÇÃO DE CRIAR CARD

export function contratarUser(id){

    const idSector = document.querySelector('dialog section')

    document.querySelector('dialog section ul').innerHTML = ""
    

    
    const userContracted = {

        user_uuid : id,
        department_uuid: idSector.id
    }

    const contracter = fetch( 'http://localhost:6278/departments/hire/' , {

        method: 'PATCH',
        headers: {

            'Content-Type' : 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userContracted)
    })

    .then(response => response.json())
    .then(response => usersContratacts())   
}


//PEGA OS USUARIOS FILTRA  PELO DEPARTAMENTO SELECIONADO E RENDERIZA

export const  usersContratacts = async () => {

    const listLocal = document.querySelector("#funcionariosAdmitidos")
    listLocal.innerHTML = ""

    const users = await fetch( `http://localhost:6278/users` , {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }

    })
    .then(result => result.json())

    

     users.map((e) => {

        if(e.department_uuid == document.querySelector('dialog section').id ){
           
            
            const li = document.createElement("li")

            const userName = document.createElement("h3")
            userName.innerText = e.username

            const nivel = document.createElement("span")
            nivel.innerText = e.professional_level

            const companyName = document.createElement("span")
            companyName.innerText = "em contrução"

            const buttonDesligar = document.createElement("button")
            buttonDesligar.innerText = "Desligar"
            buttonDesligar.classList = "buttonDesligar"

            buttonDesligar.addEventListener('click' , () => {

                desligarFuncionario(e.uuid)


            })


            
            li.append(userName , nivel , companyName , buttonDesligar)

            listLocal.append(li)

            
        }

    })


    getUsers()

}


export async function getUsers(){

    document.querySelector("#totalUsers").innerHTML = ""

   const users = await fetch( `http://localhost:6278/admin/out_of_work` , {
            method: 'GET',
            headers:{

                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,

            }
        })

    const resultado  =  await users.json()

    resultado.forEach( (e) => {

       const option = document.createElement("option")

       option.innerText = e.username
       option.value = e.uuid
       
       
       document.querySelector("#totalUsers").append(option)

    })

    return resultado
}