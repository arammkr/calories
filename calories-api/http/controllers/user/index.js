const config = require('@config');
const { InvalidParameterException } = require('@http/exceptions');
const User = require('@db/models/user');
const Meal = require('@db/models/meal');
const { sequelize } = require('@db');
const UserRole = require('@db/models/user-role');
const { isEmailExist, isNickExist } = require('@utils/helpers');
const { 
  createSuccessResponse, 
  asyncWrapper, 
  cleanUser, 
  dateDiff, 
  timeDiff, 
} = require('@utils');

/**
 * @param {Object} user 
 * @throws Exception
 */
async function checkUniqueUserFields(user) {
  await isEmailExist(user.email);
  await isNickExist(user.nick);
}

/**
 * create - check if mail and nick are unique, adds user with given role
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
async function create(req, res) {
  const { role, ...user } = req.body;
  await checkUniqueUserFields(user);

  const newUser = await User.create({
    ...user,
    role: { role },
  }, {
    include: [{ model: UserRole, 'as': 'role' }],
  });

  return createSuccessResponse(res, { user: cleanUser(newUser) });
}

/**
 * get - fetch user with given id
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
async function get(req, res) {
  return createSuccessResponse(res, { user: req.user });
}

/**
 * update - check if mail and nick are unique and updates user data and role with given id
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
async function update(req, res) {
  const ROLE_WEIGHT = config.get('ROLE_WEIGHT');
  const { role, ...user } = req.body;

  if (ROLE_WEIGHT[role] > ROLE_WEIGHT[req.auth.role.role]) {
    throw new InvalidParameterException('You are not allowed to update role', 403);
  }

  await checkUniqueUserFields(user);

  await req.user.update(user);
  role && await req.user.role.update({ role });

  return createSuccessResponse(res, { user: cleanUser(req.user) });
}

/**
 * deleteUser - delete user with given id
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
async function deleteUser(req, res) {
  await req.user.destroy();
  
  return createSuccessResponse(res, { user: req.user });
}

/**
 * search - search users by firstName and lastName, limit equal 10
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
async function search(req, res) {

  const where = sequelize.where(
    sequelize.fn('concat', sequelize.col('firstName'), sequelize.col('lastName')), {
      like: `%${req.query.q}%`,
    });

  const users = await User.findAll({
    where,
    limit: 10,
  });
  
  return createSuccessResponse(res, { users });
}

/**
 * meals - fetch user spent calories in given date and time range
 * e.g. how much calories have I had for lunch each day in the last month if lunch is between 12 and 15h
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
async function meals(req, res) {
  const { id: userId } = req.params;
  const { from, to, timeStart, timeEnd } = req.query;

  if (from && dateDiff(from, to) > config.get('MAX_ALLOWED_DATE_DIFF')) {
    throw new InvalidParameterException(`Max allowed date difference is ${config.get('MAX_ALLOWED_DATE_DIFF')} days`);
  }
  
  if (timeStart && timeDiff(timeStart, timeEnd) <= 0) {
    throw new InvalidParameterException(`end time should be greate than start time`);
  }

  const data = await Meal.findUserMealsInGivenRange(userId, from, to, timeStart, timeEnd);

  return createSuccessResponse(res, { data });
}


/**
 * meals - fetch user spent calories in given date and time range
 * e.g. how much calories have I had for lunch each day in the last month if lunch is between 12 and 15h
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
async function nutritionAverage(req, res) {
  const { id: userId } = req.params;
  const { from, to, timeStart, timeEnd } = req.query;

  if (from && dateDiff(from, to) > config.get('MAX_ALLOWED_DATE_DIFF')) {
    throw new InvalidParameterException(`Max allowed date difference is ${config.get('MAX_ALLOWED_DATE_DIFF')} days`);
  }
  
  if (timeStart && timeDiff(timeStart, timeEnd) <= 0) {
    throw new InvalidParameterException(`end time should be greate than start time`);
  }

  const data = await Meal.findUserMealNutritionAverageInGivenRange(userId, from, to, timeStart, timeEnd);

  return createSuccessResponse(res, { data });
}

/**
 * getMealsForSpecificDay - get user meals for specific day
 * e.g. how much calories have I had for lunch each day in the last month if lunch is between 12 and 15h
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
async function getMealsForSpecificDay(req, res) {
  const { id: userId, date } = req.params;

  const data = await Meal.findAll({
    where: { userId, date },
    order: [['time', 'DESC']],
  });

  return createSuccessResponse(res, data);
}



module.exports = {
  create: asyncWrapper(create),
  get: asyncWrapper(get),
  update: asyncWrapper(update),
  delete: asyncWrapper(deleteUser),
  search: asyncWrapper(search),
  meals: asyncWrapper(meals),
  nutritionAverage: asyncWrapper(nutritionAverage),
  getMealsForSpecificDay: asyncWrapper(getMealsForSpecificDay),
};
