const User = require('../models/user');
const dayjs = require('dayjs');
const DAYS_COUNT = 45;
const MEALS = [
  {
    name: 'pizza',
    calories: 460,
    carbs: 37,
    fat: 1,
    protein: 8,
  },
  {
    name: 'salad',
    calories: 235,
    carbs: 15,
    fat: 1,
    protein: 15,
  },
  {
    name: 'sandwich',
    calories: 300,
    carbs: 23,
    fat: 2,
    protein: 12,
  },
  {
    name: 'egg',
    calories: 100,
    carbs: 5,
    fat: 0,
    protein: 12,
  },
  {
    name: 'steak',
    calories: 450,
    carbs: 5,
    fat: 4,
    protein: 24,
  },
  {
    name: 'soup',
    calories: 120,
    carbs: 5,
    fat: 4,
    protein: 10,
  },
  {
    name: 'spaghetti',
    calories: 295,
    carbs: 15,
    fat: 13,
    protein: 5,
  },
  {
    name: 'tiramisu',
    calories: 295,
    carbs: 15,
    fat: 13,
    protein: 0,
  },
  {
    name: 'rice',
    calories: 295,
    carbs: 15,
    fat: 13,
    protein: 6,
  },
  {
    name: 'dolma',
    calories: 295,
    carbs: 15,
    fat: 13,
    protein: 15,
  },
];

function getRandomMeal() {
  return MEALS[Math.floor(Math.random() * MEALS.length)];
}

function randomTime() {
  const hour = parseInt(Math.random() * 23).toString();
  const minute = parseInt(Math.random() * 59).toString();

  return `${hour.length === 1 ? `0${hour}` : hour}:${minute.length === 1 ? `0${minute}` : minute}`;
}

let startday = dayjs().subtract(DAYS_COUNT, 'days');

const dateRange = new Array(DAYS_COUNT).fill(null).map(() => {
  startday = startday.add(1, 'day');
  return startday.format('YYYY-MM-DD');
});

const meals = [];
module.exports = async function() {
  const userCount = await User.count();

  for (let i = 1; i <= userCount; i++) {
    dateRange.forEach(date => {
      for (let j = 0; j < 10; j++) {
        const meal = getRandomMeal();
        meals.push(
          { 
            ...meal, 
            userId: i, 
            date, 
            time: randomTime(),
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        );
      }
    });
  }

  return meals;
};
