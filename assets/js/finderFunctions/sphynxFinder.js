import { IP } from "../dashboardScript.js"

async function finder(){
    const response = await fetch(`http://${IP}:3000/sphynx`, {
        mode: "cors",
        method: "GET",
        headers: {
            'Access-Control-Allow-Origin': `http://${IP}:3000`,
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        console.error("Não foi possível pegar os dispositivos")
    }

    const data = await response.json();
    return data;
}

async function turnsEspInWebsocket(data) {
    let arrayEsp = [];

    let connectionPromises = data.map(async esp => {
        try {
            let ws = new WebSocket(`ws://${esp.ip}/ws`);

            let messagePromise = new Promise((resolve, reject) => {
                ws.onmessage = event => {
                    if (event.data === "data") {
                        arrayEsp.push(ws);
                        resolve();
                    }
                };
                ws.onerror = reject;
                ws.onclose = () => {
                    reject(new Error("Conexão com o WebSocket fechada"));
                };
            });

            await messagePromise;

        } catch (error) {
            console.error("Erro: ", error);
        }
    });

    await Promise.all(connectionPromises);

    return arrayEsp;
}

export {finder, turnsEspInWebsocket};