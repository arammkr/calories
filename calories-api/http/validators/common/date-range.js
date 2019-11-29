const Joi = require('joi');
const dayjs = require('dayjs');

const getDateRangeValidator = () => Joi.object().keys({
  from: Joi
    .date()
    .less(Joi.ref('to')),
  to: Joi
    .date()
    .greater(Joi.ref('from'))
    .max(dayjs().format('YYYY-MM-DD')),
  timeStart: Joi.string().regex(/^([0-9]{2}):([0-9]{2})$/),
  timeEnd: Joi.string().regex(/^([0-9]{2}):([0-9]{2})$/),
}).with('from', 'to')
  .with('timeStart', 'timeEnd');

module.exports = getDateRangeValidator;
