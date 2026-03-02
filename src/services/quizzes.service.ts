import { note2quizApi } from "../api/axios";
import { QuizMapper } from "../mappers/quizzes.maper";
import { Quiz, QuizzesResponse } from "../types/quiz.types";

export const getRecentQuizzes = async () => {
    try {
        const response = await note2quizApi.get<QuizzesResponse>('/quizzes/recent');
        return response.data.data.map(QuizMapper.fromQuizToQuizData);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getQuizzes = async () => {
    try {
        const response = await note2quizApi.get<QuizzesResponse>('/quizzes');
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getQuizById = async (id: number) => {
    try {
        const response = await note2quizApi.get(`/quizzes/${id}`);
        return response.data.data as Quiz;
    } catch (error) {
        console.error(error);
        throw error;
    }
};