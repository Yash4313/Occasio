import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RoleProtectedRoute = ({ children, roles = [] }) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (roles.length > 0 && (!user || !roles.includes(user.role))) return <Navigate to="/" replace />;
  return children;
};

export default RoleProtectedRoute;
