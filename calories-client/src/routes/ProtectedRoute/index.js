import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ hasAccess, fallbackUrl = '/', ...props }) {
  return hasAccess ? <Route {...props} /> : <Redirect to={fallbackUrl} />;
}

export default ProtectedRoute;
