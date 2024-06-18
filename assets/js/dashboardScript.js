import { headerAuth } from "./utils/headers.js";
import { request } from "./utils/requestHttp.js";
import { api } from "./utils/testeConexao.js";

const quantidadeAcessos = document.querySelector("#quantidade-acessos");

const response = await request(api, `accessRegisters?date=${montarData()}`, "GET", headerAuth, null);

quantidadeAcessos.innerHTML = `Acessos (Hoje): ${response.length}`;

function montarData(){
    let data = new Date();

    let dia = data.getDate() < 10 ? `0${data.getDate()}` : data.getDate();
    let mes = (data.getMonth() + 1) < 10 ? `0${data.getMonth() + 1}` : data.getMonth() + 1;

    return data.getFullYear() + "-" + mes + "-" + dia;
}