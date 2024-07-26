export const transport = {
    HTTP: 'http',
    HTTPS: 'https',
    WS: 'ws',
    WSS: 'wss',
};

export const config = Object.freeze({
    apiUrl: `${transport.WS}://127.0.0.1:8001/`,
    apiStructure: {
        user: {
            create: ['record'],
            read: ['id'],
            update: ['id', 'record'],
            delete: ['id'],
            find: ['mask'],
        },
        country: {
            read: ['id'],
            delete: ['id'],
            find: ['mask'],
        },
    },
});
