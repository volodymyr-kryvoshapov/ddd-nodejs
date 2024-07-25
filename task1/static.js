'use strict';

const http = require('node:http');
const path = require('node:path');
const fs = require('node:fs');

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
module.exports = (root, port) => {
  http.createServer(async (req, res) => {
    const url = req.url === '/' ? '/index.html' : req.url;
    const filePath = path.join(root, url);
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    try {
      const data = await fs.promises.readFile(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data, 'utf-8');
    } catch (err) {
      res.statusCode = 404;
      res.end('"File is not found"');
    }
  }).listen(port);

  console.log(`Static on port ${port}`);
};
