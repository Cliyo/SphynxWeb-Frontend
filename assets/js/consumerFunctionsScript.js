// USER REGISTER FUNCTION //
const formConsumerRegister = document.querySelector("#consumer-register-form");
const message = document.querySelector("#alert");

formConsumerRegister.addEventListener("submit", (event) => {
    event.preventDefault()

    var formData =  new FormData(formConsumerRegister);
    var data = Object.fromEntries(formData);
    var jsonData = JSON.stringify(data);

    fetch("http://localhost:8080/consumer", {
        mode: "cors",
        method: "POST",
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:8080',
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
    .then(response => {
        if(!response.ok){
            message.innerHTML = "Error...";
            message.style.color = "#FF0000";

            throw new Error("HTTP Status " + response.status);
        }
        
        return response
    })
    .then(data => {
        message.innerHTML = "Consumer created!";
        message.style.color = "#00FF00";
        window.location = "dashboardPage.html";
    })
    .catch(err => console.log(err))
})