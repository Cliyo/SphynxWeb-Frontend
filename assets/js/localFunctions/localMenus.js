import {finder, validateEsp} from "../sphynxFinder.js";

// LOCAL SCREENS DIVS //
const localRegisterDiv = document.querySelector("#local-register-div");
const localUpdateDiv = document.querySelector("#local-update-div");
const localDeleteDiv = document.querySelector("#local-delete-div");
const localGetDiv = document.querySelector("#local-get-div");

// LOCAL SUB BUTTONS TO SHOW THE SCREENS //
const subItemLocalRegister = document.querySelector("#sub-item-local-register");
const subItemLocalUpdate = document.querySelector("#sub-item-local-update");
const subItemLocalDelete = document.querySelector("#sub-item-local-delete");
const subItemLocalGet = document.querySelector("#sub-item-local-get")

// FUNCTIONS TO SHOW AND HID THE SCREENS //
subItemLocalRegister.addEventListener("click", async (event) => {
    event.preventDefault();

    allScreens.forEach(screen => {
        screen.style.display = "none";
    })
    localRegisterDiv.style.display = "flex";

    const allIps = await finder();
    const arrayEsp = await validateEsp(allIps);

    allIps.forEach(esp => {
        let tr = document.createElement("tr");

        let input = document.createElement("input");
        input.type = "text";
        input.className = "input-local-table";
        input.id = "input-local-table";

        let tdName = document.createElement("td");
        tdName.appendChild(input);

        let tdMac = document.createElement("td");
        tdMac.innerHTML = esp.mac;

        let button = document.createElement("button");
        button.innerHTML = "Save";
        button.className = "button-local-table";
        button.id = "button-local-table";

        let tdButton = document.createElement("td");
        tdButton.appendChild(button);
        
        tr.appendChild(tdName);
        tr.appendChild(tdMac);
        tr.appendChild(tdButton);
        
        localRegisterDiv.querySelector(".content-table").querySelector("tbody").appendChild(tr);
    })
})
subItemLocalUpdate.addEventListener("click", (event) => {
    allScreens.forEach(screen => {
        screen.style.display = "none";
    })
    localUpdateDiv.style.display = "flex";
})

subItemLocalDelete.addEventListener("click", (event) => {
    allScreens.forEach(screen => {
        screen.style.display = "none";
    })
    localDeleteDiv.style.display = "flex";
})

subItemLocalGet.addEventListener("click", (event) => {
    allScreens.forEach(screen => {
        screen.style.display = "none";
    })
    localGetDiv.style.display = "flex";
})

export {localGetDiv, subItemLocalGet};