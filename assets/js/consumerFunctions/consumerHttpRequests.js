// CONSUMER FORMS //
const formConsumerRegister = document.querySelector("#consumer-register-form");
const formConsumerUpdate = document.querySelector("#consumer-update-form");
const formConsumerDelete = document.querySelector("#consumer-delete-form");

// TABLE //
const consumersTableData = consumerGetDiv.querySelector(".content-table").querySelector("tbody");

// HTTP REQUESTS TO THE API //
formConsumerRegister.addEventListener("submit", (event) => {
    event.preventDefault()

    var formData =  new FormData(formConsumerRegister);
    var data = Object.fromEntries(formData);
    var jsonData = JSON.stringify(data);

    fetch("http://localhost:8080/consumer", {
        mode: "cors",
        method: "POST",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Access-Control-Allow-Origin': 'http://localhost:8080',
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
    .then(response => {
        if(!response.ok){
            let message = formConsumerRegister.parentNode.querySelector("#alert");
            message.innerHTML = "Error...";
            message.style.color = "#FF0000";

            throw new Error("HTTP Status " + response.status);
        }
        
        return response.json();
    })
    .then(data => {
        let message = formConsumerRegister.parentNode.querySelector("#alert");
        message.innerHTML = "Consumer created!";
        message.style.color = "#00FF00";
        window.location = "dashboardPage.html";
    })
    .catch(err => {
        let message = formConsumerRegister.parentNode.querySelector("#alert");
        message.innerHTML = "Error...";
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
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Access-Control-Allow-Origin': 'http://localhost:8080',
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"tag": data["tag"]})
    })
    .then(response => {
        if(!response.ok){
            let message = formConsumerUpdate.parentNode.querySelector("#alert");
            message.innerHTML = "Error..."
            message.style.color = "#FF0000";

            throw new Error("HTTP Status " + response.status);
        }
        
        return response.json();
    })
    .then(data => {
        let message = formConsumerUpdate.parentNode.querySelector("#alert");
        message.innerHTML = "Consumer edited!";
        message.style.color = "#00FF00";
        window.location = "dashboardPage.html";
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
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Access-Control-Allow-Origin': 'http://localhost:8080',
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type': 'application/json'
        },
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

subItemUserGet.addEventListener("click", (event) => {
    event.preventDefault()
    fetch(`http://localhost:8080/consumer`, {
        mode: "cors",
        method: "GET",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Access-Control-Allow-Origin': 'http://localhost:8080',
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type': 'application/json'
        }
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
            tdRa.innerHTML = data[index]["ra"];

            let tdNome = document.createElement("td");
            tdNome.innerHTML = data[index]["name"];

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