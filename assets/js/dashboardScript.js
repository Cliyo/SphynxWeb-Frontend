import { finder, inDatabase, turnsEspInWebsocket } from "./finderFunctions/sphynxFinder.js";
import request from "./utils/requestHttp.js";
import { localRegisterTable } from "./localFunctions/localMenus.js";

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

const macsInDatabase = await inDatabase();

const allIps = await finder();

const sphynxsInDatabase = []
macsInDatabase.forEach(mac => {
    allIps.forEach(device => {
        if(mac == device.mac){
            sphynxsInDatabase.push(device);
        }
    })
})

await localRegisterTable(allIps, sphynxsInDatabase)

const listSockets = await turnsEspInWebsocket(sphynxsInDatabase);

export {header, language, IP, sphynxsInDatabase, listSockets};