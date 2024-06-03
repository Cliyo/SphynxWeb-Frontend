// PERMISSIONS SCREENS DIVS //
const permissionRegisterDiv = document.querySelector("#permission-register-div");
const permissionDeleteDiv = document.querySelector("#permission-delete-div");

const allScreens = document.querySelectorAll(".subscreen")

// PERMISSIONS SUB BUTTONS TO SHOW THE SCREENS //
const subItemPermissionRegister = document.querySelector("#sub-item-permission-register");
const subItemPermissionDelete = document.querySelector("#sub-item-permission-delete");

// FUNCTIONS TO SHOW AND HID THE SCREENS //
subItemPermissionRegister.addEventListener("click", (event) => {
    allScreens.forEach(screen => {
        screen.style.display = "none";
    })
    permissionRegisterDiv.style.display = "flex";
})

subItemPermissionDelete.addEventListener("click", (event) => {
    allScreens.forEach(screen => {
        screen.style.display = "none";
    })
    permissionDeleteDiv.style.display = "flex";
})