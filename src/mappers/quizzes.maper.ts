import { QuizData } from "../components/home";
import { QuizDto } from "../types/dto/quizzes/quiz.dto";

export class QuizMapper {
    static fromQuizDtoToQuizData(QuizApi: QuizDto): QuizData {
        return {
            id: QuizApi.id,
            title: QuizApi.title,
            questions: QuizApi.questions.length,
            date: "Hace 2 dias",
            score: 0,
        }
    }
};