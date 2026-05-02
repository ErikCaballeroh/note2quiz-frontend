import { note2quizApi } from "../api/api";
import { AttemptDto, CreateAttemptRequestDto } from "../types/dto/attempts/attempt.dto";

export const createAttempt = async (data: CreateAttemptRequestDto): Promise<AttemptDto> => {
    return await note2quizApi.post('/attempts/', data);
};
