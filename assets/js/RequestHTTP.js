class RequestHTTP{
    constructor(ip, entity, method, header, body){
        this.ip = ip;
        this.method = method;
        this.entity = entity;
        this.header = header
        this.body = body;
    }

    async request(){
        let response;

        await fetch(`http://${this.ip}:8080/${this.entity}`, {
            mode: "cors",
            method: `${this.method}`,
            headers: this.header,
            body: this.body
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
}

export default RequestHTTP;