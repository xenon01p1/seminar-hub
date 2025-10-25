import { useState } from "react";
import { Link } from "react-router-dom";

export default function UserNavbar({ primary_dark, color_hover }) {
    const [isOpen, setIsOpen] = useState(false);
    const userString = localStorage.getItem("user");
    const userData =  userString && userString !== 'undefined'
        ? JSON.parse(userString) 
        : null; 

    console.log(userData);
    
    return (
        <nav className="sticky top-0 z-50 bg-white shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo/Title */}
                    <div className="flex items-center">
                        <span className={`text-2xl font-bold text-${primary_dark}`}>Innovation Summit</span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {['Home', 'Benefits', 'Seminars', 'Testimony'].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className={`text-gray-600 hover:text-${primary_dark} px-3 py-2 rounded-md text-sm font-medium transition duration-150`}
                                >
                                    {item}
                                </a>
                            ))}
                            { userData && userData.role === "users" ?
                                <Link
                                    key="dashboard_mobile"
                                    to="/user/profile"
                                    className={`ml-4 px-4 py-2 bg-${primary_dark} text-white rounded-lg text-sm font-medium hover:bg-${color_hover} transition duration-150`}
                                >
                                    Dashboard
                                </Link> :
                                <Link
                                    key="sign_in_mobile"
                                    to="/user/login"
                                    className={`ml-4 px-4 py-2 bg-${primary_dark} text-white rounded-lg text-sm font-medium hover:bg-${color_hover} transition duration-150`}
                                >
                                    Sign in
                                </Link>
                            }
                            {/* <a 
                                href="#register" 
                                className={`ml-4 px-4 py-2 bg-${primary_dark} text-white rounded-lg text-sm font-medium hover:bg-${color_hover} transition duration-150`}
                            >
                                Sign in
                            </a> */}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`p-2 rounded-md text-gray-500 hover:text-${primary_dark} focus:outline-none focus:ring-2 focus:ring-inset focus:ring-${primary_dark}`}
                        >
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Content */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
                        {['Home', 'Benefits', 'Seminars', 'Testimony'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className={`text-gray-600 hover:text-${primary_dark} block px-3 py-2 rounded-md text-base font-medium text-center`}
                                onClick={() => setIsOpen(false)}
                            >
                                {item}
                            </a>
                        ))}
                        { userData && userData.role === "users" ?
                            <Link
                                key="dashboard_mobile"
                                to="/user/profile"
                                className={`w-11/12 mt-2 px-3 py-2 bg-${primary_dark} text-white rounded-lg text-base font-medium text-center hover:bg-${color_hover} transition duration-150`}
                            >
                                Dashboard
                            </Link> :
                            <Link
                                key="sign_in_mobile"
                                to="/user/login"
                                className={`w-11/12 mt-2 px-3 py-2 bg-${primary_dark} text-white rounded-lg text-base font-medium text-center hover:bg-${color_hover} transition duration-150`}
                            >
                                Sign in
                            </Link>
                        }
                        {/* <Link
                            key={ userData ? "dashboard_mobile" : "sign_in_mobile" }
                            to={ userData ? "" : "" }
                            className={`w-11/12 mt-2 px-3 py-2 bg-${primary_dark} text-white rounded-lg text-base font-medium text-center hover:bg-${color_hover} transition duration-150`}
                        >
                            { userData ? "Dashboard" : "Sign in" }
                        </Link> */}
                        {/* <a 
                            href=""
                            className={`w-11/12 mt-2 px-3 py-2 bg-${primary_dark} text-white rounded-lg text-base font-medium text-center hover:bg-${color_hover} transition duration-150`}
                            onClick={() => setIsOpen(false)}
                        >
                            Sign in
                        </a> */}
                        
                    </div>
                </div>
            )}
        </nav>
    );
};