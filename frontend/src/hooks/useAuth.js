import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginAuth, registerUser } from "../api/authUser.jsx";
import { useNavigate } from "react-router-dom";

export function useLoginAuth() {
  return useMutation({
    mutationFn: loginAuth, 
  });
}

export const useAuth = () => {
  const queryClient = useQueryClient();
    const {
        mutate,
        data,
        isLoading,
        isError,
        error
    } = useMutation({
        mutationFn: loginAuth,
        onSuccess: (responseData) => {
            console.log(responseData.data);
            localStorage.setItem('user', JSON.stringify(responseData.data));
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: (err) => {
            console.error(err);
        }
    });

    return { mutate, data, isLoading, isError, error };
}

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = async (redirect = "/login") => {
    try {
      localStorage.removeItem("user");
      const res = await logoutAuth();

      if (res?.status) {
        console.log("Logout successful");
      } else {
        console.warn("Logout request failed");
      }

      // Redirect
      navigate(redirect);
    } catch (error) {
      console.error("Logout error:", error);
      navigate(redirect);
    }
  };

  return { logout };
};
