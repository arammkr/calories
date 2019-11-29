const CustomException = require('./custom-exception');
class ForbiddenException extends CustomException {
  constructor(message, status = 403) {
    super(message, status);
  }
}

module.exports = ForbiddenException;
