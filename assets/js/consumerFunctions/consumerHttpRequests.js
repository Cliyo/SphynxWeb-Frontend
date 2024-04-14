import { header, language } from "../dashboardScript.js";

// CONSUMER FORMS //
const formConsumerRegister = document.querySelector("#consumer-register-form");
const formConsumerUpdate = document.querySelector("#consumer-update-form");
const formConsumerDelete = document.querySelector("#consumer-delete-form");

// TABLE //
const consumersTableData = consumerGetDiv.querySelector(".content-table").querySelector("tbody");

// HTTP REQUESTS TO THE API //
formConsumerRegister.addEventListener("submit", (event) => {
    event.preventDefault();

    var formData =  new FormData(formConsumerRegister);
    var data = Object.fromEntries(formData);
    var jsonData = JSON.stringify(data);

    fetch("http://localhost:8080/consumer", {
        mode: "cors",
        method: "POST",
        headers: header,
        body: jsonData
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        if(data.message){
            let message = formConsumerRegister.parentNode.querySelector("#alert");
            message.innerHTML = data.message;
            message.style.color = "#FF0000";
        } else{
            let message = formConsumerRegister.parentNode.querySelector("#alert");
            message.innerHTML = "Consumer created!";
            message.style.color = "#00FF00";
            window.location = "dashboardPage.html";
        } 
    })
    .catch(err => {
        let message = formConsumerRegister.parentNode.querySelector("#alert");
        message.innerHTML = "Intern Error...";
        message.style.color = "#FF0000";
    })
})

formConsumerUpdate.addEventListener("submit", (event) => {
    event.preventDefault()

    var formData =  new FormData(formConsumerUpdate);
    var data = Object.fromEntries(formData);

    fetch(`http://localhost:8080/consumer/${data["ra"]}`, {
        mode: "cors",
        method: "PUT",
        headers: header,
        body: JSON.stringify({"tag": data["tag"]})
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        if(data.message){
            let message = formConsumerUpdate.parentNode.querySelector("#alert");
            message.innerHTML = data.message;
            message.style.color = "#FF0000";
        } else{
            let message = formConsumerUpdate.parentNode.querySelector("#alert");
            message.innerHTML = "Consumer edited!";
            message.style.color = "#00FF00";
            window.location = "dashboardPage.html";
        }
        
    })
    .catch(err => {
        let message = formConsumerUpdate.parentNode.querySelector("#alert");
        message.innerHTML = "Error...";
        message.style.color = "#FF0000";
    })
})

formConsumerDelete.addEventListener("submit", (event) => {
    event.preventDefault()

    var formData =  new FormData(formConsumerDelete);
    var data = Object.fromEntries(formData);

    fetch(`http://localhost:8080/consumer/${data["ra"]}`, {
        mode: "cors",
        method: "DELETE",
        headers: header,
        body: JSON.stringify({})
    })
    .then(response => {
        if(response.status != 204){
            let message = formConsumerDelete.parentNode.querySelector("#alert");
            message.innerHTML = "Error..."
            message.style.color = "#FF0000";

            throw new Error("HTTP Status " + response.status);
        }
        console.log(response);
        console.log(response.status)
        return response;
    })
    .then(data => {
        let message = formConsumerDelete.parentNode.querySelector("#alert");
        message.innerHTML = "Consumer deleted!";
        message.style.color = "#00FF00";
        window.location = "dashboardPage.html";
    })
    .catch(err => {
        let message = formConsumerDelete.parentNode.querySelector("#alert");
        message.innerHTML = "Error...";
        message.style.color = "#FF0000";
        console.log(err)
    })
})

subItemConsumerGet.addEventListener("click", (event) => {
    event.preventDefault()
    fetch(`http://localhost:8080/consumer`, {
        mode: "cors",
        method: "GET",
        headers: header
    })
    .then(response => {
        if(!response.ok){
            throw new Error("HTTP Status " + response.status);
        }
        return response.json();
    })
    .then(data => {
        consumersTableData.innerHTML = "";
        let array = Object.keys(data);

        array.forEach(index => {
            let tr = document.createElement("tr");

            let tdId = document.createElement("td");
            tdId.innerHTML = data[index]["id"];

            let tdRa = document.createElement("td");
            tdRa.innerHTML = data[index]["person"]["ra"];

            let tdNome = document.createElement("td");
            tdNome.innerHTML = data[index]["person"]["name"];

            let tdTag = document.createElement("td");
            tdTag.innerHTML = data[index]["tag"];
            
            tr.appendChild(tdId);
            tr.appendChild(tdRa);
            tr.appendChild(tdNome);
            tr.appendChild(tdTag);
            
            consumersTableData.appendChild(tr);
        })
        
    })
    .catch(err => {
        console.log(err)
    })
})