const User = require('@db/models/user');
const { DublicateDataException } = require('@http/exceptions');

const isEmailExist = async (email, throwException = true) => {
  if (!email) return false;
  const isEmailExist = await User.isEmailExist(email);
  if (isEmailExist && throwException) {
    throw new DublicateDataException('email is already exists');
  }

  return isEmailExist;
};

const isNickExist = async (nick, throwException = true) => {
  if (!nick) return false;
  const isNickExist = nick && await User.isNickExist(nick) || false;
  if (isNickExist && throwException) {
    throw new DublicateDataException('nick is already exists');
  }

  return isNickExist;
};

module.exports = {
  isEmailExist, 
  isNickExist,
};
