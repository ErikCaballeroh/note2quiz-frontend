import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, GripVertical, Plus, Save, Trash2 } from "lucide-react-native";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

interface Question {
    id: number;
    question: string;
    options: string[];
    correct: number;
}

export default function EditQuizScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();

    const [title, setTitle] = useState("Historia del Arte");
    const [questions, setQuestions] = useState<Question[]>([
        {
            id: 1,
            question: "¿En qué siglo surgió el movimiento del Renacimiento?",
            options: ["Siglo XII", "Siglo XIV", "Siglo XVI", "Siglo XVIII"],
            correct: 1,
        },
        {
            id: 2,
            question: "¿Quién pintó 'La Última Cena'?",
            options: ["Miguel Ángel", "Leonardo da Vinci", "Rafael", "Donatello"],
            correct: 1,
        },
    ]);

    const handleSave = () => {
        Alert.alert("Éxito", "Cuestionario guardado");
        router.back();
    };

    const addQuestion = () => {
        const newQuestion: Question = {
            id: Date.now(),
            question: "Nueva pregunta",
            options: ["Opción 1", "Opción 2", "Opción 3", "Opción 4"],
            correct: 0,
        };
        setQuestions([...questions, newQuestion]);
    };

    const deleteQuestion = (questionId: number) => {
        setQuestions(questions.filter((q) => q.id !== questionId));
    };

    const updateQuestion = (questionId: number, field: string, value: any) => {
        setQuestions(
            questions.map((q) =>
                q.id === questionId ? { ...q, [field]: value } : q
            )
        );
    };

    const updateOption = (questionId: number, optionIndex: number, value: string) => {
        setQuestions(
            questions.map((q) => {
                if (q.id === questionId) {
                    const newOptions = [...q.options];
                    newOptions[optionIndex] = value;
                    return { ...q, options: newOptions };
                }
                return q;
            })
        );
    };

    return (
        <KeyboardAvoidingView
            className="flex-1 bg-gray-50"
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
            {/* Header */}
            <View className="bg-white border-b border-gray-200 px-6 pt-14 pb-4">
                <View className="flex-row items-center justify-between mb-4">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-10 h-10 items-center justify-center rounded-xl bg-gray-100 active:bg-gray-200"
                    >
                        <ArrowLeft size={24} color="#374151" />
                    </TouchableOpacity>

                    <Text className="text-xl font-bold text-gray-900">
                        Editar Cuestionario
                    </Text>
                </View>

                {/* Title Input */}
                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-lg font-semibold text-gray-900 focus:border-purple-600"
                    placeholder="Título del cuestionario"
                    placeholderTextColor="#9CA3AF"
                />
            </View>

            {/* Questions List */}
            <ScrollView
                className="flex-1 px-6 py-6"
                contentContainerStyle={{ paddingBottom: 100 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View className="gap-4">
                    {questions.map((q, index) => (
                        <View
                            key={q.id}
                            className="bg-white border border-gray-200 rounded-xl p-5"
                        >
                            {/* Question Header */}
                            <View className="flex-row items-start gap-3 mb-4">
                                <View className="flex-row items-center gap-2">
                                    <GripVertical size={20} color="#9CA3AF" />
                                    <View className="w-8 h-8 bg-purple-600 rounded-full items-center justify-center">
                                        <Text className="text-white font-bold text-sm">
                                            {index + 1}
                                        </Text>
                                    </View>
                                </View>

                                <TextInput
                                    value={q.question}
                                    onChangeText={(val) => updateQuestion(q.id, "question", val)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg font-semibold text-gray-900 focus:border-purple-600"
                                    placeholder="Escribe la pregunta"
                                    placeholderTextColor="#9CA3AF"
                                    multiline
                                    numberOfLines={2}
                                    textAlignVertical="top"
                                />

                                <TouchableOpacity
                                    onPress={() => deleteQuestion(q.id)}
                                    className="w-10 h-10 items-center justify-center rounded-xl active:bg-red-50"
                                >
                                    <Trash2 size={20} color="#EF4444" />
                                </TouchableOpacity>
                            </View>

                            {/* Options */}
                            <View className="ml-11 gap-2">
                                {q.options.map((option, optIndex) => (
                                    <View key={optIndex} className="flex-row items-center gap-2">
                                        <TouchableOpacity
                                            onPress={() => updateQuestion(q.id, "correct", optIndex)}
                                            className={`w-6 h-6 rounded-full border-2 items-center justify-center ${optIndex === q.correct
                                                ? "bg-purple-600 border-purple-600"
                                                : "border-gray-300"
                                                }`}
                                        >
                                            {optIndex === q.correct && (
                                                <View className="w-2 h-2 bg-white rounded-full" />
                                            )}
                                        </TouchableOpacity>

                                        <TextInput
                                            value={option}
                                            onChangeText={(val) => updateOption(q.id, optIndex, val)}
                                            className={`flex-1 px-3 py-2 border rounded-lg text-gray-900 focus:border-purple-600 ${optIndex === q.correct
                                                ? "bg-purple-50 border-purple-600"
                                                : "border-gray-300"
                                                }`}
                                            placeholder={`Opción ${optIndex + 1}`}
                                            placeholderTextColor="#9CA3AF"
                                        />
                                    </View>
                                ))}

                                <Text className="text-xs text-gray-500 mt-2">
                                    Toca el círculo para marcar la respuesta correcta
                                </Text>
                            </View>
                        </View>
                    ))}

                    {/* Add Question Button */}
                    <TouchableOpacity
                        onPress={addQuestion}
                        className="w-full border-2 border-dashed border-gray-300 rounded-xl p-6 items-center justify-center flex-row gap-2 active:border-purple-600 active:bg-purple-50"
                    >
                        <Plus size={24} color="#6B7280" />
                        <Text className="font-semibold text-gray-500">
                            Agregar Pregunta
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Bottom Action */}
            <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
                <TouchableOpacity
                    onPress={handleSave}
                    className="w-full bg-purple-600 py-3 rounded-xl items-center justify-center flex-row gap-2 active:bg-purple-700"
                >
                    <Save size={20} color="#ffffff" />
                    <Text className="text-white font-semibold text-base">
                        Guardar Cambios
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}