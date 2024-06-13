import {request} from "./utils/requestHttp.js";
import {api} from "./utils/testeConexao.js";
import {headerAuth} from "./utils/headers.js";

const tabela = document.querySelector("tbody");

const legendaQntAcessos = document.querySelector("#legenda-quantidade-acessos");
let qntAcessos = 0;

window.onload = async () => {
    const response = await request(api, "accessRegisters", "GET", headerAuth, null);

    tabela.innerHTML = "";
    response.forEach(acesso => {
        tabela.appendChild(criarLinhaTabela(acesso))
    });
    
    qntAcessos = response.length;
    legendaQntAcessos.innerHTML = `Total: ${qntAcessos} acesso(s)`;
}

function criarLinhaTabela(acesso){
    let tr = document.createElement("tr");

    let tdNome = document.createElement("td");
    tdNome.innerHTML = acesso.consumer.name;
    
    let tdRa = document.createElement("td");
    tdRa.innerHTML = acesso.consumer.ra;

    let tdLocal = document.createElement("td");
    tdLocal.innerHTML = acesso.local.name;

    let tdData = document.createElement("td");
    tdData.innerHTML = acesso.date;

    let tdSituacao = document.createElement("td");
    tdSituacao.innerHTML = acesso.status == true ? "Aprovado" : "Negado";

    tr.appendChild(tdNome);
    tr.appendChild(tdRa);
    tr.appendChild(tdLocal);
    tr.appendChild(tdData);
    tr.appendChild(tdSituacao);

    return tr;
}
