import { useQuiz } from "@/src/hooks/quizzes/useQuiz";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Clock } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from "react-native";

export default function GameScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const { data: quizData, isLoading } = useQuiz(Number(id));

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [answers, setAnswers] = useState<{ questionIndex: number; selectedOption: number; isCorrect: boolean }[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [finalScore, setFinalScore] = useState(0);
    const [finalCorrect, setFinalCorrect] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, []);

    const formatTime = (s: number) =>
        `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

    const handleSelect = (optIndex: number) => {
        if (selectedOption !== null) return;
        setSelectedOption(optIndex);
    };

   const handleNext = () => {
    if (!quizData) return;
    if (selectedOption === null) return;

    const questions = quizData.questions;
    const currentQuestion = questions[currentIndex];
    const isCorrect = currentQuestion.options[selectedOption].isCorrect;
    const newAnswers = [...answers, { questionIndex: currentIndex, selectedOption, isCorrect }];
    setAnswers(newAnswers);

    if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1);
        setSelectedOption(null);
    } else {
        if (timerRef.current) clearInterval(timerRef.current);
        const correct = newAnswers.filter(a => a.isCorrect).length;
        const score = Math.round((correct / questions.length) * 100);
        setFinalScore(score);
        setFinalCorrect(correct);
        setShowResult(true);
    }
};

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center bg-gray-50">
                <ActivityIndicator size="large" color="#7C3AED" />
            </View>
        );
    }

    if (!quizData || !quizData.questions) {
        return (
            <View className="flex-1 items-center justify-center bg-gray-50">
                <Text className="text-gray-500">No se encontró el cuestionario</Text>
            </View>
        );
    }

    const questions = quizData.questions;
    const currentQuestion = questions[currentIndex];
    const progress = (currentIndex / questions.length) * 100;

    return (
        <View className="flex-1 bg-gray-50">
            {showResult ? (
                <View className="flex-1 items-center justify-center p-6">
                    <View className="bg-white rounded-2xl p-8 w-full items-center shadow-sm border border-gray-100">
                        <Text className="text-5xl mb-2">🎉</Text>
                        <Text className="text-2xl font-bold text-gray-900 mb-1">¡Quiz completado!</Text>
                        <Text className="text-gray-500 mb-6">Tiempo: {formatTime(seconds)}</Text>
                        <View className="w-28 h-28 rounded-full bg-purple-100 items-center justify-center mb-6">
                            <Text className="text-4xl font-bold text-purple-700">{finalScore}%</Text>
                        </View>
                        <Text className="text-gray-600 mb-8">
                            {finalCorrect} de {questions.length} preguntas correctas
                        </Text>
                        <TouchableOpacity
                            onPress={() => router.back()}
                            className="bg-purple-600 py-3 px-8 rounded-xl w-full items-center"
                        >
                            <Text className="text-white font-semibold text-base">Volver</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <>
                    <View className="px-4 pt-14 pb-4 bg-white border-b border-gray-200">
                        <View className="flex-row items-center justify-between mb-3">
                            <TouchableOpacity
                                onPress={() => Alert.alert("¿Salir?", "Perderás tu progreso", [
                                    { text: "Cancelar", style: "cancel" },
                                    { text: "Salir", style: "destructive", onPress: () => router.back() }
                                ])}
                                className="w-10 h-10 items-center justify-center rounded-xl bg-gray-100"
                            >
                                <ArrowLeft size={20} color="#374151" />
                            </TouchableOpacity>
                            <Text className="text-sm font-medium text-gray-500">{currentIndex + 1} / {questions.length}</Text>
                            <View className="flex-row items-center gap-1.5 bg-purple-50 px-3 py-1.5 rounded-full">
                                <Clock size={14} color="#7C3AED" />
                                <Text className="text-purple-700 text-sm font-medium">{formatTime(seconds)}</Text>
                            </View>
                        </View>
                        <View className="h-2 bg-gray-100 rounded-full">
                            <View className="h-2 bg-purple-600 rounded-full" style={{ width: `${progress}%` }} />
                        </View>
                    </View>

                    <View className="flex-1 p-4">
                        <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-gray-100">
                            <View className="w-8 h-8 rounded-full bg-purple-100 items-center justify-center mb-3">
                                <Text className="text-sm font-bold text-purple-700">{currentIndex + 1}</Text>
                            </View>
                            <Text className="text-lg font-semibold text-gray-900 leading-6">{currentQuestion.question}</Text>
                        </View>

                        <View className="gap-3">
                            {currentQuestion.options.map((option, optIndex) => {
                                let optionStyle = "bg-white border border-gray-200";
                                if (selectedOption !== null) {
                                    if (option.isCorrect) optionStyle = "bg-green-50 border-2 border-green-500";
                                    else if (selectedOption === optIndex) optionStyle = "bg-red-50 border-2 border-red-400";
                                } else if (selectedOption === optIndex) {
                                    optionStyle = "bg-purple-50 border-2 border-purple-500";
                                }

                                return (
                                    <TouchableOpacity
                                        key={optIndex}
                                        onPress={() => handleSelect(optIndex)}
                                        className={`p-4 rounded-xl ${optionStyle}`}
                                        activeOpacity={0.7}
                                    >
                                        <Text className="text-gray-800 font-medium">{option.text}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>

                    <View className="px-4 py-4 bg-white border-t border-gray-200 pb-8">
                        <TouchableOpacity
                            onPress={handleNext}
                            disabled={selectedOption === null}
                            className={`py-4 rounded-xl items-center ${selectedOption !== null ? "bg-purple-600" : "bg-gray-200"}`}
                        >
                            <Text className={`font-semibold text-base ${selectedOption !== null ? "text-white" : "text-gray-400"}`}>
                                {currentIndex + 1 === questions.length ? "Finalizar" : "Siguiente"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
}
