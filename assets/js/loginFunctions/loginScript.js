var form = document.querySelector("#form")
var message = document.querySelector("#alert-login")
const IP = window.location.hostname

if(localStorage.getItem("token")){
    fetch(`http://${IP}:8080/login/verify`,{
        mode: 'cors',
        method: "POST",
        headers: {
            'Access-Control-Allow-Origin': `http://${IP}:8080`,
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "token": localStorage.getItem("token")
        })
    })

    .then(response => response.json())
    .then(data => {
        if(data["result"] == true){
            window.location = "pages/dashboardPage.html";
        }
    })
    .catch(err => {
        console.log(err);
    })
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    var formData = new FormData(form);
    var data = Object.fromEntries(formData);
    var jsonData = JSON.stringify(data);

    fetch(`http://${IP}:8080/login`,{
        mode: 'cors',
        method: "POST",
        headers: {
            'Access-Control-Allow-Origin': `http://${IP}:8080`,
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type': 'application/json'
        },
        body: jsonData
    })

    .then(response => {
        if(!response.ok){
            message.innerHTML = "Login error...";
            message.style.color = "#FF0000";

            throw new Error("HTTP Status " + response.status);
        }
        
        return response.json()
    })
    .then(data => {
        message.innerHTML = "Logged!";
        message.style.color = "#00FF00";
        localStorage.setItem("token", data["token"]);
        window.location = "pages/dashboardPage.html";
    })
    .catch(err => {
        console.log(err);
    })
})