const userRolesDataGenerator = require('../data/user-roles');
module.exports = {
  up: queryInterface => Promise.all([userRolesDataGenerator()])
    .then(([userRoles]) => {
      return queryInterface.bulkInsert('UserRoles', userRoles, {});
    }),
  down: queryInterface => queryInterface.bulkDelete('UserRoles', null, {}),
};
