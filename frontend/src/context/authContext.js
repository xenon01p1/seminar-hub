import { Children, createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AdminAuthContextProvider = ({ Children }) => {
    const [currentUser, setCurrentUser] = useState({
        
    })
}

export const UserAuthContextProvider = ({ Children }) => {

}