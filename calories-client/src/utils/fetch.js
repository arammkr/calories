import TokenService from 'auth/token';
import HttpException from 'exceptions/HttpException';
import { joiErrorParser } from 'utils';

const { REACT_APP_API_HOST, REACT_APP_BASE_API_URL } = process.env;

export default class Fetch {
  static async fetch(options) {
    const {
      url = `${REACT_APP_API_HOST}${REACT_APP_BASE_API_URL}`,
      headers,
      method,
      body,
      path,
      urlParams,
    } = options;

    let requestOptions = {
      headers:
      {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
      method,
    };

    if (body) {
      requestOptions.body = JSON.stringify(body);
    }
    
    const token = TokenService.getToken();
    // check Authorization
    if (token) {
      requestOptions.headers.Authorization = `Bearer ${token}`;
    }

    // Get params
    const queryStr = urlParams
      ? '?' + Object.keys(urlParams)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(urlParams[k]))
        .join('&')
      : '';

    // Fire the Request and Return the response promise Object
    try {
      const requestPromise = await fetch(new Request(`${url}${path}${queryStr}`, requestOptions));

      if (requestPromise) {
        const text = await requestPromise.text();
        const parsed = text ? JSON.parse(text) : body;

        if (parsed && parsed.success) {
          return parsed.payload;
        } else {
          const payload = requestPromise.status === 422 ? joiErrorParser(parsed.payload.details) : null;
          throw new HttpException(parsed.message, parsed.status || requestPromise.status, payload);
        }
      } else {
        throw new Error(requestPromise.statusText);
      }
    } catch (error) {
      throw error;
    }
  }

  /* GET (retrieve) */
  static get = options => Fetch.fetch({ ...options, method: 'GET' });

  /* POST (create) */
  static post = options => Fetch.fetch({ ...options, method: 'POST' });

  /* PUT (update) */
  static put = options => Fetch.fetch({ ...options, method: 'PUT' });;

  /* PATCH (update) */
  static patch = options => Fetch.fetch({ ...options, method: 'PATCH' });;

  /* DELETE (remove) */
  static delete = options => Fetch.fetch({ ...options, method: 'DELETE' });
}
