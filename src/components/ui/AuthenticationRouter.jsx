import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AuthenticationRouter = ({ isAuthenticated, children }) => {
  const location = useLocation();
  
  const publicRoutes = ['/user-login', '/user-registration'];
  const isPublicRoute = publicRoutes.includes(location.pathname);
  
  // If user is not authenticated and trying to access protected route
  if (!isAuthenticated && !isPublicRoute) {
    return <Navigate to="/user-login" state={{ from: location }} replace />;
  }
  
  // If user is authenticated and trying to access auth routes
  if (isAuthenticated && isPublicRoute) {
    const from = location.state?.from?.pathname || '/movie-discovery-dashboard';
    return <Navigate to={from} replace />;
  }
  
  // If user is authenticated but on root path, redirect to dashboard
  if (isAuthenticated && location.pathname === '/') {
    return <Navigate to="/movie-discovery-dashboard" replace />;
  }
  
  // If user is not authenticated and on root path, redirect to login
  if (!isAuthenticated && location.pathname === '/') {
    return <Navigate to="/user-login" replace />;
  }
  
  return children;
};

export default AuthenticationRouter;