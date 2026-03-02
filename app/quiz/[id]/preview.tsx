import { useQuiz } from "@/src/hooks/quizzes/useQuiz";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, BookOpen, CheckCircle2, Edit, Play, Save, TimerIcon } from "lucide-react-native";
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function QuizPreviewScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    console.log(id);

    const { data: quizData, isLoading } = useQuiz(Number(id));

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


    return (
        <View className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 pt-14 pb-4 bg-white border-b border-gray-200">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 items-center justify-center rounded-xl bg-gray-100"
                >
                    <ArrowLeft size={20} color="#374151" />
                </TouchableOpacity>
                <Text className="text-lg font-semibold text-gray-800">Vista Previa</Text>
                <View className="w-10" />
            </View>

            <ScrollView className="flex-1" contentContainerClassName="p-4 pb-8">
                {/* Quiz Info Card */}
                <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-gray-100">
                    <Text className="text-2xl font-bold text-gray-900 mb-3">{quizData.title}</Text>

                    <View className="flex-row gap-4">
                        <View className="flex-row items-center gap-1.5">
                            <BookOpen size={16} color="#7C3AED" />
                            <Text className="text-sm text-gray-500">{quizData.questions.length} preguntas</Text>
                        </View>
                        <View className="flex-row items-center gap-1.5">
                            <TimerIcon size={16} color="#7C3AED" />
                            <Text className="text-sm text-gray-500">{(quizData.questions.length * 30) / 60} min</Text>
                        </View>
                    </View>
                </View>

                {/* Questions List */}
                <View className="gap-3">
                    {quizData.questions.map((q, index) => (
                        <View key={index} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                            {/* Question header */}
                            <View className="flex-row items-start gap-3 mb-3">
                                <View className="w-7 h-7 rounded-full bg-purple-100 items-center justify-center mt-0.5">
                                    <Text className="text-xs font-bold text-purple-700">{index + 1}</Text>
                                </View>
                                <Text className="flex-1 text-gray-800 font-medium leading-5">{q.question}</Text>
                            </View>

                            {/* Options */}
                            <View className="gap-2 pl-10">
                                {q.options.map((option, optIndex) => (
                                    <View
                                        key={optIndex}
                                        className={`flex-row items-center gap-2 px-3 py-2.5 rounded-xl ${option.isCorrect
                                            ? "bg-green-50 border border-green-200"
                                            : "bg-gray-50 border border-gray-100"
                                            }`}
                                    >
                                        {option.isCorrect ? (
                                            <CheckCircle2 size={16} color="#16A34A" />
                                        ) : (
                                            <View className="w-4 h-4 rounded-full border border-gray-300" />
                                        )}
                                        <Text
                                            className={`text-sm ${option.isCorrect ? "text-green-800 font-medium" : "text-gray-600"
                                                }`}
                                        >
                                            {option.text}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* Bottom Actions */}
            <View className="flex-row gap-2 px-4 py-4 bg-white border-t border-gray-200 pb-8">
                <TouchableOpacity
                    onPress={() => router.push(`/quiz/${id}/edit`)}
                    className="flex-1 flex-row items-center justify-center gap-1.5 border border-gray-300 py-3 rounded-xl"
                >
                    <Edit size={16} color="#374151" />
                    <Text className="text-gray-700 font-semibold text-sm">Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        Alert.alert("Éxito", "Cuestionario guardado", [
                            { text: "OK", onPress: () => router.push("/(tabs)") },
                        ]);
                    }}
                    className="flex-1 flex-row items-center justify-center gap-1.5 border border-gray-300 py-3 rounded-xl"
                >
                    <Save size={16} color="#374151" />
                    <Text className="text-gray-700 font-semibold text-sm">Guardar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => router.push(`/quiz/${id}/game`)}
                    className="flex-1 flex-row items-center justify-center gap-1.5 bg-purple-600 py-3 rounded-xl"
                >
                    <Play size={16} color="#fff" />
                    <Text className="text-white font-semibold text-sm">Jugar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
