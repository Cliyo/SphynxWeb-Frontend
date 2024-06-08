const opcaoLocalVer = document.querySelector("#locais-menu-ver");
const opcaoLocalCadastrar = document.querySelector("#locais-menu-cadastrar");

const menuGeral = document.querySelector("#locais-ver");

const tabela = document.querySelector("tbody");

opcaoLocalVer.addEventListener("click", () => {
    if(!opcaoLocalVer.classList.contains("selecionado")){
        opcaoLocalVer.classList.toggle("selecionado");
        opcaoLocalCadastrar.classList.toggle("selecionado");

        tabela.innerHTML = "";

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

        tabela.innerHTML = "";

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
        tdMac.innerHTML = "11:11:11:11:11:11";

        let tdAcao = document.createElement("td");

        let botaoSalvar = document.createElement("button");
        botaoSalvar.innerHTML = "Salvar";

        tdAcao.appendChild(botaoSalvar);

        tr.appendChild(tdNome);
        tr.appendChild(tdPermissao);
        tr.appendChild(tdMac);
        tr.appendChild(tdAcao);

        tabela.append(tr);
    }
})