$('.sub-btn').next('.sub-menu').slideToggle();

$(document).ready(function(){
    $('.sub-btn').click(function(){
        $(this).parent().parent().find('.rotate').parent().parent().find('.sub-menu').slideToggle();
        $(this).parent().parent().find('.rotate').parent().parent().find('.sub-btn').find('.dropdown').toggleClass('rotate');
        $(this).next('.sub-menu').slideToggle();
        $(this).find('.dropdown').toggleClass('rotate');
    })
})

const urlParams = new URLSearchParams(window.location.search);
const language = urlParams.get("language");

const header = {
    'Authorization': `Bearer ${localStorage.getItem("token")}`,
    'Access-Control-Allow-Origin': 'http://localhost:8080',
    'Access-Control-Allow-Credentials': 'true',
    'Content-Type': 'application/json',
    'language': language
}

export {header, language};