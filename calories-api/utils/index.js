const dayjs = require('dayjs');

const asyncWrapper = cb => (req, res, next) => {
  cb(req, res, next).catch(next);
};

const createResponse = params => {
  const { response, status, success, payload = null, error = null } = params;
  const responseData = Object.assign(
    { success },
    payload && { payload },
    error && { error: error.message },
  );

  return response.status(status).json(responseData);
};

const createSuccessResponse = (response, payload = {}, status = 200) =>
  createResponse({
    response,
    status,
    success: true,
    payload,
  });

const createErrorResponse = (response, error = {}, status = 500) =>
  createResponse({
    response,
    status,
    success: false,
    error,
  });

const createInvalidParameterResponse = (response, error = {}, status = 422) =>
  createResponse({
    response,
    status,
    success: false,
    payload: error,
  });

const createMockedResponse = (res, payload = {}) => {
  const responseData = {
    success: true,
    payload,
    isMocked: true,
  };

  return res.status(200).json(responseData);
};

const isProd = env => env.startsWith('prod');

const capitalize = str => str[0].toUpperCase() + str.slice(1);

const trimSymbolFromEndings = (str, symbol) => {
  const regex = new RegExp(`^(${symbol})+|(${symbol})+$`, 'g');

  return (str || '').replace(regex, '');
};

const isIpV4 =  ipaddress => {  
  const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  
  return regex.test(ipaddress);
}; 

const isFunction = fn => typeof fn === 'function';

const cleanUser = user => {
  const { password, ...cleanUser } = user.toJSON();
  return cleanUser;
};

const dateDiff = (from, to) => {
  const start = dayjs(from);
  const end = dayjs(to);

  return Math.abs(start.diff(end, 'day'));
};

const timeDiff = (from, to) => {
  const [hourFrom, minutesFrom] = from.split(':');
  const [hourTo, minutesTo] = to.split(':');

  return (Number(hourTo) * 60) + Number(minutesTo) - (Number(hourFrom) * 60) - Number(minutesFrom);
};

module.exports = {
  createResponse,
  createInvalidParameterResponse,
  createSuccessResponse,
  createErrorResponse,
  createMockedResponse,
  asyncWrapper,
  isProd,
  capitalize,
  trimSymbolFromEndings,
  isFunction,
  isIpV4,
  cleanUser,
  dateDiff,
  timeDiff,
};
