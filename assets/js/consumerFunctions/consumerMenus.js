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
subItemConsumerRegister.addEventListener("click", (event) => {
    allScreens.forEach(screen => {
        screen.style.display = "none";
    })
    consumerRegisterDiv.style.display = "flex";
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