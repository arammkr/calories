const Joi = require('joi');

const userSchema = {
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).error(errors => {
    errors.forEach(err => {
      switch (err.type) {
      case 'string.regex.base':
        err.message = 'Password should contain atleast one upper character, one number and one special character';
        break;
      default:
        break;
      }
    });
    return errors;
  }),
  caloriesPerDay: Joi.number().min(1000).max(6000),
  nick: Joi.string().min(4).max(16),
};

module.exports = {
  userSchema,
};
