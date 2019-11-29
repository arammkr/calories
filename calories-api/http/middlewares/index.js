const corsMiddleware = require('./cors');
const validatorMiddleware = require('./validator');
const internalServerError = require('./internalServerError');
const authMiddleware = require('./auth');
const aclMiddleware = require('./acl');
const mealGetterMiddleware = require('./meal/getter');
const isMealOwnerMiddlware = require('./meal/is-owner');
const userGetterMiddlware = require('./user/getter');

module.exports = {
  authMiddleware,
  corsMiddleware,
  validatorMiddleware,
  internalServerError,
  aclMiddleware,
  mealGetterMiddleware,
  isMealOwnerMiddlware,
  userGetterMiddlware,
};
