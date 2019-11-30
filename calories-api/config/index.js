require('dotenv').config();
const path = require('path');
const nconf = require('nconf');
const dbConfig = require('./database');

nconf
  .argv()
  .file('base', path.join(__dirname, 'config.json'))
  .file('acl', path.join(__dirname, 'acl.json'))
  .env();

nconf.set('db', dbConfig);

module.exports = nconf;
