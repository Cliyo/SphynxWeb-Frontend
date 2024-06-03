function createLineTable(reqData, index){
    let tr = document.createElement("tr");

    let tdId = document.createElement("td");
    tdId.innerHTML = reqData[index]["id"];

    let tdStatus = document.createElement("td");
    tdStatus.innerHTML = reqData[index]["status"] == true ? "Liberado" : "Negado";

    let tdRa = document.createElement("td");
    tdRa.innerHTML = reqData[index]["consumer"]["ra"];

    let tdNome = document.createElement("td");
    tdNome.innerHTML = reqData[index]["consumer"]["name"];

    let tdTag = document.createElement("td");
    tdTag.innerHTML = reqData[index]["consumer"]["tag"];

    let tdLocal = document.createElement("td");
    tdLocal.innerHTML = reqData[index]["local"]["name"];

    let tdDate = document.createElement("td");
    tdDate.innerHTML = reqData[index]["date"];
    
    tr.appendChild(tdId);
    tr.appendChild(tdStatus);
    tr.appendChild(tdRa);
    tr.appendChild(tdNome);
    tr.appendChild(tdTag);
    tr.appendChild(tdLocal);
    tr.appendChild(tdDate);
    
    return tr;
}

export {createLineTable};