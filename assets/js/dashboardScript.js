import { headerAuth } from "./utils/headers.js";
import { request } from "./utils/requestHttp.js";
import { api } from "./utils/testeConexao.js";

const graficoAcessos = document.getElementById("grafico-acessos");
const quantidadeAcessos = document.querySelector("#quantidade-acessos");

const response = await request(api, `accessRegisters?date=${montarData()}`, "GET", headerAuth, null);

quantidadeAcessos.innerHTML = `Acessos (Hoje): ${response.length}`;
const porcentagemAprovados = pegarPorcentagemAprovados(response);
const grauAprovados = (360 * porcentagemAprovados) / 100;
graficoAcessos.style.background = `conic-gradient(#8DB255 0deg ${grauAprovados}deg, #A72127 ${grauAprovados}deg 360deg)`;

function montarData(){
    let data = new Date();

    let dia = data.getDate() < 10 ? `0${data.getDate()}` : data.getDate();
    let mes = (data.getMonth() + 1) < 10 ? `0${data.getMonth() + 1}` : data.getMonth() + 1;

    return data.getFullYear() + "-" + mes + "-" + dia;
}

function pegarPorcentagemAprovados(response){
    let aprovados = response.filter(acesso => acesso.status === true);
    return (aprovados.length / response.length) * 100;
}