import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/authContext.jsx";
import { makeRequest } from './axios.js'; 

export function useAxiosInterceptor() {
    const { setCurrentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    
    // Use useEffect to run this setup only once when the component mounts
    useEffect(() => {
        
        // set up the response handler
        const interceptor = makeRequest.interceptors.response.use(
            // Success handler
            (response) => response,

            // Error handler
            async (error) => {
                if (error.response?.status === 401) {
                    console.log('Token is invalid or expired. Redirecting...');
                    
                    // Clear user state
                    await setCurrentUser(null);
                    
                    // Redirect to login (assuming '/' is your login or home page)
                    navigate('/'); 
                    
                    // Crucial: Reject the original request to stop component flow
                    return Promise.reject(new Error("Session expired, redirecting."));
                }
                
                return Promise.reject(error);
            }
        );
        
        // Cleanup function: remove the interceptor when the component unmounts
        return () => {
            makeRequest.interceptors.response.eject(interceptor);
        };
    }, [navigate, setCurrentUser]);
}