import { finder, turnsEspInWebsocket } from "./finderFunctions/sphynxFinder.js";
import request from "./utils/requestHttp.js";

const IP = window.location.hostname

// MENU ANIMATION //
$('.sub-btn').next('.sub-menu').slideToggle();

$(document).ready(function(){
    $('.sub-btn').click(function(){
        $(this).parent().parent().find('.rotate').parent().parent().find('.sub-menu').slideToggle();
        $(this).parent().parent().find('.rotate').parent().parent().find('.sub-btn').find('.dropdown').toggleClass('rotate');
        $(this).next('.sub-menu').slideToggle();
        $(this).find('.dropdown').toggleClass('rotate');
    })
})

// GET THE WEBSITE LANGUAGE //
const urlParams = new URLSearchParams(window.location.search);
const language = urlParams.get("language");

// DEFINE THE HTTP HEADER //
const header = {
    'Authorization': `Bearer ${localStorage.getItem("token")}`,
    'Access-Control-Allow-Origin': `http://${IP}:8080`,
    'Access-Control-Allow-Credentials': 'true',
    'Content-Type': 'application/json',
    'language': language
}

// VERIFY THE USER LOGIN //
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
        if(data["result"] == false){
            window.location = "/";
        }
    })
    .catch(err => {
        window.location = "/";
        console.log(err);
    })
} else{
    window.location = "/";
}

// LOADING IMAGE CREATION //
const mainSection = document.querySelector("body").querySelector("section");
mainSection.style.filter = "brightness(50%)";

let img = document.createElement("img");
img.id = "load-image"
img.style.position = "absolute";
img.style.width = "90%";
img.style.height = "90%";
img.src = "../assets/img/load.gif";
mainSection.appendChild(img);

// GET ALL THE ESP32 //
const sphynxIps = [];

// GET ALL THE MAC IN DATABASE //
const reqData = await request(IP, `local`, "GET", header, null);

let array = Object.keys(reqData);

// GET ALL THE IPS ADDRESS
const allIps = await finder();

// FILTER //
array.forEach(index => {
    allIps.forEach(device => {
        if(reqData[index]["mac"] == device.mac){
            sphynxIps.push(device);
        }
    })
    
})

const listSockets = await turnsEspInWebsocket(sphynxIps);

img.style.display = "none";
mainSection.style.filter = "brightness(100%)";

export {header, language, IP, listSockets};