import { updateQuiz } from "@/src/services/quizzes.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateQuiz = (id: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: any) => updateQuiz(id, payload),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["quiz", id] });
            queryClient.invalidateQueries({ queryKey: ["quiz", "saved"] });
            queryClient.invalidateQueries({ queryKey: ["quiz", "recent"] });
        },
    });
};
