import React, { useState } from 'react';
import FormInput from '../../components/formInput';
import { Lock, Mail, Twitter, User } from 'lucide-react'; 

// --- Mock Components/Functions (for runnable example) ---
const LinkRegister = () => (
    <a href="#" className="mt-2 text-sm font-medium text-sky-500 hover:text-sky-600 transition duration-150 ease-in-out">
        Don't have an account? Sign up
    </a>
);

// Mock Login Handler
const mockHandleLogin = (e, username, password) => {
    e.preventDefault();
    console.log('Attempting login...');
    console.log('Username:', username);
    console.log('Password:', password);

};

// --- Main UserRegister Component ---
const UserRegister = () => {
    // Mock State for Form
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('users'); 
    const [isLoading, setIsLoading] = useState(false);
    
    // Combine mock states into the actual handler
    const handleLogin = (e) => {
        setIsLoading(true);
        mockHandleLogin(e, username, password);
        setTimeout(() => setIsLoading(false), 1500); 
    };


    // Utility function for input focus styles
    const inputClasses = "appearance-none block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 text-base transition duration-150 ease-in-out";
    
    // Utility function for button styles
    const buttonClasses = "w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-lg text-lg font-bold text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-sky-500 transition duration-300 ease-in-out disabled:opacity-50";

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-['Inter']">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 space-y-8 border border-gray-100 transform transition-all duration-500 hover:shadow-3xl">
                
                {/* Header & Icon */}
                <div className="flex flex-col items-center"> 
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Sign up
                    </h2>
                    {role === 'users' && <LinkRegister />}
                </div>

                <form className="space-y-6" onSubmit={handleLogin}>

                    {/* Username Input */}
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-semibold text-gray-700 mb-1"
                        >
                            Username
                        </label>
                        <div className="mt-1 relative rounded-lg shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                className={inputClasses}
                                placeholder="Your username"
                                onChange={e => setUsername(e.target.value)}
                                value={username}
                            />
                        </div>
                    </div>
                    
                    {/* Username Input */}
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-semibold text-gray-700 mb-1"
                        >
                            Username
                        </label>
                        <div className="mt-1 relative rounded-lg shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                className={inputClasses}
                                placeholder="Your username"
                                onChange={e => setUsername(e.target.value)}
                                value={username}
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-700 mb-1"
                        >
                            Password
                        </label>
                        <div className="mt-1 relative rounded-lg shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className={inputClasses}
                                placeholder="••••••••"
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                            />
                        </div>
                    </div>

                    {/* Controls & Forgot Password */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-sky-500 focus:ring-sky-500 border-gray-300 rounded"
                            />
                            <label
                                htmlFor="remember-me"
                                className="ml-2 block text-sm text-gray-900"
                            >
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <button
                                type="button" // Changed to button to prevent form submit
                                className="font-medium text-sky-500 hover:text-sky-600 transition duration-150 ease-in-out"
                            >
                                Forgot password?
                            </button>
                        </div>
                    </div>

                    {/* Main Sign In Button */}
                    <div>
                        <button
                            type="submit"
                            className={buttonClasses}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default UserRegister;
