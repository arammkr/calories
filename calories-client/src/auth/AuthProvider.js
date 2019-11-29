import React, { useContext, useState, useEffect } from 'react';
import { useHistory }  from 'react-router-dom';
import jwtService from './token';

export const AuthContext = React.createContext();
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [auth, setAuth] = useState(null);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState({});
  const history = useHistory();

  useEffect(() => {
    if (jwtService.isLogedIn()) {
      if (history.location.pathname === '/auth') {
        //ToDo
        history.push('/user/1');
      }
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

  async function login(data) {
    try {
      const {token, user: authUser} = await jwtService.login(data);
      jwtService.setToken(token);
      setAuth(authUser);
      // ToDo 
      history.push('/user/1');
    } catch(err) {
      handleError(err);
    }
  }

  async function signup(data) {
    try {
      const result = await jwtService.signup(data);
    } catch (err) {
      handleError(err);
    }
  }

  function logout() {
    jwtService.removeToken();
    setAuth(null);
    setError(null);
    setValidationError({});
    setIsLogedIn(false);
    history.push('/auth');
  }

  async function updateMe() {
    getMe();
  }

  function handleError(err) {
    if (err.status === 422) {
      setValidationError(err.payload);
    }
    err.message && setError(err.message);
  }

  async function getMe() {
    const auth = await jwtService.getMe();
    setAuth(auth.user);
    setLoading(false);
    setIsLogedIn(true);
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
        }
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};