/*import { fetchEspData } from "./localFunctions/localMenus.js";

const api = `${window.location.hostname}:57128`;
const apiUrls = ['sphynx-api.local:57128','localhost:57128', `${window.location.hostname}:57128`]

const urlParams = new URLSearchParams(window.location.search);
const language = urlParams.get("language");

// api = await testConnection(apiUrls)


// VERIFY THE USER LOGIN //
if(localStorage.getItem("token")){
    fetch(`http://${api}/login/verify`,{
        mode: 'cors',
        method: "POST",
        headers: {
            'Access-Control-Allow-Origin': `http://${api}`,
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "token": localStorage.getItem("token")
        })
    })

    .then(response => response.json())
    .then(data => {
        if(data["result"] == false){
            window.location = "/";
        }
    })
    .catch(err => {
        window.location = "/";
        console.log(err);
    })
} else{
    window.location = "/";
}
*/
const botaoMenuMobile = document.querySelector("#menu-mobile-botao");
botaoMenuMobile.addEventListener("click", () => {
    let nav = document.querySelector("nav");

    if(nav.classList.contains("mostrarMenu")){
        nav.classList.remove("mostrarMenu")
        nav.classList.add("esconderMenu")
    }
    else{
        nav.classList.remove("esconderMenu")
        nav.classList.add("mostrarMenu")
    }
})

//fetchEspData(true);

//export {language, api};