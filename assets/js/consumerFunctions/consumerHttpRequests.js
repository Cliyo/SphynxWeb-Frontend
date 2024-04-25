import request from "../utils/requestHttp.js";
import { header, language, IP } from "../dashboardScript.js";

// CONSUMER FORMS //
const formConsumerRegister = document.querySelector("#consumer-register-form");
const formConsumerUpdate = document.querySelector("#consumer-update-form");
const formConsumerDelete = document.querySelector("#consumer-delete-form");

// TABLE //
const consumersTableData = consumerGetDiv.querySelector(".content-table").querySelector("tbody");

// HTTP REQUESTS TO THE API //
formConsumerRegister.addEventListener("submit", async (event) => {
    event.preventDefault();

    var formData =  new FormData(formConsumerRegister);
    var data = Object.fromEntries(formData);
    var jsonData = JSON.stringify(data);

    const reqData = await request(IP, "consumer", "POST", header, jsonData);

    if(reqData.status == 400){
        let message = formConsumerRegister.parentNode.querySelector("#alert");
        message.innerHTML = reqData.message;
        message.style.color = "#FF0000";
    } else{
        let message = formConsumerRegister.parentNode.querySelector("#alert");
        message.innerHTML = reqData.message;
        message.style.color = "#00FF00";
        window.location = "/pages/dashboardPage.html";
    } 
})

formConsumerUpdate.addEventListener("submit", async (event) => {
    event.preventDefault()

    var formData =  new FormData(formConsumerUpdate);
    var data = Object.fromEntries(formData);
    var jsonData = JSON.stringify({"tag": data["tag"]});

    const reqData = await request(IP, `consumer/${data["ra"]}`, "PUT", header, jsonData);

    if(reqData.status == 400){
        let message = formConsumerUpdate.parentNode.querySelector("#alert");
        message.innerHTML = reqData.message;
        message.style.color = "#FF0000";
    } else{
        let message = formConsumerUpdate.parentNode.querySelector("#alert");
        message.innerHTML = reqData.message;
        message.style.color = "#00FF00";
        window.location = "/pages/dashboardPage.html";
    } 
})

formConsumerDelete.addEventListener("submit", async (event) => {
    event.preventDefault()

    var formData =  new FormData(formConsumerDelete);
    var data = Object.fromEntries(formData);
    var jsonData = JSON.stringify({});

    try{
        const reqData = await request(IP, `consumer/${data["ra"]}`, "DELETE", header, jsonData);

        let message = formConsumerDelete.parentNode.querySelector("#alert");
        message.innerHTML = "Success";
        message.style.color = "#00FF00";
        window.location = "/pages/dashboardPage.html";
    }
    catch(e){
        let message = formConsumerDelete.parentNode.querySelector("#alert");
        message.innerHTML = "Error";
        message.style.color = "#FF0000";
    }
})

subItemConsumerGet.addEventListener("click", async (event) => {
    event.preventDefault();

    const reqData = await request(IP, "consumer", "GET", header, null);

    consumersTableData.innerHTML = "";
    let array = Object.keys(reqData);

    array.forEach(index => {
        let tr = document.createElement("tr");

        let tdId = document.createElement("td");
        tdId.innerHTML = reqData[index]["id"];

        let tdRa = document.createElement("td");
        tdRa.innerHTML = reqData[index]["ra"];

        let tdTag = document.createElement("td");
        tdTag.innerHTML = reqData[index]["tag"];
        
        tr.appendChild(tdId);
        tr.appendChild(tdRa);
        tr.appendChild(tdTag);
        
        consumersTableData.appendChild(tr);
    })    
})