$('.sub-btn').next('.sub-menu').slideToggle();

if(localStorage.getItem("token")){
    fetch("http://localhost:8080/login/verify",{
        mode: 'cors',
        method: "POST",
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:8080',
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "token": localStorage.getItem("token")
        })
    })

    .then(response => response.json())
    .then(data => {
        if(data["result"] == false){
            window.location = "loginPage.html";
        }
    })
    .catch(err => {
        console.log(err);
    })
} else{
    window.location = "loginPage.html";
}


$(document).ready(function(){
    $('.sub-btn').click(function(){
        $(this).parent().parent().find('.rotate').parent().parent().find('.sub-menu').slideToggle();
        $(this).parent().parent().find('.rotate').parent().parent().find('.sub-btn').find('.dropdown').toggleClass('rotate');
        $(this).next('.sub-menu').slideToggle();
        $(this).find('.dropdown').toggleClass('rotate');
    })
})