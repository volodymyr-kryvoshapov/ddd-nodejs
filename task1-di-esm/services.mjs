import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const services = require('./services.js');

const {
    db,
    common,
    config,
    constants,
    console,
} = services;

export {
    db,
    common,
    config,
    constants,
    console,
};
