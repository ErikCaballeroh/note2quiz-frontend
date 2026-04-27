import { note2quizApi } from "../api/api";

export interface CreateAttemptDto {
    quizId: number;
    score: number;
    duration: number;
    answers: { questionIndex: number; selectedOption: number; isCorrect: boolean }[];
}

export const createAttempt = async (data: CreateAttemptDto) => {
    return await note2quizApi.post('/attempts', data);
};