import { headerAuth } from "./utils/headers.js";
import { mostrarMensagem } from "./utils/messages.js";
import { preencherSelectGrupo } from "./utils/preencherSelect.js";
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

const legendaQntUsuarios = document.querySelector("#legenda-quantidade-usuarios");

window.onload = async () => {
    tabela.innerHTML = "";
    const response = await request(api, "consumers", "GET", headerAuth, null);

    response.forEach(usuario => {
        let linha = criarLinhaTabela(usuario);

        tabela.appendChild(linha);
    });

    legendaQntUsuarios.innerHTML = `Total: ${response.length} usuario(s)`;
}

opcaoUsuarioVer.addEventListener("click", async () => {
    if(!opcaoUsuarioVer.classList.contains("selecionado")){
        opcaoUsuarioVer.classList.toggle("selecionado");
        opcaoUsuarioGrupo.classList.toggle("selecionado");

        inputGrupo.style.display = "none";

        tabela.innerHTML = "";
        const response = await request(api, "consumers", "GET", headerAuth, null);

        response.forEach(usuario => {
            let linha = criarLinhaTabela(usuario);

            tabela.appendChild(linha);
        });
    }
    
})

opcaoUsuarioGrupo.addEventListener("click", async () => {
    if(!opcaoUsuarioGrupo.classList.contains("selecionado")){
        opcaoUsuarioVer.classList.toggle("selecionado");
        opcaoUsuarioGrupo.classList.toggle("selecionado");

        inputGrupo.style.display = "flex";

        inputGrupo.innerHTML = "";

        const responseGrupo = await request(api, "permissions", "GET", headerAuth, null);

        preencherSelectGrupo(inputGrupo, responseGrupo);

        inputGrupo.addEventListener("change", async () => {
            const response = await request(api, `consumers?permission=${inputGrupo.value}`, "GET", headerAuth, null);
            tabela.innerHTML = "";

            response.forEach(usuario => {
                let linha = criarLinhaTabela(usuario);
    
                tabela.appendChild(linha);
            });
        })
    }
})

botaoCadastrarUsuario.addEventListener("click", async () => {
    usuariosContainer.classList.add("escurecer");
    divCadastrarUsuario.classList.add("mostrar");

    let grupoInput = document.querySelector("#input-grupo-cadastrar");
    grupoInput.innerHTML = "";

    const responseGrupo = await request(api, "permissions", "GET", headerAuth, null);

    preencherSelectGrupo(grupoInput, responseGrupo);

    let formCadastrar = document.querySelector("form");
    formCadastrar.addEventListener("submit", async (event) => {
        event.preventDefault();

        var formData =  new FormData(formCadastrar);
        var dados = Object.fromEntries(formData);
        dados.permission = grupoInput.value;
        var jsonData = JSON.stringify(dados);
        
        const response = await request(api, "consumers", "POST", headerAuth, jsonData);

        console.log(response)
        mostrarMensagem(response.message);
        if(response.status == 201){
            
        } else{
            
        } 
    })
})

botaoCancelarCadastro.addEventListener("click", () => {
    usuariosContainer.classList.remove("escurecer");
    divCadastrarUsuario.classList.remove("mostrar");
})

function criarLinhaTabela(usuario){
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
    excluirBotao.addEventListener("click", async () => {

        const response = await request(api, `consumers/${usuario.ra}`, "DELETE", headerAuth, null);

        try{
            mostrarMensagem(response.message);
        }
        catch(erro){
            mostrarMensagem("Produto deletado com sucesso.");

            let novaQnt = legendaQntUsuarios.innerHTML.match("[0-9]")[0] - 1;
            legendaQntUsuarios.innerHTML = `Total: ${novaQnt} usuario(s)`;
    
            tr.remove();
        } 

    })

    tdAcao.appendChild(editarBotao);
    tdAcao.appendChild(excluirBotao);

    tr.appendChild(tdNome);
    tr.appendChild(tdGrupo);
    tr.appendChild(tdRa);
    tr.appendChild(tdTag);
    tr.appendChild(tdAcao);

    return tr;
}
