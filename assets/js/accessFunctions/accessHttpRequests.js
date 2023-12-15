// TABLE //
const accessGetTableData = accessGetDiv.querySelector(".content-table").querySelector("tbody");

// BUTTONS //
const accessAllButton = document.querySelector("#sub-item-access-all");
const accessDailyButton = document.querySelector("#sub-item-access-daily");
const accessLocalButton = document.querySelector("#sub-item-access-local");
const accessConsumerButton = document.querySelector("#sub-item-access-consumer");

// HTTP REQUESTS TO THE API //
accessAllButton.addEventListener("click", (event) => {
    event.preventDefault()
    fetch(`http://localhost:8080/accessRegister`, {
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

    fetch(`http://localhost:8080/accessRegister/byRa/${ra}`, {
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
        accessGetTableData.innerHTML = "";
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

            let tdLocal = document.createElement("td");
            tdLocal.innerHTML = data[index]["local"];

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

    fetch(`http://localhost:8080/accessRegister/byLocal/${local}`, {
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
        accessGetTableData.innerHTML = "";
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

            let tdLocal = document.createElement("td");
            tdLocal.innerHTML = data[index]["local"];

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

    fetch(`http://localhost:8080/accessRegister/byDate/${dateComplete}`, {
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
        accessGetTableData.innerHTML = "";
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

            let tdLocal = document.createElement("td");
            tdLocal.innerHTML = data[index]["local"];

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