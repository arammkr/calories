const Joi = require('joi');

const userDailyMealValidator = Joi.object()
  .keys({
    date: Joi.date().required(),
  }).unknown();

module.exports = userDailyMealValidator;
