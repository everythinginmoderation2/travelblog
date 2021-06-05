import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Route {...props} />;
  } else {
    return <Redirect to='/login' />;
  }
};
export default ProtectedRoute;
