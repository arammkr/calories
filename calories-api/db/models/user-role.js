const config = require('@config');
const { sequelize, DataTypes } = require('..');

const UserRoles = sequelize.define('UserRoles', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  role: {
    type: DataTypes.ENUM,
    values: config.get('roles'),
  },
}, {
  defaultScope: {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  },
  scopes: {
    raw: {
      attributes: {},
    },
  },
});

module.exports = UserRoles;
