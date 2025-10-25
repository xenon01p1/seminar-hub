import { useQuery } from "@tanstack/react-query";
import { getTotalJoinedSeminars } from "../api/JoinedSeminars";

export const useGetTotalJoinedSeminars = (id) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['getTotalJoinedSeminars', id],
    queryFn: () => getTotalJoinedSeminars(id), 
    enabled: !!id, 
  });

  return { isLoading, error, data };
};