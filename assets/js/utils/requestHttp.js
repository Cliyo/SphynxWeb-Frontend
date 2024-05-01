async function request(api, entity, method, header, body){
    let response;

    await fetch(`http://${api}/${entity}`, {
        mode: "cors",
        method: `${method}`,
        headers: header,
        body: body
    })
    .then(response => {
        return response.json();          
    })
    .then(data => {
        response = data;
    })
    .catch(err => {
        console.log(err);
    })

    return response;
}

export default request;