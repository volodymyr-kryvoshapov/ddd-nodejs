module.exports = {
    transport: 'ws', // http, ws,
    apiPath: './api',
    server: {
        port: 8001,
    },
    staticServer: {
        port: 8000,
        path: './static',
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