import { mostrarMensagem } from "../utils/messages.js";
import {request} from "../utils/requestHttp.js";

var form = document.querySelector("#form")

const api = `${window.location.hostname}:57128`;
const apiUrls = ['sphynx-api.local:57128','localhost:57128', `${window.location.hostname}:57128`]

const headers = {
    'Access-Control-Allow-Origin': `http://${api}`,
    'Access-Control-Allow-Credentials': 'true',
    'Content-Type': 'application/json'
}

request(api,`login/verify`,"POST",headers,JSON.stringify({"token": localStorage.getItem("token")}))
    .then(response =>{
        if (response["result"]){
            window.location = "pages/dashboard.html"
        }
    })
    .catch(err =>{
        console.log(err);
    })


form.addEventListener("submit", async (event) => {
    event.preventDefault();

    var formData = new FormData(form);
    var data = Object.fromEntries(formData);
    var jsonData = JSON.stringify(data);

    request (api, `login`, "POST", headers, jsonData, true)
        .then(response => {
            if(!response.ok){
                mostrarMensagem("Login error...");

                throw new Error("HTTP Status " + response.status);
            }
            
            return response.json()
        })
        .then(data => {
            mostrarMensagem("Logged!");
            localStorage.setItem("token", data["token"]);
            window.location = "pages/dashboard.html";
        })
        .catch(err => {
            mostrarMensagem("Error!");
        })
})