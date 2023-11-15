// TABLE //
const accessGetAllTableData = accessGetAllDiv.querySelector(".content-table").querySelector("tbody");

// HTTP REQUESTS TO THE API //
subItemAccessGetAll.addEventListener("click", (event) => {
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
        accessGetAllTableData.innerHTML = "";
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
            
            accessGetAllTableData.appendChild(tr);
        })
        
    })
    .catch(err => {
        console.log(err)
    })
})