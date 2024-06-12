function preencherSelectGrupo(select, lista){
    select.innerHTML = "";


    responseGrupo.forEach(grupo => {
        let option = document.createElement("option");
        option.value = grupo.level;
        option.innerHTML = grupo.name;

        select.appendChild(option);
    })
}

