const AuthExceprion = require('@http/exceptions/auth');
const jwt = require('jsonwebtoken');
const config = require('@config');

module.exports = (req, res, next) => {
  const token = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    throw new AuthExceprion('Token is required');
  }

  try {
    req.auth = jwt.verify(token, config.get('JWT_KEY'));
  } catch(err) {
    throw new AuthExceprion('Invalid token');
  }

  next();
};
