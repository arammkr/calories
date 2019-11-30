const auth = require('./auth');
const { AuthException } = require('@http/exceptions/');
const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken');

describe('Auth middleware test', () => {
  let req = null;
  let res = null;
  let next = null;

  beforeEach(() => {
    req = {
      header: jest.fn(),
    };
    res = {
      header: jest.fn(),
    };
    next = jest.fn();
  });

  it(`should throw AuthExceptuin if token not provided`, () => {
    req.header.mockReturnValue('');

    expect(() => auth(req, res, next)).toThrowError(AuthException);
    expect(req.header).toBeCalledWith('Authorization');
  });

  it(`should pass auth middleware`, () => {
    req.header.mockReturnValue('Bearer token');
    auth(req, res, next);
    expect(req.header).toBeCalledWith('Authorization');
    expect(jwt.verify).toHaveBeenCalled();
  });

  it(`should not pass auth middleware if invalid token`, () => {
    req.header.mockReturnValue('Bearer token');
    jwt.verify.mockImplementation(() => {
      throw new Error();
    });

    expect(() => auth(req, res, next)).toThrowError(AuthException);
    expect(req.header).toBeCalledWith('Authorization');
    expect(jwt.verify).toHaveBeenCalled();
  });
});
