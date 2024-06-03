import {request} from "../utils/requestHttp.js";

var form = document.querySelector("#form")
var message = document.querySelector("#alert-login")

const api = 'sphynx-api.local:57128';
const apiUrls = ['sphynx-api.local:57128','localhost:57128', `${window.location.hostname}:57128`]
// api = await testConnection(apiUrls)


const headers = {
    'Access-Control-Allow-Origin': `http://${api}`,
    'Access-Control-Allow-Credentials': 'true',
    'Content-Type': 'application/json'
}

request(api,`login/verify`,"POST",headers,JSON.stringify({"token": localStorage.getItem("token")}))
.then(response =>{
    if (response["result"]){
        window.location = "pages/dashboardPage.html"
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
            message.innerHTML = "Login error...";
            message.style.color = "#FF0000";

            throw new Error("HTTP Status " + response.status);
        }
        
        return response.json()
    })
    .then(data => {
        message.innerHTML = "Logged!";
        message.style.color = "#00FF00";
        localStorage.setItem("token", data["token"]);
        window.location = "pages/dashboardPage.html";
    })
})