// CONSUMER FORMS //
const formLocalRegister = document.querySelector("#local-register-form");
const formLocalUpdate = document.querySelector("#local-update-form");
const formLocalDelete = document.querySelector("#local-delete-form");

// TABLE //
const localsTableData = localGetDiv.querySelector(".content-table").querySelector("tbody"); 

// HTTP REQUESTS TO THE API //
formLocalRegister.addEventListener("submit", (event) => {
    event.preventDefault()

    var formData =  new FormData(formLocalRegister);
    var data = Object.fromEntries(formData);
    var jsonData = JSON.stringify(data);

    fetch("http://localhost:8080/local", {
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
            let message = formLocalRegister.parentNode.querySelector("#alert");
            message.innerHTML = "Error...";
            message.style.color = "#FF0000";

            throw new Error("HTTP Status " + response.status);
        }
        
        return response.json();
    })
    .then(data => {
        let message = formLocalRegister.parentNode.querySelector("#alert");
        message.innerHTML = "Local created!";
        message.style.color = "#00FF00";
        window.location = "dashboardPage.html";
    })
    .catch(err => {
        let message = formLocalRegister.parentNode.querySelector("#alert");
        message.innerHTML = "Error...";
        message.style.color = "#FF0000";
    })
})

formLocalUpdate.addEventListener("submit", (event) => {
    event.preventDefault()

    var formData =  new FormData(formLocalUpdate);
    var data = Object.fromEntries(formData);

    fetch(`http://localhost:8080/local/${data["name"]}`, {
        mode: "cors",
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Access-Control-Allow-Origin': 'http://localhost:8080',
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"mac": data["mac"]})
    })
    .then(response => {
        if(!response.ok){
            let message = formLocalUpdate.parentNode.querySelector("#alert");
            message.innerHTML = "Error..."
            message.style.color = "#FF0000";

            throw new Error("HTTP Status " + response.status);
        }
        
        return response.json();
    })
    .then(data => {
        let message = formLocalUpdate.parentNode.querySelector("#alert");
        message.innerHTML = "Local edited!";
        message.style.color = "#00FF00";
        window.location = "dashboardPage.html";
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

    fetch(`http://localhost:8080/local/${data["name"]}`, {
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
    fetch(`http://localhost:8080/local`, {
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