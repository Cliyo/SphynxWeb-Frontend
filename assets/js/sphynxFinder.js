import { IP } from "./dashboardScript.js"
const arrayEsp = [];

async function finder(){
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
    })
}

export default finder;