import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/authContext.jsx";
import { useContext } from "react";

export default function PrivateRoute({ children, allowedRole }) {
  const { currentUser, isAuthChecked } = useContext(AuthContext);

  // 1. Don't redirect until auth is finished checking
  if (!isAuthChecked) {
    return null; // or a spinner
  }

  // 2. After checking: user not logged in
  if (!currentUser) {
    return <Navigate to="/admin/login" replace />;
  }

  // 3. Role protection
  if (allowedRole && currentUser.role !== allowedRole) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
