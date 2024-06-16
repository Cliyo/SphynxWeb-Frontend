import { findNewDevices } from "./finderFunctions/sphynxFinder.js";
import { headerAuth } from "./utils/headers.js";
import { request } from "./utils/requestHttp.js";
import { api } from "./utils/testeConexao.js";

const opcaoLocalVer = document.querySelector("#locais-menu-ver");
const opcaoLocalCadastrar = document.querySelector("#locais-menu-cadastrar");

const menuGeral = document.querySelector("#locais-ver");

const tabela = document.querySelector("tbody");

window.onload = async () => {
    tabela.innerHTML = "";
    const response = await request(api, "locals", "GET", headerAuth, null);

    response.forEach(local => {
        let linha = criarLinhaTabela(local, "mostrar");

        tabela.appendChild(linha);
    });

    findNewDevices(true);
}

opcaoLocalVer.addEventListener("click", async () => {
    if(!opcaoLocalVer.classList.contains("selecionado")){
        opcaoLocalVer.classList.toggle("selecionado");
        opcaoLocalCadastrar.classList.toggle("selecionado");

        tabela.innerHTML = "";

        const response = await request(api, "locals", "GET", headerAuth, null);

        response.forEach(local => {
            let linha = criarLinhaTabela(local, "mostrar");

            tabela.appendChild(linha);
        });
    }
    
})

opcaoLocalCadastrar.addEventListener("click", () => {
    if(!opcaoLocalCadastrar.classList.contains("selecionado")){
        opcaoLocalVer.classList.toggle("selecionado");
        opcaoLocalCadastrar.classList.toggle("selecionado");

        tabela.innerHTML = "";
        
        let json = localStorage.getItem("Sphynxs");
        let sphynxs = json ? JSON.parse(json) : [];
        console.log(sphynxs)
        sphynxs.forEach(sphynx => {
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

            let optionAluno = document.createElement("option");
            optionAluno.value = "aluno"
            optionAluno.innerHTML = "1 - Aluno";

            let optionProfessor = document.createElement("option");
            optionProfessor.value = "professor"
            optionProfessor.innerHTML = "1 - Professor";

            selectPermissao.appendChild(optionAluno);
            selectPermissao.appendChild(optionProfessor);

            tdPermissao.appendChild(selectPermissao);

            let tdMac = document.createElement("td");
            tdMac.innerHTML = sphynx.mac;

            let tdAcao = document.createElement("td");

            let botaoSalvar = document.createElement("button");
            botaoSalvar.innerHTML = "Salvar";
            botaoSalvar.addEventListener("click", () => {

            })

            tdAcao.appendChild(botaoSalvar);

            tr.appendChild(tdNome);
            tr.appendChild(tdPermissao);
            tr.appendChild(tdMac);
            tr.appendChild(tdAcao);

            tabela.append(tr);
        })
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

function criarLinhaTabela(local, tipo){
    let tr = document.createElement("tr");

    let tdNome = document.createElement("td");
    tdNome.id = "campo-nome";
    tdNome.innerHTML = "LAB10";

    let tdPermissao = document.createElement("td");
    tdPermissao.innerHTML = "1 - Aluno";

    let tdMac = document.createElement("td");
    tdMac.innerHTML = "11:11:11:11:11:11";

    let tdAcao = document.createElement("td");

    let botaoEditar = document.createElement("button");
    botaoEditar.id = "botao-editar"
    botaoEditar.innerHTML = "Editar";
    botaoEditar.addEventListener("click", () => {
        adicionarFuncaoEditarAoBotao(botaoEditar);
    })

    let botaoExcluir = document.createElement("button");
    botaoExcluir.innerHTML = "Excluir";

    tdAcao.appendChild(botaoEditar);
    tdAcao.appendChild(botaoExcluir);

    tr.appendChild(tdNome);
    tr.appendChild(tdPermissao);
    tr.appendChild(tdMac);
    tr.appendChild(tdAcao);

    return tr;
}
