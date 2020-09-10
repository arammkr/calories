const mealDataGenerator = require('../data/user-meals');

function chunk(array, size) {
  const chunked_arr = [];
  let index = 0;
  while (index < array.length) {
    chunked_arr.push(array.slice(index, size + index));
    index += size;
  }
  return chunked_arr;
}

module.exports = {
  up: queryInterface =>  Promise.all([mealDataGenerator()])
    .then(([meals]) => {
      const promises = [];

      chunk(meals, 10000).forEach(mealChunk => {
        promises.push(queryInterface.bulkInsert('Meals', mealChunk, {}));
      });

      return Promise.all(promises);
    }),

  down: queryInterface => queryInterface.bulkDelete('Meals', null, {}),
};
