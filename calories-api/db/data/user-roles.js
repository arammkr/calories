const config = require('@config');
const ROLE = config.get('ROLE');
const User = require('../models/user');

const userRoles = [
  {
    userId: 1,
    role: ROLE.USER,
  },
  {
    userId: 2,
    role: ROLE.ADMIN,
  },
  {
    userId: 3,
    role: ROLE.MANAGER,
  },
];


userRoles.map(userRole => {
  userRole.createdAt = new Date();
  userRole.updatedAt = new Date();

  return userRole;
});

module.exports = async () => {
  const userCount = await User.count();
  let i = 4;
  const rolesForFaked = new Array(userCount - 3).fill(null).map(() => ({
    userId: i++,
    role: ROLE.USER,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  return [...userRoles, ...rolesForFaked];
};
