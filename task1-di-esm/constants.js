module.exports = Object.freeze({
    transport: {
        HTTP: 'http',
        HTTPS: 'https',
        WS: 'ws',
        WSS: 'wss',
    },
    logger: {
        NATIVE: 'NativeLogger',
        PINO: 'PinoLogger',
    }
});
