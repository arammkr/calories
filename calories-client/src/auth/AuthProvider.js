import React, { useContext, useState, useEffect } from 'react';
import history from 'utils/history';
import jwtService from './token';

export const AuthContext = React.createContext();
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [auth, setAuth] = useState({});
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState({});

  async function getMe() {
    const { user } = await jwtService.getMe();

    if (history.location.pathname === '/auth') {
      history.push(`/user/${user.id}`);
    }
    setAuth(user);
    setIsLogedIn(true);
    setLoading(false);
  }

  useEffect(() => {
    if (jwtService.isLogedIn()) {
      getMe();
    } else {
      if (history.location.pathname !== '/auth') {
        history.push('/auth');
      }

      setLoading(false);
    }
  }, []);

  function cleanErrors() {
    setError(null);
    setValidationError({});
  }

  function handleError(err) {
    if (err.status === 422) {
      setValidationError(err.payload);
    }

    if (err.message) {
      setError(err.message);
    }
  }

  async function login(data) {
    try {
      const { token, user: authUser } = await jwtService.login(data);
      jwtService.setToken(token);
      setAuth(authUser);
      setIsLogedIn(true);
      history.push(`/user/${authUser.id}`);
    } catch (err) {
      handleError(err);
    }
  }

  async function signup(data) {
    try {
      await jwtService.signup(data);
      setError(null);
      setValidationError({});
      history.push('/auth');
    } catch (err) {
      handleError(err);
    }
  }

  function logout() {
    jwtService.removeToken();
    setAuth({});
    setError(null);
    setValidationError({});
    setIsLogedIn(false);
    history.push('/auth');
  }

  async function updateMe() {
    getMe();
  }

  return (
    <AuthContext.Provider
      value={{
        state: {
          isLoading,
          isLogedIn,
          auth,
          error,
          validationError,
        },
        actions: {
          login,
          signup,
          cleanErrors,
          logout,
          updateMe,
        },
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
