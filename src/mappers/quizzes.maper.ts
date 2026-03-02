import { QuizData } from "../components/home";
import { Quiz } from "../types/quiz.types";


export class QuizMapper {
    static fromQuizToQuizData(QuizApi: Quiz): QuizData {
        return {
            id: QuizApi.id,
            title: QuizApi.title,
            questions: QuizApi.questions.length,
            date: "Hace 2 dias",
            score: 0,
        }
    }
};