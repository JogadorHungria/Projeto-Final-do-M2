const url = "http://localhost:6278/auth/register"
const inputValues = document.querySelectorAll('input')
const selectValues = document.querySelector('select')

const buttonSubmit = document.querySelector("button")
const dialog = document.querySelector("dialog")


buttonSubmit.addEventListener( 'click' ,(e) => {

    e.preventDefault()

    user()

    creatNewUser()
})

function user(){

    const user = {}

    inputValues.forEach((e) => {
        user[e.name] = e.value
    })
    user[selectValues.name] = selectValues.value

    return user
}


const creatNewUser = () => {

   const newUser = fetch(url , {

        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(user())
   })
   .then(response => response.json())
   .then(response => renderResposta(response))
  
   

   return newUser
}


function renderResposta(resposta){
   
   const tost = document.querySelector("#tost")

    if(resposta.error){

        if(resposta.error == "email alread exists!"){

            document.querySelector("#tost span").innerText = "Email já existente!"

        }else{

            document.querySelector("#tost span").innerText = "Verifique os dados e tente novamente!"
        
        }
            tost.classList.toggle("displaNone")

        setTimeout(() => {

        tost.classList.toggle("displaNone")
        


        }, 4000);

    }

    if(resposta.uuid){


        document.querySelector("#tost span").innerText = "Cadastrado com sucesso"
        tost.style.background = "var(--color-3)"
        tost.classList.toggle("displaNone")

        setTimeout(() => {

        tost.classList.toggle("displaNone")
        
        location.replace("../login/index.html")


        }, 2000);

    }

} 


document.querySelector('.menu_amburguer').addEventListener('click' , () => {

    document.querySelectorAll('.header__div-2 a').forEach((e) => {
        
        e.classList.toggle("displayOn")

    })

})





