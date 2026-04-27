import { useQuiz } from "@/src/hooks/quizzes/useQuiz";
import { updateQuiz } from "@/src/services/quizzes.service";
import { QuestionDto } from "@/src/types/dto/quizzes/quiz.dto";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Plus, Save, Trash2 } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function EditScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const { data: quizData, isLoading } = useQuiz(Number(id));

    const [title, setTitle] = useState("");
    const [questions, setQuestions] = useState<QuestionDto[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (quizData) {
            setTitle(quizData.title);
            setQuestions(quizData.questions);
        }
    }, [quizData]);

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center bg-gray-50">
                <ActivityIndicator size="large" color="#7C3AED" />
            </View>
        );
    }

    if (!quizData) {
        return (
            <View className="flex-1 items-center justify-center bg-gray-50">
                <Text className="text-gray-500">No se encontró el cuestionario</Text>
            </View>
        );
    }

    const handleSave = async () => {
        if (!title.trim()) {
            Alert.alert("Error", "El título no puede estar vacío");
            return;
        }
        for (const q of questions) {
            if (!q.question.trim()) {
                Alert.alert("Error", "Todas las preguntas deben tener texto");
                return;
            }
            const hasCorrect = q.options.some(o => o.isCorrect);
            if (!hasCorrect) {
                Alert.alert("Error", "Cada pregunta debe tener al menos una respuesta correcta");
                return;
            }
        }

        setIsSaving(true);
        try {
            await updateQuiz(Number(id), { title, questions });
            Alert.alert("¡Éxito!", "Quiz actualizado correctamente", [
                { text: "OK", onPress: () => router.back() }
            ]);
        } catch (e) {
            Alert.alert("Error", "No se pudo guardar el quiz");
        } finally {
            setIsSaving(false);
        }
    };

    const updateQuestionText = (qIndex: number, text: string) => {
        const updated = [...questions];
        updated[qIndex] = { ...updated[qIndex], question: text };
        setQuestions(updated);
    };

    const updateOptionText = (qIndex: number, oIndex: number, text: string) => {
        const updated = [...questions];
        updated[qIndex].options[oIndex] = { ...updated[qIndex].options[oIndex], text };
        setQuestions(updated);
    };

    const toggleCorrect = (qIndex: number, oIndex: number) => {
        const updated = [...questions];
        updated[qIndex].options = updated[qIndex].options.map((o, i) => ({
            ...o,
            isCorrect: i === oIndex,
        }));
        setQuestions(updated);
    };

    const deleteQuestion = (qIndex: number) => {
        if (questions.length <= 1) {
            Alert.alert("Error", "El quiz debe tener al menos una pregunta");
            return;
        }
        Alert.alert("¿Eliminar pregunta?", "Esta acción no se puede deshacer", [
            { text: "Cancelar", style: "cancel" },
            { text: "Eliminar", style: "destructive", onPress: () => {
                setQuestions(questions.filter((_, i) => i !== qIndex));
            }},
        ]);
    };

    const addQuestion = () => {
        const newQuestion: QuestionDto = {
            question: "",
            options: [
                { text: "", isCorrect: true },
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
            ],
        };
        setQuestions([...questions, newQuestion]);
    };

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
                <Text className="text-lg font-semibold text-gray-800">Editar Quiz</Text>
                <TouchableOpacity
                    onPress={handleSave}
                    disabled={isSaving}
                    className="flex-row items-center gap-1.5 bg-purple-600 px-4 py-2 rounded-xl"
                >
                    {isSaving
                        ? <ActivityIndicator size="small" color="#fff" />
                        : <Save size={16} color="#fff" />
                    }
                    <Text className="text-white font-semibold text-sm">Guardar</Text>
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1" contentContainerClassName="p-4 pb-10">
                {/* Title */}
                <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
                    <Text className="text-sm font-medium text-gray-500 mb-2">Título del Quiz</Text>
                    <TextInput
                        value={title}
                        onChangeText={setTitle}
                        placeholder="Escribe el título..."
                        className="text-gray-900 text-base font-semibold"
                        placeholderTextColor="#9ca3af"
                    />
                </View>

                {/* Questions */}
                <View className="gap-4">
                    {questions.map((q, qIndex) => (
                        <View key={qIndex} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                            {/* Question header */}
                            <View className="flex-row items-center justify-between mb-3">
                                <View className="flex-row items-center gap-2">
                                    <View className="w-7 h-7 rounded-full bg-purple-100 items-center justify-center">
                                        <Text className="text-xs font-bold text-purple-700">{qIndex + 1}</Text>
                                    </View>
                                    <Text className="text-sm font-medium text-gray-500">Pregunta</Text>
                                </View>
                                <TouchableOpacity onPress={() => deleteQuestion(qIndex)}>
                                    <Trash2 size={18} color="#ef4444" />
                                </TouchableOpacity>
                            </View>

                            {/* Question text */}
                            <TextInput
                                value={q.question}
                                onChangeText={(text) => updateQuestionText(qIndex, text)}
                                placeholder="Escribe la pregunta..."
                                multiline
                                className="text-gray-800 font-medium mb-4 bg-gray-50 p-3 rounded-xl"
                                placeholderTextColor="#9ca3af"
                            />

                            {/* Options */}
                            <Text className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
                                Opciones — toca el círculo para marcar la correcta
                            </Text>
                            <View className="gap-2">
                                {q.options.map((option, oIndex) => (
                                    <View
                                        key={oIndex}
                                        className={`flex-row items-center gap-2 px-3 py-2.5 rounded-xl border ${
                                            option.isCorrect
                                                ? "bg-green-50 border-green-200"
                                                : "bg-gray-50 border-gray-100"
                                        }`}
                                    >
                                        <TouchableOpacity
                                            onPress={() => toggleCorrect(qIndex, oIndex)}
                                            className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                                                option.isCorrect
                                                    ? "border-green-500 bg-green-500"
                                                    : "border-gray-300"
                                            }`}
                                        >
                                            {option.isCorrect && (
                                                <View className="w-2 h-2 rounded-full bg-white" />
                                            )}
                                        </TouchableOpacity>
                                        <TextInput
                                            value={option.text}
                                            onChangeText={(text) => updateOptionText(qIndex, oIndex, text)}
                                            placeholder={`Opción ${oIndex + 1}`}
                                            className={`flex-1 text-sm ${option.isCorrect ? "text-green-800" : "text-gray-600"}`}
                                            placeholderTextColor="#9ca3af"
                                        />
                                    </View>
                                ))}
                            </View>
                        </View>
                    ))}
                </View>

                {/* Add question button */}
                <TouchableOpacity
                    onPress={addQuestion}
                    className="flex-row items-center justify-center gap-2 mt-4 py-4 border-2 border-dashed border-purple-300 rounded-2xl"
                >
                    <Plus size={20} color="#7C3AED" />
                    <Text className="text-purple-600 font-semibold">Agregar pregunta</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
