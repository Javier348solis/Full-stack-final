import React from 'react';
import { Navigate } from 'react-router-dom';

const RutasPrivadas = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/home" />;
};

export default RutasPrivadas;   