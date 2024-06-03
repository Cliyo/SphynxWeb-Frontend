import {request} from "../utils/requestHttp.js";
import { header, api } from "../dashboardScript.js"
import { createLineTable } from "../utils/createLineTable.js";
import { raInput, localInput, dateInput, accessGetDiv } from "./accessMenus.js";

// TABLE //
const accessGetTableData = accessGetDiv.querySelector(".content-table").querySelector("tbody");

// BUTTONS //
const accessAllButton = document.querySelector("#sub-item-access-all");

// HTTP REQUESTS TO THE API //
accessAllButton.addEventListener("click", async (event) => {
    event.preventDefault();

    const reqData = await request(api, "accessRegisters", "GET", header, null);

    console.log(reqData)
    accessGetTableData.innerHTML = "";
    let array = Object.keys(reqData);

    array.forEach(index => {
        let tr = createLineTable(reqData, index);
        
        accessGetTableData.appendChild(tr);
    })   
})

raInput.addEventListener("focusout", async (event) => {
    event.preventDefault()

    let ra = raInput.value;

    const reqData = await request(api, `accessRegisters/byRa/${ra}`, "GET", header, null);

    accessGetTableData.innerHTML = "";
    let array = Object.keys(reqData);

    array.forEach(index => {
        let tr = createLineTable(reqData, index)
        
        accessGetTableData.appendChild(tr);
    })   
})

localInput.addEventListener("focusout", async (event) => {
    event.preventDefault()

    let local = localInput.value.replace(" ", "_");

    const reqData = await request(api, `accessRegisters/byLocal/${local}`, "GET", header, null);

    accessGetTableData.innerHTML = "";
    let array = Object.keys(reqData);

    array.forEach(index => {
        let tr = createLineTable(reqData, index);

        accessGetTableData.appendChild(tr);
    }) 
})

dateInput.addEventListener("focusout", async (event) => {
    event.preventDefault()

    let date = new Date(dateInput.value);

    let day = date.getDate() + 1;
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let dateComplete = year + "-" + month + "-" + day;
    
    const reqData = await request(api, `accessRegisters/byDate/${dateComplete}`, "GET", header, null);

    accessGetTableData.innerHTML = "";
    let array = Object.keys(reqData);

    array.forEach(index => {
        let tr = createLineTable(reqData, index)
        
        accessGetTableData.appendChild(tr);
    }) 
})