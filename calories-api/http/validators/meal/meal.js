const Joi = require('joi');
const dayjs = require('dayjs');

const mealValidator = () => Joi.object()
  .keys({
    name: Joi.string().required(),
    calories: Joi.number().min(0).required(),
    carbs: Joi.number().allow(null),
    fat: Joi.number().allow(null),
    protein: Joi.number().allow(null),
    userId: Joi.number().allow(null),
    date: Joi.date().max(dayjs().format('YYYY-MM-DD')).required(),
    time: Joi.string().regex(/^([0-9]{2}):([0-9]{2})$/).required(),
  });

module.exports = mealValidator;
