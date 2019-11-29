const Joi = require('joi');
const config = require('@config');
const { userSchema } = require('../common');

const userSchemaRequired = Object.keys(userSchema).reduce((acc, key) => {
  acc[key] = userSchema[key].required();
  return acc;
}, {});

const userValidator = Joi.object()
  .keys({
    ...userSchemaRequired,
    role: Joi.string().valid(...config.get('roles')),
  });

module.exports = userValidator;
