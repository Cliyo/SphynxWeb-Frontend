import RequestHTTP from "../RequestHTTP.js";
import { header, IP } from "../dashboardScript.js"
import { createLineTable } from "../utils/createLineTable.js";
import { raInput, localInput, dateInput, accessGetDiv } from "./accessMenus.js";

// TABLE //
const accessGetTableData = accessGetDiv.querySelector(".content-table").querySelector("tbody");

// BUTTONS //
const accessAllButton = document.querySelector("#sub-item-access-all");

// HTTP REQUESTS TO THE API //
accessAllButton.addEventListener("click", async (event) => {
    event.preventDefault();

    const req = new RequestHTTP(IP, "accessRegister", "GET", header, null);
    const reqData = await req.request();

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

    const req = new RequestHTTP(IP, `accessRegister/byRa/${ra}`, "GET", header, null);
    const reqData = await req.request();

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

    const req = new RequestHTTP(IP, `accessRegister/byLocal/${local}`, "GET", header, null);
    const reqData = await req.request();

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

    const req = new RequestHTTP(IP, `accessRegister/byDate/${dateComplete}`, "GET", header, null);
    const reqData = await req.request();

    accessGetTableData.innerHTML = "";
    let array = Object.keys(reqData);

    array.forEach(index => {
        let tr = createLineTable(reqData, index)
        
        accessGetTableData.appendChild(tr);
    }) 
})