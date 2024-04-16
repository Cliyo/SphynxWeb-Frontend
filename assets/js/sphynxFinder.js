import { IP } from "./dashboardScript.js"

async function finder(){
    let result;
    fetch(`http://${IP}:3000`, {
        mode: "cors",
        method: "GET",
        headers: {
            'Access-Control-Allow-Origin': `http://${IP}:3000`,
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        result = data;
    })

    return result;
}

async function validateEsp(data){
    let arrayEsp = [];

    data.forEach(esp => {
        try{
            let ws = new WebSocket(`ws://${esp.ip}/ws`);
            ws.onmessage = (data) => {
                if(data.data == "$2a$12$X9my8HHbMJYk6y04FnR6ie1B/WnLOlBAeEMRhEOvt.8z/OmOR6kLS"){
                    arrayEsp.push(esp);
                }
            }
        } catch(error){
            console.error("Error: ", error);
        }
        
    });

    return arrayEsp;
}

async function validateEspAndReturnWebsocket(data){
    let arrayEsp = [];

    data.forEach(esp => {
        try{
            let ws = new WebSocket(`ws://${esp.ip}/ws`);
            ws.onmessage = (data) => {
                if(data.data == "$2a$12$X9my8HHbMJYk6y04FnR6ie1B/WnLOlBAeEMRhEOvt.8z/OmOR6kLS"){
                    arrayEsp.push(ws);
                }
            }
        } catch(error){
            console.error("Error: ", error);
        }
        
    });

    return arrayEsp;
}

export {finder, validateEsp, validateEspAndReturnWebsocket};