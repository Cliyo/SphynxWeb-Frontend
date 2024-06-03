import { header, api } from "../dashboardScript.js";
import {request} from "../utils/requestHttp.js";
import { localGetDiv, subItemLocalGet } from "./localMenus.js";

// LOCAL FORMS //
const formLocalUpdate = document.querySelector("#local-update-form");
const formLocalDelete = document.querySelector("#local-delete-form");

// TABLE //
const localsTableData = localGetDiv.querySelector(".content-table").querySelector("tbody"); 

// HTTP REQUESTS TO THE API //

formLocalUpdate.addEventListener("submit", async (event) => {
    event.preventDefault()

    var formData =  new FormData(formLocalUpdate);
    var data = Object.fromEntries(formData);
    var jsonData = JSON.stringify({"mac": data["mac"]});

    const reqData = await request(api, `locals/${data["name"]}`, "PUT", header, jsonData);

    if(reqData.message == 400){
        let message = formLocalUpdate.parentNode.querySelector("#alert");
        message.innerHTML = reqData.message;
        message.style.color = "#FF0000";
    } else{
        let message = formLocalUpdate.parentNode.querySelector("#alert");
        message.innerHTML = reqData.message;
        message.style.color = "#00FF00";
        window.location = "dashboardPage.html";
    }
})

formLocalDelete.addEventListener("submit", async (event) => {
    event.preventDefault()

    var formData =  new FormData(formLocalDelete);
    var data = Object.fromEntries(formData);
    var jsonData = JSON.stringify({});

    try{
        const reqData = await request(api, `locals/${data["name"]}`, "DELETE", header, jsonData);
        let message = formLocalDelete.parentNode.querySelector("#alert");
        message.innerHTML = "Local deleted!";
        message.style.color = "#00FF00";
        window.location = "dashboardPage.html";
    } catch(e){
        let message = formLocalDelete.parentNode.querySelector("#alert");
        message.innerHTML = "Error...";
        message.style.color = "#FF0000";
        console.log(err)
    }
})

subItemLocalGet.addEventListener("click", async (event) => {
    event.preventDefault()

    const reqData = await request(api, `locals`, "GET", header, null);

    localsTableData.innerHTML = "";
    let array = Object.keys(reqData);

    array.forEach(index => {
        let tr = document.createElement("tr");

        let tdId = document.createElement("td");
        tdId.innerHTML = reqData[index]["id"];

        let tdName = document.createElement("td");
        tdName.innerHTML = reqData[index]["name"];

        let tdMac = document.createElement("td");
        tdMac.innerHTML = reqData[index]["mac"];
        
        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdMac);
        
        localsTableData.appendChild(tr);
    })
})