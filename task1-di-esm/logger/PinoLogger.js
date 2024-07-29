'use strict';

const util = require('node:util');
const path = require('node:path');
const pino = require('pino');

class PinoLogger {
  constructor(logPath) {
    this.path = logPath;
    const date = new Date().toISOString().substring(0, 10);
    const filePath = path.join(logPath, `${date}.log`);
    this.regexp = new RegExp(path.dirname(this.path), 'g');
    this.pino = pino(pino.destination(filePath))
  }

  close() {
  }

  write(type = 'info', s) {
    const out = s.replace(/[\n\r]\s*/g, '; ');
    this.pino?.[type](out);
  }

  log(...args) {
    const msg = util.format(...args);
    this.write('info', msg);
  }

  dir(...args) {
    const msg = util.inspect(...args);
    this.write('info', msg);
  }

  debug(...args) {
    const msg = util.format(...args);
    this.write('debug', msg);
  }

  error(...args) {
    const msg = util.format(...args).replace(/[\n\r]{2,}/g, '\n');
    this.write('error', msg.replace(this.regexp, ''));
  }

  system(...args) {
    const msg = util.format(...args);
    this.write('warn', msg);
  }

  access(...args) {
    const msg = util.format(...args);
    this.write('fatal', msg);
  }
}

module.exports = new PinoLogger('./log');
