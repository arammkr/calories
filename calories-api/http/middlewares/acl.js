const config = require('@config');
const { ForbiddenException } = require('@http/exceptions');

const acl = config.get('acl');

module.exports = (req, res, next) => {

  if (!req.auth) {
    throw new ForbiddenException('User is not logged in', 403);
  }

  const resource = req.baseUrl;

  const aclResource = acl.find(item => item.resource === resource);

  if (!aclResource) {
    // if resource is not listed let's consider as a open resource
    return next();
  }

  if (req.auth.id === Number(req.params.id)) {
    // if user want to access his own data
    return next();
  }
  
  if (req.auth.id === Number(req.body.userId)) {
    // if user want to access his own data
    return next();
  }
  
  if (req.isMealOwner) {
    // if user want to access his own data
    return next();
  }

  if (aclResource.hasAccess.indexOf(req.auth.role.role) === -1) {
    throw new ForbiddenException('Ooops, you do not have access to this resource', 403);
  }

  next();
};
