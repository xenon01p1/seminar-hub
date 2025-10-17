import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdmins, addAdmin, editAdmin, deleteAdmin } from "../api/Admins";

export const useGetAdmins = () => {
    const { isLoading, error, data } = useQuery({
        queryKey: ['getAdmins'],
        queryFn: getAdmins
    });

    return { isLoading, error, data };
}

export const useAddAdmin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addAdmin,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getAdmins'] }); 
        }
    })
}

export const useEditAdmin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => editAdmin(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getAdmins'] }); 
        }
    })
}

export const useDeleteAdmin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id }) => deleteAdmin(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getAdmins'] }); 
        }
    })
}
