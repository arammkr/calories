const { createErrorResponse } = require('@utils');
const { NotFoundException } = require('@http/exceptions');

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
function NotFoundController(req, res) {
  return createErrorResponse(res, new NotFoundException('Resource not Found'), 404);
}

module.exports = NotFoundController;
