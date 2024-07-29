
const config = require('./config.js');
const constants = require('./constants.js');
const logger = require(`./logger/${config.logger}.js`);
const db = require('./db.js');
const hash = require('./hash.js');

module.exports = {
    config: Object.freeze(config),
    constants: Object.freeze(constants),
    console: Object.freeze(logger),
    db: Object.freeze(db),
    common: { hash },
};
