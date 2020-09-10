const { createSuccessResponse, asyncWrapper, cleanUser } = require('@utils');
const { AuthException, DublicateDataException } = require('@http/exceptions');
const User = require('@db/models/user');
const UserRole = require('@db/models/user-role');

/**
 * login - check if user exitst with given email, checks for valid password, generates jwt token
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
async function login(req, res) {
  const { email, password } = req.body;  

  const user = await User.scope('raw').findOne({ 
    where: { email },
    include: [{
      model: UserRole,
      as: 'role',
    }],
  });

  if (!user) {
    throw new AuthException('Invalid login or password');
  }

  if (!await user.checkIsValidPassword(password)) {
    throw new AuthException('Invalid login or password');
  }

  return createSuccessResponse(res, user.signJwt());
}

/**
 * getAuthUser - returns authenticated user
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
async function getAuthUser(req, res) {
  const user = await User.findOne({
    where: { id: req.auth.id },
    include: ['role'],
  });

  return createSuccessResponse(res, { user });
}

/**
 * signUp - check for uniqnes of mail and nick, add user with role 'user'
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
async function signUp(req, res) {

  const isEmailExist = await User.isEmailExist(req.body.email);
  if (isEmailExist) {
    throw new DublicateDataException('email is already exist');
  }

  const isNickExist = req.body.nick && await User.isNickExist(req.body.nick) || false;
  if (isNickExist) {
    throw new DublicateDataException('nick is already exist');
  }

  const user = await User.create({
    ...req.body,
    role: { role: 'user' },
  }, {
    include: [{ model: UserRole, 'as': 'role' }],
  });

  return createSuccessResponse(res, { user: cleanUser(user) });
}

module.exports = {
  login: asyncWrapper(login),
  getAuthUser: asyncWrapper(getAuthUser),
  signUp: asyncWrapper(signUp),
};
