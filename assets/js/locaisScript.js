const opcaoLocalVer = document.querySelector("#locais-menu-ver");
const opcaoLocalCadastrar = document.querySelector("#locais-menu-cadastrar");

const menuGeral = document.querySelector("#locais-ver");

const tabela = document.querySelector("table");

opcaoLocalVer.addEventListener("click", () => {
    if(!opcaoLocalVer.classList.contains("selecionado")){
        opcaoLocalVer.classList.toggle("selecionado");
        opcaoLocalCadastrar.classList.toggle("selecionado");

        let tr = document.createElement("tr");

        let tdNome = document.createElement("td");
        tdNome.innerHTML = "LAB10";

        let tdPermissao = document.createElement("td");
        tdPermissao.innerHTML = "1 - Aluno";

        let tdMac = document.createElement("td");
        tdMac.innerHTML = "11:11:11:11:11:11";

        let tdAcao = document.createElement("td");

        let botaoEditar = document.createElement("button");
        botaoEditar.innerHTML = "Editar";

        let botaoExcluir = document.createElement("button");
        botaoExcluir.innerHTML = "Excluir";

        tdAcao.appendChild(botaoEditar);
        tdAcao.appendChild(botaoExcluir);

        tr.appendChild(tdNome);
        tr.appendChild(tdPermissao);
        tr.appendChild(tdMac);
        tr.appendChild(tdAcao);

        tabela.append(tr);
    }
    
})

opcaoLocalCadastrar.addEventListener("click", () => {
    if(!opcaoLocalCadastrar.classList.contains("selecionado")){
        opcaoLocalVer.classList.toggle("selecionado");
        opcaoLocalCadastrar.classList.toggle("selecionado");

        
    }
})