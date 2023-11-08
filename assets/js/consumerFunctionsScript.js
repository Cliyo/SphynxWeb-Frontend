// CONSUMER REGISTER FUNCTION //
// CONSUMER SCREENS DIVS //
const consumerRegisterDiv = document.querySelector("#consumer-register-div");
const consumerUpdateDiv = document.querySelector("#consumer-update-div");
const consumerDeleteDiv = document.querySelector("#consumer-delete-div");
const consumerGetDiv = document.querySelector("#consumer-get-div");

const allScreens = document.querySelectorAll(".subscreen")

// CONSUMER FORMS //
const formConsumerRegister = document.querySelector("#consumer-register-form");
const formConsumerUpdate = document.querySelector("#consumer-update-form");

// CONSUMER SUB BUTTONS TO SHOW THE SCREENS //
const subItemUserRegister = document.querySelector("#sub-item-user-register");
const subItemUserUpdate = document.querySelector("#sub-item-user-update");
const subItemUserDelete = document.querySelector("#sub-item-user-delete");

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

// HTTP REQUESTS TO THE API //
formConsumerRegister.addEventListener("submit", (event) => {
    event.preventDefault()

    var formData =  new FormData(formConsumerRegister);
    var data = Object.fromEntries(formData);
    var jsonData = JSON.stringify(data);

    fetch("http://localhost:8080/consumer", {
        mode: "cors",
        method: "POST",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Access-Control-Allow-Origin': 'http://localhost:8080',
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
    .then(response => {
        if(!response.ok){
            let message = formConsumerRegister.parentNode.querySelector("#alert");
            message.innerHTML = "Error...";
            message.style.color = "#FF0000";

            throw new Error("HTTP Status " + response.status);
        }
        
        return response.json();
    })
    .then(data => {
        let message = formConsumerRegister.parentNode.querySelector("#alert");
        message.innerHTML = "Consumer created!";
        message.style.color = "#00FF00";
        window.location = "dashboardPage.html";
    })
    .catch(err => {
        let message = formConsumerRegister.parentNode.querySelector("#alert");
        message.innerHTML = "Auth Error...";
        message.style.color = "#FF0000";
    })
})

formConsumerUpdate.addEventListener("submit", (event) => {
    event.preventDefault()

    var formData =  new FormData(formConsumerUpdate);
    var data = Object.fromEntries(formData);

    fetch(`http://localhost:8080/consumer/${data["ra"]}`, {
        mode: "cors",
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Access-Control-Allow-Origin': 'http://localhost:8080',
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"tag": data["tag"]})
    })
    .then(response => {
        if(!response.ok){
            let message = formConsumerUpdate.parentNode.querySelector("#alert");
            message.innerHTML = "Error..."
            message.style.color = "#FF0000";

            throw new Error("HTTP Status " + response.status);
        }
        
        return response.json();
    })
    .then(data => {
        let message = formConsumerUpdate.parentNode.querySelector("#alert");
        message.innerHTML = "Consumer edited!";
        message.style.color = "#00FF00";
        window.location = "dashboardPage.html";
    })
    .catch(err => {
        let message = formConsumerUpdate.parentNode.querySelector("#alert");
        message.innerHTML = "Auth Error...";
        message.style.color = "#FF0000";
    })
})