'use strict';

const https = require('node:https');
const { createServer } = require('./http.js');

module.exports = (routing, port, logger, sslOptions) => {
  https
    .createServer(sslOptions, (req, res) => createServer(req, res, routing, logger))
    .listen(port);

  logger.log(`HTTPS API on port ${port}`);
};
