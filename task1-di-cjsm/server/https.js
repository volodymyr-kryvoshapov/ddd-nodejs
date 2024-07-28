'use strict';

const https = require('node:https');
const { createServer } = require('./http.js');

module.exports = (routing, port, sslOptions) => {
  https
    .createServer(sslOptions, (req, res) => createServer(req, res, routing))
    .listen(port);

  console.log(`HTTPS API on port ${port}`);
};
