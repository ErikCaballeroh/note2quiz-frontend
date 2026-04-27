import { note2quizApi } from "../api/api";
import { QuizData } from "../components/home";
import { QuizMapper } from "../mappers/quizzes.maper";
import { QuizDto } from "../types/dto/quizzes/quiz.dto";

export const getRecentQuizzes = async (): Promise<QuizData[]> => {
    const response = await note2quizApi.get<QuizDto[]>('/quizzes/recent');
    return response.map(QuizMapper.fromQuizDtoToQuizData);
};

export const getQuizzes = async (): Promise<QuizDto[]> => {
    return await note2quizApi.get('/quizzes');
};

export const getQuizById = async (id: number): Promise<QuizDto> => {
    return await note2quizApi.get(`/quizzes/${id}`);
};

export const generateQuiz = async (text: string): Promise<QuizDto> => {
    return await note2quizApi.post('/quizzes/generate', { text });
};

export const updateQuiz = async (id: number, data: { title?: string; questions?: any }): Promise<QuizDto> => {
    return await note2quizApi.put(`/quizzes/${id}`, data);
};