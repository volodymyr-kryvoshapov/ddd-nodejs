'use strict';

const http = require('node:http');
const path = require('node:path');
const fsp = require('node:fs').promises;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
};

const createServer = async (req, res, root) => {
  const url = req.url === '/' ? '/index.html' : req.url;
  const filePath = path.join(root, url);
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  try {
    const data = await fsp.readFile(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data, 'utf-8');
  } catch (err) {
    res.statusCode = 404;
    res.end('"File is not found"');
  }
};


module.exports = (root, port) => {
  http.createServer(async (req, res) => createServer(req, res, root)).listen(port);

  console.log(`Static HTTP on port ${port}`);
};

module.exports.createServer = createServer;
