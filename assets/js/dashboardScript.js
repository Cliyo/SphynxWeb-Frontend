import { headerAuth } from "./utils/headers.js";
import { request } from "./utils/requestHttp.js";
import { api } from "./utils/testeConexao.js";

const graficoAcessos = document.getElementById("grafico-acessos");
const quantidadeAcessos = document.querySelector("#quantidade-acessos");

const response = await request(api, `accessRegisters?date=${montarData()}`, "GET", headerAuth, null);

quantidadeAcessos.innerHTML = `Acessos (Hoje): ${response.length}`;
graficoAcessos.style.background = `conic-gradient(#ff0000 0deg ${(360 * (pegarPorcentagemAprovados())) / 100}, #1eff00 ${(360 * (pegarPorcentagemAprovados())) / 100} 360deg)`

function montarData(){
    let data = new Date();

    let dia = data.getDate() < 10 ? `0${data.getDate()}` : data.getDate();
    let mes = (data.getMonth() + 1) < 10 ? `0${data.getMonth() + 1}` : data.getMonth() + 1;

    return data.getFullYear() + "-" + mes + "-" + dia;
}

function pegarPorcentagemAprovados(){
    let aprovados = response.filter(acesso => acesso.status == true);

    return (aprovados / response.length)  * 100;
}