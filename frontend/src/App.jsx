import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserAuthContextProvider } from './context/authContext.jsx';
import UserDashboard from "./pages/user/userDashboard.jsx";
import UserLogin from "./pages/user/userLogin.jsx";
import UserRegister from "./pages/user/userRegister.jsx";
import UserProfile from "./pages/user/userProfile.jsx";

import AdminLayout from "./layouts/adminLayout.jsx";
import Users from "./pages/admin/users.jsx";
import Admins from "./pages/admin/admins.jsx";
import Seminars from "./pages/admin/seminars.jsx";
import Dashboard from "./pages/admin/dashboard.jsx";
import LoginAdmin from "./pages/admin/login.jsx";
import PrivateRoute from "./privateRoute.jsx";

export default function App() {
  return (
    <UserAuthContextProvider>
      <Router>
        <Routes>
          {/* User routes */}
          <Route path="user/login" element={<UserLogin />} />
          <Route path="user/register" element={<UserRegister />} />
          <Route path="user/dashboard" element={<UserDashboard />} />
          <Route path="user/profile" element={<UserProfile />} />

          {/* Admin login */}
          <Route path="admin/login" element={<LoginAdmin />} />
          <Route path="admin/dashboard" element={<Dashboard />} />

          {/* Admin-only layout */}
          <Route
            path="/admin"
            element={
              <PrivateRoute allowedRole="admins">
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route path="admins" element={<Admins />} />
            <Route path="users" element={<Users />} />
            <Route path="seminars" element={<Seminars />} />
          </Route>

          {/* Default/fallback route */}
          <Route path="*" element={<UserDashboard />} />
        </Routes>
      </Router>
    </UserAuthContextProvider>
  );
}
