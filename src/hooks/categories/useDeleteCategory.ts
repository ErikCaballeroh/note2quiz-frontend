import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCategory } from "@/src/services/categories.service";

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
};