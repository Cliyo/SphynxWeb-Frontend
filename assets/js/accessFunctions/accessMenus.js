// ACCESS SCREENS DIVS //
const accessGetAllDiv = document.querySelector("#access-get-all");


// ACCESS SUB BUTTONS TO SHOW THE SCREENS //
const subItemAccessGetAll = document.querySelector("#sub-item-access-all")

// FUNCTIONS TO SHOW AND HID THE SCREENS //
subItemAccessGetAll.addEventListener("click", (event) => {
    allScreens.forEach(screen => {
        screen.style.display = "none";
    })
    accessGetAllDiv.style.display = "flex";
})
