import { findNewDevices } from "./finderFunctions/sphynxFinder.js";
import { headerAuth } from "./utils/headers.js";
import { mostrarMensagem } from "./utils/messages.js";
import { preencherSelectGrupo } from "./utils/preencherSelect.js";
import { request } from "./utils/requestHttp.js";
import { api } from "./utils/testeConexao.js";

const opcaoLocalVer = document.querySelector("#locais-menu-ver");
const opcaoLocalCadastrar = document.querySelector("#locais-menu-cadastrar");

const menuGeral = document.querySelector("#locais-ver");

const tabela = document.querySelector("tbody");

tabela.innerHTML = "";
// const response = await request(api, "locals", "GET", headerAuth, null);

// response.forEach(local => {
//     let linha = criarLinhaTabelaMostrar(local);

//     tabela.appendChild(linha);
// });

// findNewDevices(true);

opcaoLocalVer.addEventListener("click", async () => {
    if(!opcaoLocalVer.classList.contains("selecionado")){
        opcaoLocalVer.classList.toggle("selecionado");
        opcaoLocalCadastrar.classList.toggle("selecionado");

        tabela.innerHTML = "";

        // const response = await request(api, "locals", "GET", headerAuth, null);

        // response.forEach(local => {
        //     let linha = criarLinhaTabelaMostrar(local);

        //     tabela.appendChild(linha);
        // });
    }
    
})

opcaoLocalCadastrar.addEventListener("click", () => {
    if(!opcaoLocalCadastrar.classList.contains("selecionado")){
        opcaoLocalVer.classList.toggle("selecionado");
        opcaoLocalCadastrar.classList.toggle("selecionado");

        tabela.innerHTML = "";
        
        // let json = localStorage.getItem("Sphynxs");
        // let sphynxs = json ? JSON.parse(json) : [];
        // let index = 0;

        // sphynxs.forEach(async sphynx => {
        //     let linha = await criarLinhaTabelaCadastrar(sphynx, sphynxs, index);

        //     tabela.appendChild(linha);

        //     index++;
        // })
    }
})

function adicionarFuncaoEditarAoBotao(botao){
    const elementosAntigos = botao.parentNode.parentNode.cloneNode(true);
    let botaoEditarAntigo = elementosAntigos.querySelector("#botao-editar");
    botaoEditarAntigo.addEventListener("click", () => {adicionarFuncaoEditarAoBotao(botaoEditarAntigo)});
   
    const elementosAntigosLista = Array.from(elementosAntigos.children);

    let tdNome = botao.parentNode.parentNode.querySelector("#campo-nome");
    let tdAcao = botao.parentNode;

    let nomeAntigo = tdNome.innerHTML;

    tdNome.innerHTML = "";
    tdAcao.innerHTML = "";

    let inputEditarNome = document.createElement("input");
    inputEditarNome.type = "text";
    inputEditarNome.className = "editar-nome-input";
    inputEditarNome.id = "editar-nome-input";
    inputEditarNome.placeholder = nomeAntigo;

    let botaoCancelar = document.createElement("button");
    botaoCancelar.innerHTML = "Cancelar";
    botaoCancelar.addEventListener("click", () => {
        let trAtual = botaoCancelar.parentNode.parentNode;
        trAtual.innerHTML = "";
        elementosAntigosLista.forEach(elemento => {
            trAtual.appendChild(elemento);
        });
    })

    let botaoConfirmar = document.createElement("button");
    botaoConfirmar.innerHTML = "Confirmar";

    tdNome.appendChild(inputEditarNome);
    tdAcao.appendChild(botaoCancelar);
    tdAcao.appendChild(botaoConfirmar);
}

function criarLinhaTabelaMostrar(local){
    let tr = document.createElement("tr");

    let tdNome = document.createElement("td");
    tdNome.id = "campo-nome";
    tdNome.innerHTML = local.name;

    let tdPermissao = document.createElement("td");
    tdPermissao.innerHTML = local.permission.name;
    
    let tdMac = document.createElement("td");
    tdMac.innerHTML = local.mac;

    let tdAcao = document.createElement("td");

    let botaoEditar = document.createElement("button");
    botaoEditar.id = "botao-editar"
    botaoEditar.innerHTML = "Editar";
    botaoEditar.addEventListener("click", () => {
        adicionarFuncaoEditarAoBotao(botaoEditar);
    })

    let botaoExcluir = document.createElement("button");
    botaoExcluir.innerHTML = "Excluir";
    botaoExcluir.addEventListener("click", async () => {
        // const response = await request(api, `locals/${local.name}`, "DELETE", headerAuth, null);

        mostrarMensagem("Local deletado com sucesso.");

        tr.remove();
    })

    tdAcao.appendChild(botaoEditar);
    tdAcao.appendChild(botaoExcluir);

    tr.appendChild(tdNome);
    tr.appendChild(tdPermissao);
    tr.appendChild(tdMac);
    tr.appendChild(tdAcao);

    return tr;
}

async function criarLinhaTabelaCadastrar(local, listaJson, index){
    let tr = document.createElement("tr");

    let tdNome = document.createElement("td");

    let inputNome = document.createElement("input");
    inputNome.type = "text";
    inputNome.className = "nome-input";
    inputNome.id = "nome-input";
    inputNome.placeholder = "Nome";

    tdNome.appendChild(inputNome);

    let tdPermissao = document.createElement("td");

    let selectPermissao = document.createElement("select");

    // const responseGrupo = await request(api, "permissions", "GET", headerAuth, null);
    preencherSelectGrupo(selectPermissao, [{"level":0,"name":"ADM"},{"level":1,"name":"grupo1"},{"level":2,"name":"grupo2"}]);

    tdPermissao.appendChild(selectPermissao);

    let tdMac = document.createElement("td");
    tdMac.innerHTML = local.mac;

    let tdAcao = document.createElement("td");

    let botaoSalvar = document.createElement("button");
    botaoSalvar.innerHTML = "Salvar";
    botaoSalvar.addEventListener("click",  async () => {
        var dados = {
            "name":  inputNome.value,
            "mac": tdMac.innerHTML,
            "permission": selectPermissao.value
        }
        var jsonData = JSON.stringify(dados);
        
        // const response = await request(api, "locals", "POST", headerAuth, jsonData);

        mostrarMensagem("Salvo com sucesso");
        tr.remove();

        listaJson.splice(index, 1);

        localStorage.setItem("Sphynxs", JSON.stringify(listaJson));
    })

    tdAcao.appendChild(botaoSalvar);

    tr.appendChild(tdNome);
    tr.appendChild(tdPermissao);
    tr.appendChild(tdMac);
    tr.appendChild(tdAcao);

    return tr;
}