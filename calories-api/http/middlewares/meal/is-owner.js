const config = require('@config');
const { asyncWrapper } = require('@utils');
const { ForbiddenException } = require('@http/exceptions');

const isMealOwnerMiddlware = async (req, res, next) => {  
  if (req.auth.role.role === config.get('ROLE').ADMIN) {
    return next();
  }

  if (req.body.userId && req.body.userId !== req.auth.id) {
    throw new ForbiddenException(`You dont have proper access to this resource`);
  }
  
  if (req.auth.id !== req.meal.userId) {
    throw new ForbiddenException(`You dont have proper access to this resource`);
  }
 
  next();
};

module.exports = asyncWrapper(isMealOwnerMiddlware);
