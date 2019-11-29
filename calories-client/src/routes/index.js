import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import TopBar from 'components/TopBar';
import NotFound from 'pages/NotFound';
import Auth from 'pages/Auth';
import User from 'pages/User';

import './index.scss';

export default () => {

  return (
    <>
      <TopBar />
      <Route render={({ location }) => (
        <TransitionGroup className="transitionGroup">
          <CSSTransition classNames="fade" timeout={300} key={location.key}>
            <Switch location={location}>
              <Route path="/auth" component={Auth} />
              <Route path="/user/:userId" component={User} />
              <Route component={NotFound} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
      />
    </>
  );
};
