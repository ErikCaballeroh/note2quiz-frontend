export interface QuizzesResponse {
    ok: boolean;
    data: Quiz[];
}

export interface Quiz {
    id: number;
    title: string;
    sourceText: string;
    questions: Question[];
    createdAt: Date;
    userId: number;
}

export interface Question {
    options: Option[];
    question: string;
}

export interface Option {
    text: string;
    isCorrect: boolean;
}
