const { createSuccessResponse, asyncWrapper } = require('@utils');
const Meal= require('@models/meal');

/**
 * create - create new meal with given data
 * @param {Object} req 
 * @param {Object} res 
 */
async function create(req, res) {
  const mealData = { ...req.body, userId: req.auth.id };
  const meal = await Meal.create(mealData);

  return createSuccessResponse(res, { meal });
}

/**
 * get - 
 * @param {Object} req 
 * @param {Object} res 
 */
async function get(req, res) {
  return createSuccessResponse(res, { meal: req.meal });
}

async function update(req, res) {
  const meal = await req.meal.update(req.body);

  return createSuccessResponse(res, { meal });
}

async function deleteMeal(req, res) {
  await req.meal.destroy();

  return createSuccessResponse(res, { meal: req.meal });
}

module.exports = {
  create: asyncWrapper(create),
  get: asyncWrapper(get),
  update: asyncWrapper(update),
  delete: asyncWrapper(deleteMeal),
};
