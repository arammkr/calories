const { asyncWrapper } = require('@utils');
const User = require('@models/user');
const UserRole = require('@models/user-role');
const { NotFoundException } = require('@http/exceptions');

const userGetterMiddlware = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: { id },
    include: [{ model: UserRole, as: 'role' }],
  });

  if (!user) {
    throw new NotFoundException(`User with given ID: ${id} does not found`);
  }

  req.user = user;

  next();
};

module.exports = asyncWrapper(userGetterMiddlware);
