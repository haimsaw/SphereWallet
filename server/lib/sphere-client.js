var Telnet = require('telnet-client');
var connection = new Telnet();

/* Example:

    let sc = new SphereClient('10.53.109.250', 11000);
    sphereResponse = await sc.sendToSphere('some message');
 */

export class SphereClient {
    constructor(host, port) {
        this.host = host;
        this.port = port;
    }

    async sendToSphere(message) {
        const params = {
            host: this.host,
            port: this.port,
            negotiationMandatory: false
        };
        let response;
        try {
            const prompt = await connection.connect(params);
            response = await connection.send(`${message}\r`);
            console.log('Received from server:', response);
        } catch (e) {
            consol.error('Error while communicating with Sphere:', e);
            throw e;
        }

        return response;
    }
}
