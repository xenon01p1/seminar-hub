import { createContext, useEffect, useState } from "react";
import { makeRequest } from "../axios";

export const AuthContext = createContext();

export const AdminAuthContextProvider = ({ children }) => {
    const [currentAdmin, setCurrentAdmin] = useState({
        
    })
}

// export const UserAuthContextProvider = ({ children }) => {
//     const [currentUser, setCurrentUser] = useState(
//         JSON.parse(localStorage.getItem("user")) || null
//     );

//     useEffect(() => {
//         localStorage.setItem("user", JSON.stringify(currentUser));
//     }, [currentUser]);

//     return (
//         <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
//             { children }
//         </AuthContext.Provider>
//     );
// }

export const UserAuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await makeRequest.get("http://localhost:3000/auth/verify");
        setCurrentUser(res.data.user);
      } catch (err) {
        console.log("Invalid or expired token:", err.response?.data?.message);
        setCurrentUser(null);
      } finally {
        setIsAuthChecked(true);
      }
    };

    verifyUser();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, isAuthChecked }}>
      {children}
    </AuthContext.Provider>
  );
};