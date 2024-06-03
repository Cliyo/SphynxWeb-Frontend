import { api, header } from "../dashboardScript.js";
import { request } from "../utils/requestHttp.js";

// CONSUMER SCREENS DIVS //
const consumerRegisterDiv = document.querySelector("#consumer-register-div");
const consumerUpdateDiv = document.querySelector("#consumer-update-div");
const consumerDeleteDiv = document.querySelector("#consumer-delete-div");
const consumerGetDiv = document.querySelector("#consumer-get-div");

const allScreens = document.querySelectorAll(".subscreen")

// CONSUMER SUB BUTTONS TO SHOW THE SCREENS //
const subItemConsumerRegister = document.querySelector("#sub-item-consumer-register");
const subItemConsumerUpdate = document.querySelector("#sub-item-consumer-update");
const subItemConsumerDelete = document.querySelector("#sub-item-consumer-delete");
const subItemConsumerGet = document.querySelector("#sub-item-consumer-get")

// FUNCTIONS TO SHOW AND HID THE SCREENS //
subItemConsumerRegister.addEventListener("click", async (event) => {
    allScreens.forEach(screen => {
        screen.style.display = "none";
    })
    consumerRegisterDiv.style.display = "flex";

    let selectInput = document.querySelector("#permission-input");
    let reqData = await request(api, "permissions", "GET", header, null);
    reqData.sort((a, b) => a.level - b.level);
    reqData.forEach(permission => {
        let option = document.createElement("option");
        option.value = permission.level;
        option.innerHTML = permission.level + " - " + permission.name;
        selectInput.appendChild(option);
    });
})

subItemConsumerUpdate.addEventListener("click", (event) => {
    allScreens.forEach(screen => {
        screen.style.display = "none";
    })
    consumerUpdateDiv.style.display = "flex";
})

subItemConsumerDelete.addEventListener("click", (event) => {
    allScreens.forEach(screen => {
        screen.style.display = "none";
    })
    consumerDeleteDiv.style.display = "flex";
})

subItemConsumerGet.addEventListener("click", (event) => {
    allScreens.forEach(screen => {
        screen.style.display = "none";
    })
    consumerGetDiv.style.display = "flex";
})

export {consumerGetDiv, subItemConsumerGet};