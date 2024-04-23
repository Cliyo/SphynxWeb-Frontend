import RequestHTTP from "../RequestHTTP.js";
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

    const req = new RequestHTTP(IP, "consumer", "POST", header, jsonData);
    const reqData = await req.request();

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

    const req = new RequestHTTP(IP, `consumer/${data["ra"]}`, "PUT", header, jsonData);
    const reqData = await req.request();

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

    const req = new RequestHTTP(IP, `consumer/${data["ra"]}`, "DELETE", header, jsonData);

    try{
        const reqData = await req.request();

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
    event.preventDefault()

    const req = new RequestHTTP(IP, "consumer", "GET", header, null);
    const reqData = await req.request();

    consumersTableData.innerHTML = "";
    let array = Object.keys(reqData);

    array.forEach(index => {
        let tr = document.createElement("tr");

        let tdId = document.createElement("td");
        tdId.innerHTML = reqData[index]["id"];

        let tdRa = document.createElement("td");
        tdRa.innerHTML = reqData[index]["person"]["ra"];

        let tdNome = document.createElement("td");
        tdNome.innerHTML = reqData[index]["person"]["name"];

        let tdTag = document.createElement("td");
        tdTag.innerHTML = reqData[index]["tag"];
        
        tr.appendChild(tdId);
        tr.appendChild(tdRa);
        tr.appendChild(tdNome);
        tr.appendChild(tdTag);
        
        consumersTableData.appendChild(tr);
    })    
})