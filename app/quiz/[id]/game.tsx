import {
    AnswerOptions,
    FinishScreen,
    GameHeader,
    GameProgressBar,
    QuestionCard,
} from "@/src/components/game";
import { useGameQuiz } from "@/src/hooks/quiz/useGameQuiz";
import { useQuiz } from "@/src/hooks/quizzes/useQuiz";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";

export default function GameScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();

    // Fetch quiz data from backend
    const { data: quizData, isLoading } = useQuiz(Number(id));

    // Game logic hook
    const {
        currentQuestion,
        selectedAnswer,
        showResult,
        score,
        timeLeft,
        gameFinished,
        progressAnim,
        currentQuestionData,
        totalQuestions,
        handleAnswer,
        handleRestart,
    } = useGameQuiz(quizData);

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center bg-gray-50">
                <ActivityIndicator size="large" color="#7C3AED" />
            </View>
        );
    }

    if (!quizData || !quizData.questions || quizData.questions.length === 0) {
        return (
            <View className="flex-1 items-center justify-center bg-gray-50">
                <Text className="text-gray-500">No se encontraron preguntas</Text>
            </View>
        );
    }

    // Finish screen
    if (gameFinished) {
        return (
            <FinishScreen
                score={score}
                totalQuestions={totalQuestions}
                onGoHome={() => router.push("/(tabs)")}
                onRestart={handleRestart}
            />
        );
    }

    // Game screen
    return (
        <View className="flex-1 bg-white">
            <GameHeader
                timeLeft={timeLeft}
                currentQuestion={currentQuestion + 1}
                totalQuestions={totalQuestions}
                onClose={() => router.push("/(tabs)")}
            />

            <GameProgressBar progress={progressAnim} />

            {currentQuestionData && (
                <>
                    <QuestionCard question={currentQuestionData.question} />

                    <AnswerOptions
                        options={currentQuestionData.options}
                        selectedAnswer={selectedAnswer}
                        showResult={showResult}
                        onSelectAnswer={handleAnswer}
                    />
                </>
            )}
        </View>
    );
}