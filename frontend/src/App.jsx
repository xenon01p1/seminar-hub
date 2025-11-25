import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserAuthContextProvider } from './context/authContext.jsx';
import UserDashboard from "./pages/user/userDashboard.jsx";
import UserLogin from "./pages/user/userLogin.jsx";
import UserRegister from "./pages/user/userRegister.jsx";
import UserProfile from "./pages/user/userProfile.jsx";
import InterceptorSetup from './InterceptorSetup.jsx';

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
                    {/* 1. PUBLIC ROUTES */}
                    
                    <Route path="/" element={<UserDashboard />} /> 
                    
                    <Route path="user/login" element={<UserLogin />} />
                    <Route path="user/register" element={<UserRegister />} />
                    {/* Admin login */}
                    <Route path="admin/login" element={<LoginAdmin />} />


                    {/* 2. PROTECTED ROUTES */}
                    <Route path="/" element={<InterceptorSetup />}>
                        
                        {/* Note: This path is now relative to the parent path: /user/profile */}
                        <Route 
                        path="user/profile" 
                        element={
                            <PrivateRoute allowedRole="users">
                            <UserProfile />
                            </PrivateRoute>
                        }
                        />

                        {/* <Route path="user/profile" element={<UserProfile />} /> */}

                        <Route 
                            path="admin/dashboard" 
                            element={
                                <PrivateRoute allowedRole="admins">
                                <Dashboard />
                                </PrivateRoute>
                            }
                        />


                        {/* Admin-only layout */}
                        <Route
                            path="admin" 
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

                    </Route>
                    
                    {/* 3. Fallback Route */}
                    <Route path="*" element={<div>404 Not Found</div>} />
                </Routes>
            </Router>
        </UserAuthContextProvider>
    );
}