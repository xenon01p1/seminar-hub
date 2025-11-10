import { useAxiosInterceptor } from './useAxiosInterceptor';
import { Outlet } from 'react-router-dom';

export default function InterceptorSetup() {
    
    useAxiosInterceptor();

    // Outlet is needed to render the rest of routes
    return <Outlet />; 
}