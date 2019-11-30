const Joi = require('joi');
const { userSchema } = require('../common');

const signUpValidator = Joi.object()
  .keys(userSchema);

module.exports = signUpValidator;
