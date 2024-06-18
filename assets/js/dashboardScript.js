import { headerAuth } from "./utils/headers.js";
import { request } from "./utils/requestHttp.js";
import { api } from "./utils/testeConexao.js";

const quantidadeAcessos = document.querySelector("#quantidade-acessos");

const response = await request(api, `accessRegister?date=${montarData()}`, "GET", headerAuth, null);

quantidadeAcessos.innerHTML = `Acessos (Hoje): ${response.length}`;

function montarData(){
    let data = new Date();

    return data.getFullYear() + "-" + (data.getMonth() + 1) + "-" + (data.getDate());
}