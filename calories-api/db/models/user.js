const { sequelize, DataTypes } = require('../.');
const UserRole = require('./user-role');
const Meal = require('./meal');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('@config');

const User = sequelize.define('Users', {
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: DataTypes.STRING,
  nick: DataTypes.STRING,
  caloriesPerDay: DataTypes.INTEGER,
  password: DataTypes.STRING,
}, {
  defaultScope: {
    attributes: { exclude: ['password'] },
  },
  scopes: {
    raw: {
      attributes: {},
    },
  },
});

const userPasswordHook = user => new Promise((resolve, reject) => {
  if (!user.password) {
    return resolve();
  }
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return reject(err);
    user.password = hash;
    resolve();
  });
});

User.beforeCreate(userPasswordHook);
User.beforeUpdate(userPasswordHook);
User.hasOne(UserRole, { as: 'role', foreignKey: 'userId', onDelete: 'cascade' });
User.hasMany(Meal, { as: 'meals', foreignKey: 'userId', onDelete: 'cascade' });

User.prototype.checkIsValidPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

User.prototype.signJwt = function() {
  const cleanUser = this.toJSON();
  delete cleanUser.password;

  const token = jwt.sign(cleanUser, config.get('JWT_KEY'));

  return { user: cleanUser, token };
};

User.isEmailExist = async function(email) {
  return await this.findOne({
    where: { email },
    attributes: ['email'],
  });
};

User.isNickExist = async function(nick) {
  return await this.findOne({
    where: { nick },
    attributes: ['nick'],
  });
};

module.exports = User;
