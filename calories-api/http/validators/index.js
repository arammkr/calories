const loginValidator = require('./auth/login');
const signUpValidator = require('./auth/signup');
const userUpdateValidator = require('./user/user-update');
const userAddValidator = require('./user/user-add');
const userSearchValidator = require('./user/user-search');
const userDailyMealValidator = require('./user/user-daily-meals');
const mealValidator = require('./meal/meal');
const dateRangeValidator = require('./common/date-range');

module.exports = {
  loginValidator,
  signUpValidator,
  userAddValidator,
  userUpdateValidator,
  userSearchValidator,
  mealValidator,
  dateRangeValidator,
  userDailyMealValidator,
};
