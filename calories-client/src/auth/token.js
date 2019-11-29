import Fetch from 'utils/fetch';

class TokenService {
  static tokenKey = 'token';

  setToken(token) {
    localStorage.setItem(TokenService.tokenKey, token);
  }

  getToken() {
    return localStorage.getItem(TokenService.tokenKey) || '';
  }

  removeToken() {
    localStorage.removeItem(TokenService.tokenKey);
  }

  isLogedIn() {
    return !!this.getToken();
  }

  getMe() {
    return Fetch.get({ path: '/auth/me' });
  }

  login(data) {
    return Fetch.post({ path: '/auth/login', body: data });
  }

  signup(data) {
    return Fetch.post({ path: '/auth/signup', body: data });
  }
}

export default new TokenService();
