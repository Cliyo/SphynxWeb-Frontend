import { headerAuth } from "./utils/headers.js";
import { request } from "./utils/requestHttp.js";
import { api } from "./utils/testeConexao.js";

const response = await request(api, `accessRegisters?date=${montarData()}`, "GET", headerAuth, null);

const coresLocais = ["#558BB2", "#214FA7", "#56ADA3", "#46C3D3", "#5a99a1", "#464646"];

const graficoAcessos = document.getElementById("grafico-acessos");
const quantidadeAcessos = document.querySelector("#quantidade-acessos");
quantidadeAcessos.innerHTML = `Acessos (Hoje): ${response.length}`;
const porcentagemAprovados = pegarPorcentagemAprovados(response);
const grauAprovados = transformarPorcentagemEmRad(porcentagemAprovados);
graficoAcessos.style.background = `conic-gradient(#8DB255 0deg ${grauAprovados}deg, #A72127 ${grauAprovados}deg 360deg)`;

const graficoLocais = document.getElementById("grafico-locais");
const melhoresLocais = pegarOsMelhoresCincoLocais(response);
const melhoresLocaisRadianos = melhoresLocais.map(([nome, contagem, porcentagem]) => [nome, contagem, porcentagem, transformarPorcentagemEmRad(porcentagem)])
criarLegendaRelatorioLocais(melhoresLocaisRadianos);

function montarData(){
    let data = new Date();

    let dia = data.getDate() < 10 ? `0${data.getDate()}` : data.getDate();
    let mes = (data.getMonth() + 1) < 10 ? `0${data.getMonth() + 1}` : data.getMonth() + 1;

    return data.getFullYear() + "-" + mes + "-" + dia;
}

// FUNCOES ACESSOS //
function pegarPorcentagemAprovados(response){
    let aprovados = response.filter(acesso => acesso.status === true);
    return (aprovados.length / response.length) * 100;
}

// FUNCOES DE LOCAIS //
function transformarPorcentagemEmRad(porcentagem){
    return (360 * porcentagem) / 100;
}

function pegarOsMelhoresCincoLocais(response){
    const contagem = {};

    response.forEach(objeto => {
        const nome = objeto.local.name;
        if (!contagem[nome]) {
            contagem[nome] = 0;
        }
        contagem[nome]++;
    });
    
    const listaDeContagem = Object.keys(contagem).map(nome => [nome, contagem[nome], (contagem[nome] / response.length) * 100]);
    listaDeContagem.sort((a, b) => b[1] - a[1]);

    return listaDeContagem.slice(0, 5);
}

function criarLegendaRelatorioLocais(lugares){
    let legendaContainer = document.querySelector("#legenda-grafico-locais");
    console.log(lugares)
    lugares.forEach((local, index) => {
        legendaContainer.innerHTML += `
            <div class="legenda-elemento-locais">
                <i class="fa-solid fa-square" style="color: ${coresLocais[index]};"></i>
                <p> ${local[0]} - ${local[1]} </p>
            </div>
        `
    });

    let angulos = lugares.map(local => local[3]);
    let total = angulos.reduce((acc, angulo) => acc + angulo, 0);
    angulos = angulos.map(angulo => (angulo / total) * 360);

    let acumulado = 0;
    const gradientes = angulos.map((angulo, index) => {
        const inicio = acumulado;
        acumulado += angulo;
        return `${coresLocais[index]} ${inicio}deg ${acumulado}deg`;
    }).join(', ');
    graficoLocais.style.background = `conic-gradient(${gradientes})`;
}