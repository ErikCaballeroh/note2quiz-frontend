import { QuestionDto, QuizDto } from "@/src/types/dto/quizzes/quiz.dto";
import { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";

export const useGameQuiz = (quizData: QuizDto | undefined) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(20);
    const [gameFinished, setGameFinished] = useState(false);

    const progressAnim = useRef(new Animated.Value(0)).current;
    const questions = quizData?.questions || [];

    const currentQuestionData = questions[currentQuestion] as QuestionDto | undefined;

    // Timer countdown
    useEffect(() => {
        if (showResult || gameFinished || !quizData) return;

        if (timeLeft === 0) {
            handleAnswer(-1); // Time expired, no answer selected
            return;
        }

        const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
        return () => clearTimeout(timer);
    }, [timeLeft, showResult, gameFinished, quizData]);

    // Reset timer when question changes
    useEffect(() => {
        setTimeLeft(20);
    }, [currentQuestion]);

    // Animate progress bar
    useEffect(() => {
        if (questions.length === 0) return;

        Animated.timing(progressAnim, {
            toValue: ((currentQuestion + 1) / questions.length) * 100,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [currentQuestion, questions.length]);

    const handleAnswer = (index: number) => {
        if (showResult || !currentQuestionData) return;

        setSelectedAnswer(index);
        setShowResult(true);

        // Check if answer is correct
        if (index !== -1 && currentQuestionData.options[index]?.isCorrect) {
            setScore((s) => s + 1);
        }

        setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion((q) => q + 1);
                setSelectedAnswer(null);
                setShowResult(false);
            } else {
                setGameFinished(true);
            }
        }, 2000);
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setScore(0);
        setGameFinished(false);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(20);
        progressAnim.setValue(0);
    };

    return {
        currentQuestion,
        selectedAnswer,
        showResult,
        score,
        timeLeft,
        gameFinished,
        progressAnim,
        currentQuestionData,
        totalQuestions: questions.length,
        handleAnswer,
        handleRestart,
    };
};
