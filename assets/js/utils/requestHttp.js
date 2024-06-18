import {mostrarMensagem} from "./messages.js";
async function request(api, entity, method, header, body = null, rawResponse = false) {
    try {
        const response = await fetch(`http://${api}/${entity}`, {
            mode: "cors",
            method: `${method}`,
            headers: header,
            body: body
        });

        if (rawResponse) {
            return response;
        }

        const data = await response.json();
        return data;
    } catch (err) {
        mostrarMensagem("Erro interno.");
    }
}

async function testConnection(apiUrls){
    for (const url of apiUrls){
        const response = await request (url, `online`, "get", {'Access-Control-Allow-Origin': `${window.location.hostname}`,'Access-Control-Allow-Credentials': 'true','Content-Type': 'application/json'}, null,  true)
            if (response){
                if(response.ok){
                    console.log(url)
                    return url
                }
            }
    }
}
export {request, testConnection};