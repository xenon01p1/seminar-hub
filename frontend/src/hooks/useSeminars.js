import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSeminars, getTotalSeminars, addSeminar, editSeminar, deleteSeminar } from "../api/Seminars";

export const useGetSeminars = () => {
    const { isLoading, error, data } = useQuery({
        queryKey: ['getSeminars'],
        queryFn: getSeminars
    });

    return { isLoading, error, data };
}

export const useGetSeminarsLimit = (limit) => {
    const { isLoading, error, data } = useQuery({
        queryKey: ['getSeminars'],
        queryFn: getSeminars
    });

    const limitedData = data ? data.slice(0, limit) : [];
    return { isLoading, error, limitedData };
}

export const useGetTotalSeminars = () => {
    const { isLoading, error, data } = useQuery({
        queryKey: ['getTotalSeminars'],
        queryFn: getTotalSeminars
    });

    return { isLoading, error, data };
}

export const useAddSeminar = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addSeminar,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getSeminars'] }); 
        }
    })
}

export const useEditSeminar = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => editSeminar(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getSeminars'] }); 
        }
    })
}

export const useDeleteSeminar = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id }) => deleteSeminar(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getSeminars'] }); 
        }
    })
}