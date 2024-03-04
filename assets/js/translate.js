import translateBr from "../json/translations/portuguese.json" assert { type: "json" };
import translateEn from "../json/translations/english.json" assert {type: "json"};

const check = document.querySelector(".checkbox");

check.addEventListener("change", (event) => {
    event.preventDefault();

    if(check.checked == true){
        changeToPortuguese();
    } else {
        changeToEnglish();
    }
})

const subitem = document.querySelectorAll(".sub-item");
const menus = document.querySelectorAll(".sub-btn");

function changeToPortuguese(){
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


}

function changeToEnglish(){
    subitem.forEach(item => {
        let itemFormat = item.id.split("sub-item-")[1];

        item.innerHTML = translateEn[itemFormat]; 

    });

    menus.forEach(menu => {
        let i = document.createElement("i");
        i.className = "fa-solid fa-chevron-right dropdown";
         
        if("access" in menu.dataset){
            menu.innerHTML = '<i class="fa-solid fa-chevron-right dropdown"></i> ' + translateEn.access;
        }

        if("consumer" in menu.dataset){
            menu.innerHTML = '<i class="fa-solid fa-chevron-right dropdown"></i> ' + translateEn.consumer;
        }

        if("local" in menu.dataset){
            menu.innerHTML = '<i class="fa-solid fa-chevron-right dropdown"></i> ' + translateEn.local;
        }
    })
}


