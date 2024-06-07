const usuariosContainer = document.querySelector("#usuarios-container");

const opcaoUsuarioVer = document.querySelector("#usuarios-menu-ver");
const opcaoUsuarioGrupo = document.querySelector("#usuarios-menu-grupo");

const menuGeral = document.querySelector("#usuarios-ver");
const inputGrupo = document.querySelector("#input-grupo");

const botaoCadastrarUsuario = document.querySelector("#botao-adicionar-novo");
const divCadastrarUsuario = document.querySelector("#usuarios-cadastrar");
const botaoCancelarCadastro = document.querySelector("#cancelar-cadastrar");

opcaoUsuarioVer.addEventListener("click", () => {
    if(!opcaoUsuarioVer.classList.contains("selecionado")){
        opcaoUsuarioVer.classList.toggle("selecionado");
        opcaoUsuarioGrupo.classList.toggle("selecionado");

        inputGrupo.style.display = "none";
    }
    
})

opcaoUsuarioGrupo.addEventListener("click", () => {
    if(!opcaoUsuarioGrupo.classList.contains("selecionado")){
        opcaoUsuarioVer.classList.toggle("selecionado");
        opcaoUsuarioGrupo.classList.toggle("selecionado");

        inputGrupo.style.display = "flex";
    }
})

botaoCadastrarUsuario.addEventListener("click", () => {
    usuariosContainer.classList.add("escurecer");
    divCadastrarUsuario.classList.add("mostrar");
})

botaoCancelarCadastro.addEventListener("click", () => {
    usuariosContainer.classList.remove("escurecer");
    divCadastrarUsuario.classList.remove("mostrar");
})