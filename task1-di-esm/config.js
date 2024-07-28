const constants = require('./constants');

module.exports = {
    transport: constants.transport.WSS,
    apiPath: './api',
    server: {
        port: 8001,
    },
    staticServer: {
        port: 8000,
        path: './static',
    },
    sslOptions: {
        key: './ssl/localhost-key.pem',
        cert: './ssl/localhost-cert.pem',
    },
    storage: {
        pg: {
            host: '127.0.0.1',
            port: 5432,
            database: 'example',
            user: 'marcus',
            password: 'marcus',
        }
    }
};