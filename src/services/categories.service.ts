import { note2quizApi } from "../api/api";
import { CategoryDto, CategoryRequestDto } from "../types/dto/categories/category.dto";

export const getCategories = async (): Promise<CategoryDto[]> => {
    return await note2quizApi.get('/categories');
};

export const createCategory = async (data: CategoryRequestDto): Promise<CategoryDto> => {
    return await note2quizApi.post('/categories', data);
};

export const updateCategory = async (id: number, data: CategoryRequestDto): Promise<CategoryDto> => {
    return await note2quizApi.put(`/categories/${id}`, data);
};

export const deleteCategory = async (id: number): Promise<void> => {
    await note2quizApi.delete(`/categories/${id}`);
};