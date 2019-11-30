const acl = require('./acl');
const { ForbiddenException } = require('@http/exceptions/');

describe('ACL middleware test', () => {
  let req = null;
  let res = null;
  let next = null;

  beforeEach(() => {
    req = {
      headers: {
        origin: 'localhost',
      },
      auth: {
        id: 1,
        role: { role: 'admin' },
      },
      baseUrl: '/api/calories/user',
      params: {},
    };
    res = {
      header: jest.fn(),
    };
    next = jest.fn();
  });

  it(`should pass acl if resource not found`, () => {
    req.baseUrl = '/not/declared/resource';
    acl(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it(`should pass acl`, () => {
    acl(req, res, next);

    expect(next).toHaveBeenCalled();
  });
  
  it(`should pass acl for owned data`, () => {
    req.params.id = '1';
    acl(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it(`should note pass acl for user role`, () => {
    req.auth.role.role = 'user';
    expect(() => {
      acl(req, res, next);
    }).toThrowError(ForbiddenException);
  });
  
  it(`should note pass acl if user not authenticated`, () => {
    req.auth = undefined;
    expect(() => {
      acl(req, res, next);
    }).toThrowError(ForbiddenException);
  });
});
