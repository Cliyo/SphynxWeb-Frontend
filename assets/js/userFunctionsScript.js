// USER REGISTER FUNCTION //
const formUserRegister = document.querySelector("#user-register-form");

formUserRegister.addEventListener("submit", (event) => {
    event.preventDefault()

    var formData =  new FormData(formUserRegister);
    var data = Object.fromEntries(formData);
    var jsonData = JSON.stringify(data);

    fetch("http://localhost:8080/user", {
        mode: "cors",
        method: "POST",
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:8080',
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
})