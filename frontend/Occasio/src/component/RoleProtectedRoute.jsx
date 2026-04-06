// import React, { useContext } from 'react';
// import { Navigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// const RoleProtectedRoute = ({ children, roles = [] }) => {
//   const { isAuthenticated, user } = useContext(AuthContext);
//   if (!isAuthenticated) return <Navigate to="/login" replace />;
//   if (roles.length > 0 && (!user || !roles.includes(user.role))) return <Navigate to="/" replace />;
//   return children;
// };

// export default RoleProtectedRoute;

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RoleProtectedRoute = ({ children, roles = [] }) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // User not ready yet
  if (!user) {
    return null;
  }

  // Role mismatch → smart redirect
  if (roles.length > 0 && !roles.includes(user.role)) {
    if (user.role === "vendor") {
      return <Navigate to="/vendor" replace />;
    } else if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/user" replace />;
    }
  }

  return children;
};

export default RoleProtectedRoute;