import { QuizData } from "../components/home";
import { QuizDto } from "../types/dto/quizzes/quiz.dto";

function formatRelativeDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();

    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 60) return `Hace ${diffMinutes} min`;
    if (diffHours < 24) return `Hace ${diffHours} h`;

    return `Hace ${diffDays} días`;
}

export class QuizMapper {
    static fromQuizDtoToQuizData(QuizApi: QuizDto): QuizData {
        return {
            id: QuizApi.id,
            title: QuizApi.title,
            questions: QuizApi.questions.length,
            date: formatRelativeDate(QuizApi.createdAt),
            score: QuizApi.highestScore,
        }
    }
};