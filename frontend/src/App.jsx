import AdminLayout from "./layouts/adminLayout.jsx";
import Users from "./pages/admin/users.jsx";
import Admins from "./pages/admin/admins.jsx";
import Seminars from "./pages/admin/seminars.jsx";
import Dashboard from "./pages/admin/dashboard.jsx";
import LoginAdmin from "./pages/admin/login.jsx";
import PrivateRoute from "./privateRoute.jsx"; 

import UserDashboard from "./pages/user/userDashboard.jsx";
import UserLogin from "./pages/user/userLogin.jsx";
import UserRegister from "./pages/user/userRegister.jsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {

  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="user/login" element={<UserLogin />} />
        <Route path="user/register" element={<UserRegister />} />
        <Route path="user/dashboard" element={<UserDashboard />} />

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
          {/* Child routes for admins */}
          <Route path="admins" element={<Admins />} />
          <Route path="users" element={<Users />} />
          <Route path="seminars" element={<Seminars />} />
        </Route>

        {/* Default route CHANGE THIS*/}
        <Route path="*" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
}