import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createCategory } from "@/src/services/categories.service";
import { CategoryRequestDto } from "@/src/types/dto/categories/category.dto";

export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CategoryRequestDto) => createCategory(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
};