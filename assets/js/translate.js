import translateBr from "../json/translations/portuguese.json" assert { type: "json" };

const titles = document.querySelectorAll("h1");
const subitem = document.querySelectorAll(".sub-item");
const menus = document.querySelectorAll(".sub-btn");
const columns = document.querySelectorAll("th");
const buttons = document.querySelectorAll(".submit");

const urlParams = new URLSearchParams(window.location.search);
const language = urlParams.get("language");

if(language == "pt"){
    subitem.forEach(item => {
        let itemFormat = item.id.split("sub-item-")[1];

        item.innerHTML = translateBr[itemFormat]; 
    });

    menus.forEach(menu => {
        let i = document.createElement("i");
        i.className = "fa-solid fa-chevron-right dropdown";
         
        if("access" in menu.dataset){
            menu.innerHTML = '<i class="fa-solid fa-chevron-right dropdown"></i> ' + translateBr.access;
        }

        if("consumer" in menu.dataset){
            menu.innerHTML = '<i class="fa-solid fa-chevron-right dropdown"></i> ' + translateBr.consumer;
        }

        if("local" in menu.dataset){
            menu.innerHTML = '<i class="fa-solid fa-chevron-right dropdown"></i> ' + translateBr.local;
        }
    });

    columns.forEach(column => {
        if("name" in column.dataset){
            column.innerHTML = translateBr.name;
        }

        if("date" in column.dataset){
            column.innerHTML = translateBr.date;
        }
    });

    titles.forEach(title => {
        if("register" in title.dataset){
            title.innerHTML = translateBr["consumer-register"]
        }

        if("update" in title.dataset){
            title.innerHTML = translateBr["consumer-update"];
        }

        if("delete" in title.dataset){
            title.innerHTML = translateBr["consumer-delete"];
        }
    });

    buttons.forEach(button => {
        button.value = "Finalizar";
    });
}