function preencherSelectGrupo(select, lista){
    lista.forEach(grupo => {
        let option = document.createElement("option");
        option.value = grupo.level;
        option.innerHTML = grupo.name;

        select.appendChild(option);
    })
}

export {preencherSelectGrupo}

