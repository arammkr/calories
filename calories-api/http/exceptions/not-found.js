const CustomException = require('./custom-exception');
class NotFoundException extends CustomException {
  constructor(message, status = 404) {
    super(message, status);
  }
}

module.exports = NotFoundException;
