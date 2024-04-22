import { header, IP } from "../dashboardScript.js";
import { localGetDiv, subItemLocalGet } from "./localMenus.js";

// LOCAL FORMS //
const formLocalUpdate = document.querySelector("#local-update-form");
const formLocalDelete = document.querySelector("#local-delete-form");

// TABLE //
const localsTableData = localGetDiv.querySelector(".content-table").querySelector("tbody"); 

// HTTP REQUESTS TO THE API //

formLocalUpdate.addEventListener("submit", (event) => {
    event.preventDefault()

    var formData =  new FormData(formLocalUpdate);
    var data = Object.fromEntries(formData);

    fetch(`http://${IP}:8080/local/${data["name"]}`, {
        mode: "cors",
        method: "PUT",
        headers: header,
        body: JSON.stringify({"mac": data["mac"]})
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        if(data.message == 400){
            let message = formLocalUpdate.parentNode.querySelector("#alert");
            message.innerHTML = data.message;
            message.style.color = "#FF0000";
        } else{
            let message = formLocalUpdate.parentNode.querySelector("#alert");
            message.innerHTML = data.message;
            message.style.color = "#00FF00";
            window.location = "dashboardPage.html";
        }

    })
    .catch(err => {
        let message = formLocalUpdate.parentNode.querySelector("#alert");
        message.innerHTML = "Error...";
        message.style.color = "#FF0000";
    })
})

formLocalDelete.addEventListener("submit", (event) => {
    event.preventDefault()

    var formData =  new FormData(formLocalDelete);
    var data = Object.fromEntries(formData);

    fetch(`http://${IP}:8080/local/${data["name"]}`, {
        mode: "cors",
        method: "DELETE",
        headers: header,
        body: JSON.stringify({})
    })
    .then(response => {
        if(response.status != 204){
            let message = formLocalDelete.parentNode.querySelector("#alert");
            message.innerHTML = "Error..."
            message.style.color = "#FF0000";

            throw new Error("HTTP Status " + response.status);
        }
        console.log(response);
        console.log(response.status)
        return response;
    })
    .then(data => {
        let message = formLocalDelete.parentNode.querySelector("#alert");
        message.innerHTML = "Local deleted!";
        message.style.color = "#00FF00";
        window.location = "dashboardPage.html";
    })
    .catch(err => {
        let message = formLocalDelete.parentNode.querySelector("#alert");
        message.innerHTML = "Error...";
        message.style.color = "#FF0000";
        console.log(err)
    })
})

subItemLocalGet.addEventListener("click", (event) => {
    event.preventDefault()
    fetch(`http://${IP}:8080/local`, {
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
        localsTableData.innerHTML = "";
        let array = Object.keys(data);

        array.forEach(index => {
            let tr = document.createElement("tr");

            let tdId = document.createElement("td");
            tdId.innerHTML = data[index]["id"];

            let tdName = document.createElement("td");
            tdName.innerHTML = data[index]["name"];

            let tdMac = document.createElement("td");
            tdMac.innerHTML = data[index]["mac"];
            
            tr.appendChild(tdId);
            tr.appendChild(tdName);
            tr.appendChild(tdMac);
            
            localsTableData.appendChild(tr);
        })
        
    })
    .catch(err => {
        console.log(err)
    })
})