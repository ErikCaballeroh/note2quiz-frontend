import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createAttempt } from "@/src/services/attempts.service";
import { CreateAttemptRequestDto } from "@/src/types/dto/attempts/attempt.dto";

export const useCreateAttempt = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateAttemptRequestDto) => createAttempt(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["quiz", "recent"] });
            queryClient.invalidateQueries({ queryKey: ["quiz", "saved"] });
        },
    });
};
