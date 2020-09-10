const cors = require('./cors');

const middleware = cors();

describe('Middleware: testing cors', () => {
  let req = null;
  let res = null;
  let next = null;

  beforeEach(() => {
    req = {
      headers: {
        origin: 'localhost',
      },
    };
    res = {
      header: jest.fn(),
    };
    next = jest.fn();
  });

  it('should call header method with specified args', () => {
    middleware(req, res, next);

    expect(res.header.mock.calls.length).toBe(3);
    expect(res.header).toBeCalledWith(
      `Access-Control-Allow-Origin`,
      `localhost`,
    );
    expect(res.header).toBeCalledWith(
      `Access-Control-Allow-Headers`,
      `Origin, X-Requested-With, Content-Type, Accept`,
    );
  });

  it('should call next method after all', () => {
    middleware(req, res, next);

    expect(next).toBeCalled();
  });
});
