import { useQuery } from "@tanstack/react-query";
import { getTotalAttendees } from "../api/Attendees";

export const useGetTotalAttendees = () => {
    const { isLoading, error, data } = useQuery({
        queryKey: ['getTotalAttendees'],
        queryFn: getTotalAttendees
    });

    return { isLoading, error, data };
}