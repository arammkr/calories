import Fetch from 'utils/fetch';

class TokenService {
  static tokenKey = 'token';

  static setToken(token) {
    localStorage.setItem(TokenService.tokenKey, token);
  }

  static getToken() {
    return localStorage.getItem(TokenService.tokenKey) || '';
  }

  static removeToken() {
    localStorage.removeItem(TokenService.tokenKey);
  }

  static isLogedIn() {
    return !!this.getToken();
  }

  static getMe() {
    return Fetch.get({ path: '/auth/me' });
  }

  static login(data) {
    return Fetch.post({ path: '/auth/login', body: data });
  }

  static signup(data) {
    return Fetch.post({ path: '/auth/signup', body: data });
  }
}

export default TokenService;
