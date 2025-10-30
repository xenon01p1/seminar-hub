import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTotalJoinedSeminars, getLatestSeminars, joinSeminar } from "../api/JoinedSeminars";

export const useGetTotalJoinedSeminars = (id) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['getTotalJoinedSeminars', id],
    queryFn: () => getTotalJoinedSeminars(id), 
    enabled: !!id, 
  });

  return { isLoading, error, data };
};

export const useGetLatestSeminars = (id) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['getLatestSeminars', id],
    queryFn: () => getLatestSeminars(id), 
    enable: !!id,
  })

  return { isLoading, error, data };
}

export const useJoinSeminar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }) => joinSeminar(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['getLatestSeminars', 'getTotalJoinedSeminars'] })
  })
}