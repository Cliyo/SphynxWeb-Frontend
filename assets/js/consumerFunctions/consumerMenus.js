// CONSUMER SCREENS DIVS //
const consumerRegisterDiv = document.querySelector("#consumer-register-div");
const consumerUpdateDiv = document.querySelector("#consumer-update-div");
const consumerDeleteDiv = document.querySelector("#consumer-delete-div");
const consumerGetDiv = document.querySelector("#consumer-get-div");

const allScreens = document.querySelectorAll(".subscreen")

// CONSUMER SUB BUTTONS TO SHOW THE SCREENS //
const subItemUserRegister = document.querySelector("#sub-item-user-register");
const subItemUserUpdate = document.querySelector("#sub-item-user-update");
const subItemUserDelete = document.querySelector("#sub-item-user-delete");
const subItemUserGet = document.querySelector("#sub-item-user-get")

// FUNCTIONS TO SHOW AND HID THE SCREENS //
subItemUserRegister.addEventListener("click", (event) => {
    allScreens.forEach(screen => {
        screen.style.display = "none";
        console.log(screen)
    })
    consumerRegisterDiv.style.display = "flex";
})

subItemUserUpdate.addEventListener("click", (event) => {
    allScreens.forEach(screen => {
        screen.style.display = "none";
    })
    consumerUpdateDiv.style.display = "flex";
})

subItemUserDelete.addEventListener("click", (event) => {
    allScreens.forEach(screen => {
        screen.style.display = "none";
    })
    consumerDeleteDiv.style.display = "flex";
})

subItemUserGet.addEventListener("click", (event) => {
    allScreens.forEach(screen => {
        screen.style.display = "none";
    })
    consumerGetDiv.style.display = "flex";
})