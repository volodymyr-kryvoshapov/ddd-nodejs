'use strict';

const https = require('node:https');
const { Server } = require('ws');
const {console} = require('../services.js');
const { onConnection } = require('./ws.js');

module.exports = (routing, port, sslOptions) => {
  const server = https.createServer(sslOptions);
  const wss = new Server({ server });

  wss.on('connection', (connection, req) => onConnection(connection, req, routing));

  server.listen(port, () => {
    console.log(`WSS API on port ${port}`);
  });
};
