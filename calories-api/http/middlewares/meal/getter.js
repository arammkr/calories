const { asyncWrapper } = require('@utils');
const Meal= require('@models/meal');
const { NotFoundException } = require('@http/exceptions');

const mealGetterMiddlware = async (req, res, next) => {
  const { id } = req.params;
  const meal = await Meal.findByPk(id);

  if (!meal) {
    throw new NotFoundException(`Meal with given ID:${id} does not found`);
  }

  req.meal = meal;

  next();
};

module.exports = asyncWrapper(mealGetterMiddlware);
