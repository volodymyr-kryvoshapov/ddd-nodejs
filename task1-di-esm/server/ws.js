'use strict';

const { Server } = require('ws');

const onConnection = (connection, req, routing, logger) => {
  const ip = req.socket.remoteAddress;

  connection.on('message', async (message) => {
    const obj = JSON.parse(message);
    const { name, method, args = [] } = obj;
    const entity = routing[name];
    if (!entity) {
      connection.send('"Not found"', { binary: false });
      return;
    }
    const handler = entity[method];
    if (!handler) {
      connection.send('"Not found"', { binary: false });
      return;
    }
    const json = JSON.stringify(args);
    const parameters = json.substring(1, json.length - 1);
    logger.log(`${ip} ${name}.${method}(${parameters})`);
    try {
      const result = await handler(...args);
      connection.send(JSON.stringify(result.rows), { binary: false });
    } catch (err) {
      logger.error(err);
      connection.send('"Server error"', { binary: false });
    }
  });
}

module.exports = (routing, port, logger) => {
  const ws = new Server({ port });

  ws.on('connection', (connection, req) => onConnection(connection, req, routing, logger));

  logger.log(`WS API on port ${port}`);
};

module.exports.onConnection = onConnection;
