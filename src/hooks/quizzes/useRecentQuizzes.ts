import { getRecentQuizzes } from "@/src/services/quizzes.service";
import { useQuery } from "@tanstack/react-query";

export const useRecentQuizzes = () => {
    return useQuery({
        queryKey: ['quiz', 'recent'],
        queryFn: getRecentQuizzes,
    });
};