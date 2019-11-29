import React, { useState, useCallback} from 'react';

import AuthPaper from 'components/AuthPaper';
import Login from 'components/Auth/Login';
import SignUp from 'components/Auth/SignUp';

import { useAuthContext } from 'auth/AuthProvider';

export default () => {
  const authProvider = useAuthContext();
  const [isLoginView, setIsLoginView] = useState(true);

  const toggle = useCallback(() => {
    authProvider.actions.cleanErrors();
    setIsLoginView(!isLoginView);
  }, [isLoginView, authProvider.actions]);

  return (
    <AuthPaper>
      {isLoginView 
        ? <Login goToSignUp={toggle} />
        : <SignUp goToLogin={toggle} />
       }
    </AuthPaper>
  )
};
