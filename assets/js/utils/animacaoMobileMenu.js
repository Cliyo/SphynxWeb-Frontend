const botaoMenuMobile = document.querySelector("#menu-mobile-botao");
botaoMenuMobile.addEventListener("click", () => {
    let nav = document.querySelector("nav");

    if(nav.classList.contains("mostrarMenu")){
        nav.classList.remove("mostrarMenu")
        nav.classList.add("esconderMenu")
    }
    else{
        nav.classList.remove("esconderMenu")
        nav.classList.add("mostrarMenu")
    }
})