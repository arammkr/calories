const CustomException = require('./custom-exception');
class InvalidParameterException extends CustomException {}

InvalidParameterException.message = 'Invalid parameter';

module.exports = InvalidParameterException;
