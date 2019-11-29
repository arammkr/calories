const Sequelize = require('sequelize');
const dayjs = require('dayjs');
const config = require('@config');
const { sequelize, DataTypes } = require('..');

const MAX_ALLOWED_DATE_DIFF = config.get('MAX_ALLOWED_DATE_DIFF');
const { Op } = Sequelize;

const Meals = sequelize.define('Meals', {
  name: DataTypes.STRING,
  calories: DataTypes.SMALLINT.UNSIGNED,
  carbs: DataTypes.SMALLINT.UNSIGNED,
  fat: DataTypes.SMALLINT.UNSIGNED,
  protein: DataTypes.SMALLINT.UNSIGNED,
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  date: DataTypes.DATEONLY,
  time: DataTypes.TIME,
}, {});

Meals.findUserMealsInGivenRange = async function(
  userId, 
  from = dayjs().subtract(MAX_ALLOWED_DATE_DIFF, 'day').format('YYYY-MM-DD'), 
  to = dayjs().format('YYYY-MM-DD'), 
  timeStart, 
  timeEnd,
) {
  const where = Object.assign(
    { userId },
    from && { date: { [Op.between]: [from, to] } },
    timeStart && { time: { [Op.between]: [timeStart, timeEnd] } }
  );

  return await this.findAll({
    attributes: ['date', [sequelize.fn('sum', sequelize.col('calories')), 'sum']],
    group : ['Meals.date'],
    where,
    raw: true,
    order: sequelize.literal('date ASC'),
  });
};

Meals.findUserMealNutritionAverageInGivenRange = async function(
  userId, 
  from = dayjs().subtract(MAX_ALLOWED_DATE_DIFF, 'day').format('YYYY-MM-DD'), 
  to = dayjs().format('YYYY-MM-DD'), 
  timeStart, 
  timeEnd,
) {
  const where = Object.assign(
    { userId },
    from && { date: { [Op.between]: [from, to] } },
    timeStart && { time: { [Op.between]: [timeStart, timeEnd] } }
  );

  return await this.findAll({
    attributes: [
      [sequelize.fn('avg', sequelize.col('carbs')), 'avgCarbs'],
      [sequelize.fn('avg', sequelize.col('fat')), 'avgFat'],
      [sequelize.fn('avg', sequelize.col('protein')), 'avgProtein'],
    ],
    where,
    order: sequelize.literal('date ASC'),
  });
};

module.exports = Meals;
