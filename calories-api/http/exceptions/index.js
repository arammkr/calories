const NotFoundException = require('./not-found');
const ForbiddenException = require('./forbidden');
const DublicateDataException = require('./dublicate-data');
const AuthException = require('./auth');
const InvalidParameterException = require('./invalid-parameters');

module.exports = {
  NotFoundException,
  ForbiddenException,
  DublicateDataException,
  AuthException,
  InvalidParameterException,
};
