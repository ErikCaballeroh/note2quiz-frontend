import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCategory } from "@/src/services/categories.service";
import { CategoryRequestDto } from "@/src/types/dto/categories/category.dto";

interface UpdateCategoryInput {
    id: number;
    data: CategoryRequestDto;
}

export const useUpdateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: UpdateCategoryInput) => updateCategory(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
};