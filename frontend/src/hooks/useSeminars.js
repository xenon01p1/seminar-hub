import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSeminars, getSeminarsJoined, getTotalSeminars, addSeminar, editSeminar, deleteSeminar } from "../api/Seminars";

export const useGetSeminars = () => {
    const { isLoading, error, data } = useQuery({
        queryKey: ['getSeminars'],
        queryFn: getSeminars
    });

    return { isLoading, error, data };
}

export const useGetSeminarsLimit = (limit, options = {}) => {
    const { isLoading, error, data } = useQuery({
        queryKey: ['getSeminarsLimit'], 
        queryFn: getSeminars,
        ...options 
    });

    const limitedData = data ? data.slice(0, limit) : [];
    return { isLoading, error, data: limitedData };
}

export const useGetSeminarsJoined = (id, isUser) => { 
  const { isLoading, error, data } = useQuery({
    queryKey: ['getSeminarsJoined', id], 
    queryFn: () => getSeminarsJoined(id),
    enabled: !!id && isUser, 
  });

  return { isLoading, error, data };
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