// ACCESS SCREENS DIVS //
const accessGetDiv = document.querySelector("#access-get");

// ACCESS SUB BUTTONS TO SHOW THE SCREENS //
// LOCAL SCREENS DIVS //
const allScreens = document.querySelectorAll(".subscreen")

const subItemAccessGetAllButton = document.querySelector("#sub-item-access-all")
const subItemAccessGetRaButton = document.querySelector("#sub-item-access-consumer")
const subItemAccessGetLocalButton = document.querySelector("#sub-item-access-local")
const subItemAccessGetDateButton = document.querySelector("#sub-item-access-date")

// INPUTS //
const inputs = accessGetDiv.querySelectorAll("input");
const raInput = accessGetDiv.querySelector("#ra-input");
const localInput = accessGetDiv.querySelector("#local-input");
const dateInput = accessGetDiv.querySelector("#date-input");

// FUNCTIONS TO SHOW AND HID THE SCREENS //
subItemAccessGetAllButton.addEventListener("click", () => {
    showAndHide();

    accessGetDiv.style.display = "flex";
})

subItemAccessGetRaButton.addEventListener("click", () => {
    showAndHide();

    accessGetDiv.style.display = "flex";
    raInput.style.display = "flex";

})

subItemAccessGetLocalButton.addEventListener("click", () => {
    showAndHide();

    accessGetDiv.style.display = "flex";
    localInput.style.display = "flex";

})

subItemAccessGetDateButton.addEventListener("click", () => {
    showAndHide();

    accessGetDiv.style.display = "flex";
    dateInput.style.display = "flex";

})

function showAndHide(){
    if (allScreens){
        allScreens.forEach(screen => {
        screen.style.display = "none";
        })
    }
    

    inputs.forEach(input => {
        input.style.display = "none";
    });
}

export {accessGetDiv, raInput, localInput, dateInput}