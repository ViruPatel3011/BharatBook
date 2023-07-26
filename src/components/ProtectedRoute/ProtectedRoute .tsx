import React from "react";
import { Route, Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  path: string;
  element: React.ReactElement;
  authenticated: boolean;
  children?: React.ReactNode; // Add children prop
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  path,
  element,
  authenticated,
  children, // Add children prop
}) => {
  if (authenticated) {
    return <Route path={path} element={element} />;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
