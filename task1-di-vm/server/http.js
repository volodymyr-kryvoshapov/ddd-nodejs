'use strict';

const http = require('node:http');

const createServer = async (req, res, routing) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const { url, socket } = req;
  const [name, method, id] = url.substring(1).split('/');
  const entity = routing[name];
  if (!entity) return void res.end('Not found');
  const handler = entity[method];
  if (!handler) return void res.end('Not found');
  const src = handler.toString();
  const signature = src.substring(0, src.indexOf(')'));
  const args = [];
  if (signature.includes('(id')) args.push(id);
  if (signature.includes('{')) args.push(await receiveArgs(req));
  console.log(`${socket.remoteAddress} ${method} ${url}`);
  const result = await handler(...args);
  res.end(JSON.stringify(result.rows));
}

const receiveArgs = async (req) => {
  const buffers = [];
  for await (const chunk of req) buffers.push(chunk);
  const data = Buffer.concat(buffers).toString();
  return JSON.parse(data);
}

module.exports = (routing, port) => {
  http.createServer((req, res) => createServer(req, res, routing)).listen(port);

  console.log(`HTTP API on port ${port}`);
};

module.exports.createServer = createServer;