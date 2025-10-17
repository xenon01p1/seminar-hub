import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers, addUser, editUser, getTotalUsers } from "../api/Users.jsx";

export const useGetUsers = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["getUsers"],
    queryFn: getUsers
  });

  return { isLoading, error, data };
}

export const useGetTotalUsers = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["getTotalUsers"],
    queryFn: getTotalUsers
  });

  return { isLoading, error, data };
}

export const useAddUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getUsers'] }); 
        }
    })
}

export const useEditUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => editUser(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getUsers'] }); 
        }
    })
}
