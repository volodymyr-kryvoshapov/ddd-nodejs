'use strict';

const https = require('node:https');
const { createServer } = require('./http.js');

module.exports = (root, port, sslOptions) => {
  https.createServer(sslOptions, async (req, res) => createServer(req, res, root)).listen(port);

  console.log(`Static HTTPS on port ${port}`);
};
