const usuariosContainer = document.querySelector("#grupos-container");

const menuGeral = document.querySelector("#usuarios-ver");

const botaoCadastrarGrupos = document.querySelector("#botao-adicionar-novo");
const divCadastrarGrupos = document.querySelector("#grupos-cadastrar");
const botaoCancelarCadastro = document.querySelector("#cancelar-cadastrar");


botaoCadastrarGrupos.addEventListener("click", () => {
    usuariosContainer.classList.add("escurecer");
    divCadastrarGrupos.classList.add("mostrar");
})

botaoCancelarCadastro.addEventListener("click", () => {
    usuariosContainer.classList.remove("escurecer");
    divCadastrarGrupos.classList.remove("mostrar");
})