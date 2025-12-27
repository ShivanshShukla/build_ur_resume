import React from "react";
import { Navigate } from "react-router-dom";

/**
 * Simple protected route wrapper.
 * Replace the auth check with your own token/session logic.
 */
function isLoggedIn() {
  return !!localStorage.getItem("accessToken");
}

export default function ProtectedRoute({ children }) {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
