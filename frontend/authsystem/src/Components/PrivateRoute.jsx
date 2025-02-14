// src/components/PrivateRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Retrieve authentication state from the auth slice
  const { isAuthenticated, Token } = useSelector((state) => state.auth);
  
  // If not authenticated, redirect to login
  if (!isAuthenticated || !Token) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the child component
  return children;
};

export default PrivateRoute;
