'use strict';

const https = require('node:https');
const { Server } = require('ws');
const { onConnection } = require('./ws.js');

module.exports = (routing, port, logger, sslOptions) => {
  const server = https.createServer(sslOptions);
  const wss = new Server({ server });

  wss.on('connection', (connection, req) => onConnection(connection, req, routing, logger));

  server.listen(port, () => {
    logger.log(`WSS API on port ${port}`);
  });
};
