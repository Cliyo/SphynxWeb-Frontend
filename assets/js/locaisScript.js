const opcaoLocalVer = document.querySelector("#locais-menu-ver");
const opcaoLocalCadastrar = document.querySelector("#locais-menu-cadastrar");

const menuGeral = document.querySelector("#locais-ver");

const tabela = document.querySelector("table");

opcaoLocalVer.addEventListener("click", () => {
    if(!opcaoLocalVer.classList.contains("selecionado")){
        opcaoLocalVer.classList.toggle("selecionado");
        opcaoLocalCadastrar.classList.toggle("selecionado");

    }
    
})

opcaoLocalCadastrar.addEventListener("click", () => {
    if(!opcaoLocalCadastrar.classList.contains("selecionado")){
        opcaoLocalVer.classList.toggle("selecionado");
        opcaoLocalCadastrar.classList.toggle("selecionado");

        
    }
})