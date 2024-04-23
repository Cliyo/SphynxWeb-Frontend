import { header, IP } from "../dashboardScript.js"
import { raInput, localInput, dateInput, accessGetDiv } from "./accessMenus.js";

// TABLE //
const accessGetTableData = accessGetDiv.querySelector(".content-table").querySelector("tbody");

// BUTTONS //
const accessAllButton = document.querySelector("#sub-item-access-all");

// HTTP REQUESTS TO THE API //
accessAllButton.addEventListener("click", (event) => {
    event.preventDefault();

    
    fetch(`http://${IP}:8080/accessRegister`, {
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
        accessGetTableData.innerHTML = "";
        let array = Object.keys(data);

        array.forEach(index => {
            let tr = document.createElement("tr");

            let tdId = document.createElement("td");
            tdId.innerHTML = data[index]["id"];

            let tdRa = document.createElement("td");
            tdRa.innerHTML = data[index]["consumer"]["person"]["ra"];

            let tdNome = document.createElement("td");
            tdNome.innerHTML = data[index]["consumer"]["person"]["name"];

            let tdTag = document.createElement("td");
            tdTag.innerHTML = data[index]["consumer"]["tag"];

            let tdLocal = document.createElement("td");
            tdLocal.innerHTML = data[index]["local"]["name"];

            let tdDate = document.createElement("td");
            tdDate.innerHTML = data[index]["date"];
            
            tr.appendChild(tdId);
            tr.appendChild(tdRa);
            tr.appendChild(tdNome);
            tr.appendChild(tdTag);
            tr.appendChild(tdLocal);
            tr.appendChild(tdDate);
            
            accessGetTableData.appendChild(tr);
        })
        
    })
    .catch(err => {
        console.log(err)
    })
})

raInput.addEventListener("focusout", (event) => {
    event.preventDefault()

    let ra = raInput.value;

    fetch(`http://${IP}:8080/accessRegister/byRa/${ra}`, {
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
        accessGetTableData.innerHTML = "";
        let array = Object.keys(data);

        array.forEach(index => {
            let tr = document.createElement("tr");

            let tdId = document.createElement("td");
            tdId.innerHTML = data[index]["id"];

            let tdRa = document.createElement("td");
            tdRa.innerHTML = data[index]["consumer"]["person"]["ra"];

            let tdNome = document.createElement("td");
            tdNome.innerHTML = data[index]["consumer"]["person"]["name"];

            let tdTag = document.createElement("td");
            tdTag.innerHTML = data[index]["consumer"]["tag"];

            let tdLocal = document.createElement("td");
            tdLocal.innerHTML = data[index]["local"]["name"];

            let tdDate = document.createElement("td");
            tdDate.innerHTML = data[index]["date"];
            
            tr.appendChild(tdId);
            tr.appendChild(tdRa);
            tr.appendChild(tdNome);
            tr.appendChild(tdTag);
            tr.appendChild(tdLocal);
            tr.appendChild(tdDate);
            
            accessGetTableData.appendChild(tr);
        })
        
    })
    .catch(err => {
        console.log(err)
    })
})

localInput.addEventListener("focusout", (event) => {
    event.preventDefault()

    let local = localInput.value.replace(" ", "_");

    fetch(`http://${IP}:8080/accessRegister/byLocal/${local}`, {
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
        accessGetTableData.innerHTML = "";
        let array = Object.keys(data);

        array.forEach(index => {
            let tr = document.createElement("tr");

            let tdId = document.createElement("td");
            tdId.innerHTML = data[index]["id"];

            let tdRa = document.createElement("td");
            tdRa.innerHTML = data[index]["consumer"]["person"]["ra"];

            let tdNome = document.createElement("td");
            tdNome.innerHTML = data[index]["consumer"]["person"]["name"];

            let tdTag = document.createElement("td");
            tdTag.innerHTML = data[index]["consumer"]["tag"];

            let tdLocal = document.createElement("td");
            tdLocal.innerHTML = data[index]["local"]["name"];

            let tdDate = document.createElement("td");
            tdDate.innerHTML = data[index]["date"];
            
            tr.appendChild(tdId);
            tr.appendChild(tdRa);
            tr.appendChild(tdNome);
            tr.appendChild(tdTag);
            tr.appendChild(tdLocal);
            tr.appendChild(tdDate);
            
            accessGetTableData.appendChild(tr);
        })
        
    })
    .catch(err => {
        console.log(err)
    })
})

dateInput.addEventListener("focusout", (event) => {
    event.preventDefault()

    let date = new Date(dateInput.value);

    let day = date.getDate() + 1;
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let dateComplete = year + "-" + month + "-" + day;

    fetch(`http://${IP}:8080/accessRegister/byDate/${dateComplete}`, {
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
        accessGetTableData.innerHTML = "";
        let array = Object.keys(data);

        array.forEach(index => {
            let tr = document.createElement("tr");

            let tdId = document.createElement("td");
            tdId.innerHTML = data[index]["id"];

            let tdRa = document.createElement("td");
            tdRa.innerHTML = data[index]["consumer"]["person"]["ra"];

            let tdNome = document.createElement("td");
            tdNome.innerHTML = data[index]["consumer"]["person"]["name"];

            let tdTag = document.createElement("td");
            tdTag.innerHTML = data[index]["consumer"]["tag"];

            let tdLocal = document.createElement("td");
            tdLocal.innerHTML = data[index]["local"]["name"];

            let tdDate = document.createElement("td");
            tdDate.innerHTML = data[index]["date"];
            
            tr.appendChild(tdId);
            tr.appendChild(tdRa);
            tr.appendChild(tdNome);
            tr.appendChild(tdTag);
            tr.appendChild(tdLocal);
            tr.appendChild(tdDate);
            
            accessGetTableData.appendChild(tr);
        })
        
    })
    .catch(err => {
        console.log(err)
    })
})