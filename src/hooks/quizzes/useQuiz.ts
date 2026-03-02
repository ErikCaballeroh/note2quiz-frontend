import { getQuizById } from "@/src/services/quizzes.service";
import { useQuery } from "@tanstack/react-query";


export const useQuiz = (id: number) => {
    return useQuery({
        queryKey: ["quiz", id],
        queryFn: () => getQuizById(id),
    })
};