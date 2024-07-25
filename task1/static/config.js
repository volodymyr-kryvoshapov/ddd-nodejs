export const config = Object.freeze({
    apiUrl: 'http://127.0.0.1:8001/',
    // apiUrl: 'ws://127.0.0.1:8001/',
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
