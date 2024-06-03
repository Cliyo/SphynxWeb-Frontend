import { header, api } from "../dashboardScript.js";
import {request} from "../utils/requestHttp.js";

// LOCAL FORMS //
const formPermissionRegister = document.querySelector("#permission-register-form");
const formPermissionDelete = document.querySelector("#permission-delete-form");

// HTTP REQUESTS TO THE API //

formPermissionRegister.addEventListener("submit", async (event) => {
    event.preventDefault()

    var formData =  new FormData(formPermissionRegister);
    var data = Object.fromEntries(formData);
    var jsonData = JSON.stringify(data);

    const reqData = await request(api, `permissions`, "POST", header, jsonData);

    if(reqData.message == 400){
        let message = formPermissionRegister.parentNode.querySelector("#alert");
        message.innerHTML = reqData.message;
        message.style.color = "#FF0000";
    } else{
        let message = formPermissionRegister.parentNode.querySelector("#alert");
        message.innerHTML = reqData.message;
        message.style.color = "#00FF00";
        window.location = "dashboardPage.html";
    }
})

formPermissionDelete.addEventListener("submit", async (event) => {
    event.preventDefault()

    var formData =  new FormData(formPermissionDelete);
    var data = Object.fromEntries(formData);
    var jsonData = JSON.stringify({});

    try{
        const reqData = await request(api, `permissions/${data["level"]}`, "DELETE", header, jsonData);
        let message = formPermissionDelete.parentNode.querySelector("#alert");
        message.innerHTML = "Permission deleted!";
        message.style.color = "#00FF00";
        window.location = "dashboardPage.html";
    } catch(e){
        let message = formPermissionDelete.parentNode.querySelector("#alert");
        message.innerHTML = "Error...";
        message.style.color = "#FF0000";
        console.log(err)
    }
})