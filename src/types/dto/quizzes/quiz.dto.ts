export interface QuizDto {
    id: number;
    title: string;
    sourceText: string;
    questions: QuestionDto[];
    createdAt: string;
    userId: number;
    attempts: AttemptDto[];
    highestScore?: number;
}

export interface AttemptDto {
    score: number;
}

export interface QuestionDto {
    options: OptionDto[];
    question: string;
}

export interface OptionDto {
    text: string;
    isCorrect: boolean;
}
