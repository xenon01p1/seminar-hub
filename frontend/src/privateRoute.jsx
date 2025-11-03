// src/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/authContext.jsx";
import { useContext } from "react";

export default function PrivateRoute({ children, allowedRole }) {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && currentUser.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}
