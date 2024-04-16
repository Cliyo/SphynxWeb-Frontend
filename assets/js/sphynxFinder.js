const arrayEsp = [];

async function finder(){
    fetch(`http://localhost:3000`, {
        mode: "cors",
        method: "GET",
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        data.forEach(esp => {
            let ws = new WebSocket(`ws://${esp.ip}/ws`);
            ws.onmessage = (data) => {
                if(data.data == "$2a$12$X9my8HHbMJYk6y04FnR6ie1B/WnLOlBAeEMRhEOvt.8z/OmOR6kLS"){
                    arrayEsp.push(ws);
                }
            }
        });

        return arrayEsp;
    })
}

export default finder;