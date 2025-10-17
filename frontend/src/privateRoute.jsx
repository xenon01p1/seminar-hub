// src/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, allowedRole }) {
  const userString = localStorage.getItem("user");
  
  const user = userString && userString !== 'undefined'
    ? JSON.parse(userString) 
    : null; 

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}
