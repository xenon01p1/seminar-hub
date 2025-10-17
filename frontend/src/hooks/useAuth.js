import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginAuth } from "../api/authUser.jsx";


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

