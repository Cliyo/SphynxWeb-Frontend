import { headerAuth } from "./utils/headers.js";
import { request } from "./utils/requestHttp.js";
import { api } from "./utils/testeConexao.js";

const usuariosContainer = document.querySelector("#usuarios-container");

const opcaoUsuarioVer = document.querySelector("#usuarios-menu-ver");
const opcaoUsuarioGrupo = document.querySelector("#usuarios-menu-grupo");

const menuGeral = document.querySelector("#usuarios-ver");
const inputGrupo = document.querySelector("#input-grupo");

const botaoCadastrarUsuario = document.querySelector("#botao-adicionar-novo");
const divCadastrarUsuario = document.querySelector("#usuarios-cadastrar");
const botaoCancelarCadastro = document.querySelector("#cancelar-cadastrar");

const tabela = document.querySelector("tbody");

opcaoUsuarioVer.addEventListener("click", async () => {
    if(!opcaoUsuarioVer.classList.contains("selecionado")){
        opcaoUsuarioVer.classList.toggle("selecionado");
        opcaoUsuarioGrupo.classList.toggle("selecionado");

        inputGrupo.style.display = "none";

        tabela.innerHTML = "";
        const response = await request(api, "consumers", "GET", headerAuth, null);

        response.forEach(usuario => {
            let tr = document.createElement("tr");

            let tdNome = document.createElement("td");
            tdNome.innerHTML = usuario.name;
            
            let tdGrupo = document.createElement("td");
            tdGrupo.innerHTML = usuario.permission.name;

            let tdRa = document.createElement("td");
            tdRa.innerHTML = usuario.ra;

            let tdTag = document.createElement("td");
            tdTag.innerHTML = usuario.tag;

            let tdAcao = document.createElement("td");

            let editarBotao = document.createElement("button");
            editarBotao.innerHTML = "Editar";
            let excluirBotao = document.createElement("button");
            excluirBotao.innerHTML = "Excluir";

            tdAcao.appendChild(editarBotao);
            tdAcao.appendChild(excluirBotao);

            tr.appendChild(tdNome);
            tr.appendChild(tdGrupo);
            tr.appendChild(tdRa);
            tr.appendChild(tdTag);
            tr.appendChild(tdAcao);

            tabela.appendChild(tr);
        });
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