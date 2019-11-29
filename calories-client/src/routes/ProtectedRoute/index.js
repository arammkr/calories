import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default ({ hasAccess, fallbackUrl = '/', ...props }) => hasAccess
  ? <Route {...props} />
  : <Redirect to={fallbackUrl} />;
