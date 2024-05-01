import { api } from "../dashboardScript.js";
import request from "../utils/requestHttp.js";
import {header, language} from "../dashboardScript.js"

const finderAPI = 'sphynx-finder.local'

async function finderServices(){
    const response = await fetch(`http://${finderAPI}/services`, {
        mode: "cors",
        method: "GET",
        headers: {
            'Access-Control-Allow-Origin': `http://${finderAPI}`,
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type': 'application/json'
        }
    });

    return response;
}

async function finderScan(){
    const response = await fetch(`http://${finderAPI}/scan`, {
        mode: "cors",
        method: "GET",
        headers: {
            'Access-Control-Allow-Origin': `http://${finderAPI}`,
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type': 'application/json'
        }
    });

    return response;
}

async function finder(type){
    var response = null;
    if (type == "scan"){
        response = await finderScan();
    }else{
        response = await finderServices();
    }

    if (!response.ok) {
        console.error("Não foi possível pegar os dispositivos")
    }

    const data = await response.json();
    return data;
}

async function inDatabase(){
    // GET ALL THE ESP32 //
    const sphynxs = [];

    // GET ALL THE MAC IN DATABASE //
    const reqData = await request(api, `local`, "GET", header, null);

    let array = Object.keys(reqData);
    
    array.forEach(index => {
        sphynxs.push(reqData[index]["mac"])       
    })

    return sphynxs;
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

export {finder, inDatabase, turnsEspInWebsocket};