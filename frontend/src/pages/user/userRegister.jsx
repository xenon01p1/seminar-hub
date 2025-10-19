import React, { useState } from 'react';
import FormInput from '../../components/formInput';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/authUser';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Link } from "react-router-dom";

// --- Mock Components/Functions (for runnable example) ---
const LinkLogin = () => (
    <Link to="/user/login" className="mt-2 text-sm font-medium text-sky-500 hover:text-sky-600 transition duration-150 ease-in-out">
        Already have an account? Sign in
    </Link>
);

const MySwal = withReactContent(Swal);

// --- Main UserRegister Component ---
const UserRegister = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const res = await registerUser({ username, password, email });

            if (res.status) {
                MySwal.fire({
                    title: "Yeay!",
                    text: "Register successful! now login in to your account.",
                    icon: "success"
                });
                navigate('/user/login');
            } else {
                throw new Error(res.message || "Registration failed.");
            }

        } catch (err) {
            let errorMessage = "An unexpected error occurred.";
            const statusCode = err.response?.status || err.status; 

            if (statusCode === 409) {
                errorMessage = "Username and email already taken.";
            } else if (err.message) {
                errorMessage = err.message;
            }

            MySwal.fire({
                title: "Opps!",
                text: errorMessage,
                icon: "error"
            });
        }
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
                    <LinkLogin />
                </div>

                <form className="space-y-6" onSubmit={handleRegister}>

                    {/* Email Input */}
                    <FormInput
                        title="Email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        onChangeHandler={ (e) => setEmail(e.target.value)}
                    />

                    {/* Username Input */}
                    <FormInput
                        title="Username"
                        name="username"
                        type="text"
                        placeholder="Enter your username"
                        onChangeHandler={ (e) => setUsername(e.target.value)}
                    />

                    {/* Password Input */}
                    <FormInput
                        title="Password"
                        name="password"
                        type="text"
                        placeholder="Enter your password"
                        onChangeHandler={ (e) => setPassword(e.target.value)}
                    />

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
