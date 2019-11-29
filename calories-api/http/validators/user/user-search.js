const Joi = require('joi');

const userSearchValidator = Joi.object()
  .keys({
    q: Joi.string().trim().min(2).required(),
  });

module.exports = userSearchValidator;
