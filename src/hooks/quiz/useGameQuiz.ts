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
    const [gameDuration, setGameDuration] = useState(0);

    const progressAnim = useRef(new Animated.Value(0)).current;
    const gameStartRef = useRef(Date.now());
    const questions = quizData?.questions || [];

    const currentQuestionData = questions[currentQuestion] as QuestionDto | undefined;

    useEffect(() => {
        if (!quizData) return;

        gameStartRef.current = Date.now();
        setGameDuration(0);
    }, [quizData?.id]);

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
                setGameDuration(Math.max(1, Math.ceil((Date.now() - gameStartRef.current) / 1000)));
                setGameFinished(true);
            }
        }, 2000);
    };

    const handleRestart = () => {
        gameStartRef.current = Date.now();
        setCurrentQuestion(0);
        setScore(0);
        setGameFinished(false);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(20);
        setGameDuration(0);
        progressAnim.setValue(0);
    };

    return {
        currentQuestion,
        selectedAnswer,
        showResult,
        score,
        timeLeft,
        gameFinished,
        gameDuration,
        progressAnim,
        currentQuestionData,
        totalQuestions: questions.length,
        handleAnswer,
        handleRestart,
    };
};
