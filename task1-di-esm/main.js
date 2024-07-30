'use strict';

const fsp = require('node:fs').promises;
const path = require('node:path');
const config = require('./config.js');
const constants = require('./constants.js');
const logger = require(`./logger/${config.logger}.js`);
const hash = require('./hash.js');
const server = require(`./server/${config.transport}.js`);
const staticServer = require(getStaticServerPath(constants.transport, config.transport));
require('./db.js').init(config.storage.pg);
const db = require('./db.js')

const apiPath = path.join(process.cwd(), config.apiPath);
const routing = {};

(async () => {
  const files = await fsp.readdir(apiPath);
  for (const fileName of files) {
    if (!fileName.endsWith('.mjs')) continue;
    const filePath = path.join(apiPath, fileName);
    const serviceName = path.basename(fileName, '.mjs');
    const api = (await import(filePath)).default;
    routing[serviceName] = api(db, hash);
  }

  const sslOptions = {
    key: await fsp.readFile(path.resolve(config.sslOptions.key)),
    cert: await fsp.readFile(path.resolve(config.sslOptions.cert)),
  };

  staticServer(config.staticServer.path, config.staticServer.port, logger, sslOptions);
  server(routing, config.server.port, logger, sslOptions);
})();

function getStaticServerPath(transports, transport) {
  const server = [
      transports.HTTPS,
      transports.WSS,
  ].includes(transport) ? 'https' : 'http';

  return `./server-static/${server}.js`
}