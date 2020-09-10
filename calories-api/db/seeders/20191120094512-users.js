'use strict';
const userGenerator = require('../data/users');

module.exports = {
  up: (queryInterface) => Promise.all(userGenerator())
    .then(users => {
      return queryInterface.bulkInsert('Users', users, {});
    }),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {}),
};
