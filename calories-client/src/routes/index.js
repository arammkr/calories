import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import NotFound from 'pages/NotFound';
import Auth from 'pages/Auth';
import User from 'pages/User';
import Users from 'pages/Users';
import ProtectedRoute from './ProtectedRoute';
import { AuthContext } from '../auth/AuthProvider';
import { hasAccessToUsers } from 'utils';
import './index.scss';

export default () => {
  return (
    <AuthContext.Consumer>
      {({ state: { auth, isLogedIn } }) => (
        <Route
          render={({ location }) => (
            <TransitionGroup className="transitionGroup">
              <CSSTransition classNames="fade" timeout={300} key={location.key}>
                <Switch location={location}>
                  <Route path="/auth" component={Auth} />
                  <Route path="/user/:userId" component={User} />
                  <ProtectedRoute
                    hasAccess={hasAccessToUsers(isLogedIn, auth)}
                    fallbackUrl="/klir"
                    path="/users"
                    component={Users}
                  />
                  <Route component={NotFound} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
      )}
    </AuthContext.Consumer>
  );
};
