import { Quiz } from "@/src/components/saved";
import { getQuizzes } from "@/src/services/quizzes.service";
import { QuizDto } from "@/src/types/dto/quizzes/quiz.dto";
import { useQuery } from "@tanstack/react-query";

const formatRelativeDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();

    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 60) return `Hace ${diffMinutes} min`;
    if (diffHours < 24) return `Hace ${diffHours} h`;

    return `Hace ${diffDays} días`;
};

const mapQuizDtoToSavedQuiz = (quiz: QuizDto): Quiz => {
    return {
        id: quiz.id,
        title: quiz.title,
        questions: quiz.questions.length,
        date: formatRelativeDate(quiz.createdAt),
        score: quiz.highestScore ?? 0,
        category: quiz.category?.name ?? "General",
    };
};

export const useSavedQuizzes = () => {
    return useQuery({
        queryKey: ["quiz", "saved"],
        queryFn: getQuizzes,
        select: (quizzes: QuizDto[]) => quizzes.map(mapQuizDtoToSavedQuiz),
    });
};