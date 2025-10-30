import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AdminAuthContextProvider = ({ children }) => {
    const [currentAdmin, setCurrentAdmin] = useState({
        
    })
}

export const UserAuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
            { children }
        </AuthContext.Provider>
    );
}