const Joi = require('joi');
const config = require('@config');
const { userSchema } = require('../common');

const userValidator = Joi.object()
  .keys({
    ...userSchema,
    role: Joi.string().valid(...config.get('roles')),
  });

module.exports = userValidator;
