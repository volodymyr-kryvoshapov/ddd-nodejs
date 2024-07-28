import { config } from './config.js';
import { scaffold } from './scaffold.js';

const api = await scaffold(config.apiUrl, config.apiStructure);

globalThis.api = api;

const data = await api.user.read(3);
console.log(data);
