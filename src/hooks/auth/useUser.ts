import { getMe } from "@/src/services/auth.service";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: getMe,
    });
};