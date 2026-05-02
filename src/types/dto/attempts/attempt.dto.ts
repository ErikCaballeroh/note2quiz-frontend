export interface CreateAttemptRequestDto {
    quizId: number;
    score: number;
    duration: number;
}

export interface AttemptDto {
    quizId: number;
    score: number;
    duration: number;
}
