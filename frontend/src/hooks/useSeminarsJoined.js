import { useQuery } from "@tanstack/react-query";
import { getTotalJoinedSeminars, getLatestSeminars } from "../api/JoinedSeminars";

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