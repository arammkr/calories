const CustomException = require('./custom-exception');
class AuthException extends CustomException {
  constructor(message, status = 403) {
    super(message, status);
  }
}

module.exports = AuthException;
