const logger = require('@utils/logger');
const CustomException = require('@http/exceptions/custom-exception');

module.exports = function internalServerError() {
  // eslint-disable-next-line
  return (err, req, res, next) => {
    logger.error(err);
    
    if (err instanceof CustomException) {
      const status = err.status || 500;
      res.status(status).json({ status, message: err.message });
    } else {
      res.status(500).json({ status: 'fail', message: 'Ooops, something went wrong' });
    }
  };
};
