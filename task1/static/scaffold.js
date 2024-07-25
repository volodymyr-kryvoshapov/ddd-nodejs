import { apiScheme } from "./config.js";

const scaffoldSchemes = {
    [apiScheme.HTTP]: scaffoldHttp,
    [apiScheme.WS]: scaffoldWs,
};

export async function scaffold(url, structure) {
    const scheme = getURLScheme(url);

    if (!scaffoldSchemes[scheme]) {
        throw new Error(`Unknown scheme: ${scheme}`);
    }

    return scaffoldSchemes[scheme](url, structure);
}

function getURLScheme(url) {
    return url.split('://')[0];
}

function scaffoldWs(url, structure) {
    const socket = new WebSocket(url);
    const api = {};
    const services = Object.keys(structure);
    
    for (const serviceName of services) {
        api[serviceName] = {};
        const service = structure[serviceName];
        const methods = Object.keys(service);
        for (const methodName of methods) {
            api[serviceName][methodName] = (...args) => new Promise((resolve) => {
                const packet = { name: serviceName, method: methodName, args };
                socket.send(JSON.stringify(packet));
                socket.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    resolve(data);
                };
            });
        }
    }

    return new Promise((resolve, reject) => {
        socket.onopen = () => resolve(api);
        socket.onerror = reject;
    });
}

function scaffoldHttp(url, structure) {
    const api = {};
    const services = Object.keys(structure);
    
    for (const serviceName of services) {
        api[serviceName] = {};
        const service = structure[serviceName];
        const methods = Object.keys(service);
        for (const methodName of methods) {
            api[serviceName][methodName] = async (...args) => {
                const requiredArgs = structure[serviceName][methodName];
                let fullUrl = `${url}${serviceName}/${methodName}`;

                if (requiredArgs.includes('id')) {
                    fullUrl += `/${args.shift()}`;
                }

                const response = await fetch(fullUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: serviceName, method: methodName, args }),
                });
                return await response.json();
            };
        }
    }

    return api;
}
