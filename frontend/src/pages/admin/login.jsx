import { makeRequest } from "../../axios.js";
import { useLoginAuth, useAuth } from "../../hooks/useAuth.js";
import { useState } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from "react-router-dom";

const MySwal = withReactContent(Swal);

const LinkRegister = () => {
    return (
        <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <a
              href="#"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              create a new one
            </a>
        </p>
    )
}

const LoginAdmin = ({ role }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { mutate, data, isLoading, error } = useAuth();

    const handleLogin = (e) => {
      e.preventDefault();
      mutate({
        username,
        password,
        role: "admins"
      }, 
      {
        onSuccess: (data) => {
          console.log("user data", data);
          navigate("/admin/admins");
        },
        onError: (error) => {
          MySwal.fire({
            title: "Opps!",
            text: error.response.data.message,
            icon: "error"
          });
        },
      });
      setUsername("");
      setPassword("");
    };

    // if (error) {
    //   console.log(data);
    // }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6 border border-gray-200">
                <div className="flex flex-col items-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                    { role === 'users' && <LinkRegister />}
                </div>

                <form className="space-y-6" onSubmit={ handleLogin }>
                    <div>
                        <label
                          htmlFor="username"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Username
                        </label>
                        <div className="mt-1">
                            <input
                              id="username"
                              name="username"
                              type="username"
                              autoComplete="username"
                              required
                              className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              placeholder=""
                              onChange={ e => setUsername(e.target.value) }
                              value = { username }
                            />
                        </div>
                    </div>

                    <div>
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Password
                        </label>
                        <div className="mt-1">
                            <input
                              id="password"
                              name="password"
                              type="password"
                              autoComplete="current-password"
                              required
                              className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              onChange={ e => setPassword(e.target.value) }
                              value = { password }
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                              id="remember-me"
                              name="remember-me"
                              type="checkbox"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
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
                              
                              className="font-medium text-blue-600 hover:text-blue-500"
                            >
                              Forgot your password?
                            </button>
                        </div>
                    </div>

                    <div>
                        <button
                          type="submit"
                          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Sign in
                        </button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">
                              Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <a
                          href="#"
                          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            <img
                              className="h-5 w-5 mr-2"
                              src="https://www.svgrepo.com/show/365170/google-color.svg"
                              alt="Google"
                            />
                            Google
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginAdmin;