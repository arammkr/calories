const Joi = require('joi');
const { createInvalidParameterResponse, isFunction } = require('@utils');

/**
 * @param {Object | Function} schemaFactory
 * @param {null | function} data
 * @returns {function(*, *, *): {isValid: boolean, dataToValidate: *, errors: (*|{})}}
 */
function validator(schemaFactory, dataGetter = null) {
  return (req, res, next) => {
    const dataToValidate = dataGetter && isFunction(dataGetter)
      ? dataGetter(req, res)
      : req.body;

    const schema = isFunction(schemaFactory) ? schemaFactory() : schemaFactory;
    const { error } = Joi.validate(dataToValidate, schema, {
      abortEarly: false,
    });

    const isValid = !error;
    if (!isValid) {
      return createInvalidParameterResponse(res, error);
    }

    return next();
  };
}

module.exports = validator;
