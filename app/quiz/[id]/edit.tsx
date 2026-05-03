import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, ChevronDown, ChevronUp, Plus, Save, Trash2 } from "lucide-react-native";
import { useCallback, useRef, useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Animated, { FadeIn, FadeOut, LinearTransition } from "react-native-reanimated";

interface Question {
    id: number;
    question: string;
    options: string[];
    correct: number;
}

const LAYOUT_TRANSITION = LinearTransition.springify()
    .damping(18)
    .stiffness(200)
    .mass(0.6);

const SAVE_BTN_HEIGHT = 76;
const SCROLL_PADDING = 24; // paddingTop del scrollContent
const GAP = 16;            // gap entre items

export default function EditQuizScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const scrollRef = useRef<ScrollView>(null);

    // Altura de cada card por questionId
    const cardHeights = useRef<Record<number, number>>({});
    // Orden actual de ids para calcular posición Y acumulada
    const questionsRef = useRef<Question[]>([]);

    const viewportH = useRef(0);
    const scrollOffset = useRef(0);
    const moveRafRef = useRef<number | null>(null);
    const pendingScrollToEnd = useRef(false);

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

    // Mantener questionsRef sincronizado
    questionsRef.current = questions;

    // Altura del título (primer elemento del scroll)
    const titleHeight = useRef(0);

    /**
     * Calcula la posición Y de un card dentro del scroll content
     * sumando: paddingTop + titleHeight + gap + alturas de cards anteriores + gaps
     */
    const getCardYForList = useCallback((list: Question[], questionId: number): { y: number; h: number } | null => {
        const idx = list.findIndex((q) => q.id === questionId);
        if (idx === -1) return null;

        // paddingTop del contenedor + altura del title input + gap
        let y = SCROLL_PADDING + titleHeight.current + GAP;

        for (let i = 0; i < idx; i++) {
            const h = cardHeights.current[list[i].id];
            if (h === undefined) return null; // aún no se midió
            y += h + GAP;
        }

        const h = cardHeights.current[questionId];
        if (h === undefined) return null;

        return { y, h };
    }, []);

    const scrollToCard = useCallback((questionId: number, direction: "up" | "down", listOverride?: Question[]) => {
        const list = listOverride ?? questionsRef.current;
        const layout = getCardYForList(list, questionId);
        if (!layout || !scrollRef.current) return false;

        const { y, h } = layout;
        const usableVp = viewportH.current - SAVE_BTN_HEIGHT;
        const top = scrollOffset.current;
        const bottom = top + usableVp;

        const alreadyVisible = y >= top && y + h <= bottom;
        if (alreadyVisible) return false;

        let targetOffset: number;
        if (direction === "up") {
            targetOffset = y - 8;
        } else {
            targetOffset = y + h - usableVp + 8;
        }

        scrollRef.current.scrollTo({
            y: Math.max(0, targetOffset),
            animated: true,
        });
        return true;
    }, [getCardYForList]);

    const moveQuestion = useCallback(
        (index: number, direction: "up" | "down") => {
            const newIndex = direction === "up" ? index - 1 : index + 1;
            if (newIndex < 0 || newIndex >= questions.length) return;

            const questionId = questions[index].id;
            const next = [...questions];
            [next[index], next[newIndex]] = [next[newIndex], next[index]];

            if (moveRafRef.current !== null) {
                cancelAnimationFrame(moveRafRef.current);
                moveRafRef.current = null;
            }

            const didScroll = scrollToCard(questionId, direction, next);

            if (didScroll) {
                moveRafRef.current = requestAnimationFrame(() => {
                    setQuestions(next);
                    moveRafRef.current = null;
                });
            } else {
                setQuestions(next);
            }
        },
        [questions, scrollToCard]
    );

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
        pendingScrollToEnd.current = true;
        setQuestions((prev) => [...prev, newQuestion]);
    };

    const deleteQuestion = (questionId: number) => {
        setQuestions((prev) => prev.filter((q) => q.id !== questionId));
    };

    const updateQuestion = (questionId: number, field: string, value: any) => {
        setQuestions((prev) =>
            prev.map((q) => (q.id === questionId ? { ...q, [field]: value } : q))
        );
    };

    const updateOption = (questionId: number, optionIndex: number, value: string) => {
        setQuestions((prev) =>
            prev.map((q) => {
                if (q.id !== questionId) return q;
                const newOptions = [...q.options];
                newOptions[optionIndex] = value;
                return { ...q, options: newOptions };
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
            <View className="bg-white border-b border-gray-200 px-6 pt-14 pb-3">
                <View className="flex-row items-center gap-4">
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
            </View>

            <ScrollView
                ref={scrollRef}
                className="flex-1"
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                onContentSizeChange={() => {
                    if (!pendingScrollToEnd.current || !scrollRef.current) return;
                    pendingScrollToEnd.current = false;
                    scrollRef.current.scrollToEnd({ animated: true });
                }}
                onLayout={(e) => {
                    viewportH.current = e.nativeEvent.layout.height;
                }}
                onScroll={(e) => {
                    scrollOffset.current = e.nativeEvent.contentOffset.y;
                }}
                scrollEventThrottle={16}
            >
                <View style={s.scrollContent}>
                    {/* Title Input */}
                    <View
                        onLayout={(e) => {
                            titleHeight.current = e.nativeEvent.layout.height;
                        }}
                    >
                        <TextInput
                            value={title}
                            onChangeText={setTitle}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-lg font-semibold text-gray-900 bg-white focus:border-purple-600"
                            placeholder="Título del cuestionario"
                            placeholderTextColor="#9CA3AF"
                        />
                    </View>

                    {/* Questions */}
                    {questions.map((q, index) => (
                        // View nativo wrapper — registra la altura real del card
                        <View
                            key={q.id}
                            onLayout={(e) => {
                                cardHeights.current[q.id] = e.nativeEvent.layout.height;
                            }}
                        >
                            <Animated.View
                                layout={LAYOUT_TRANSITION}
                                entering={FadeIn.duration(200)}
                                exiting={FadeOut.duration(150)}
                                className="bg-white border border-gray-200 rounded-xl p-5"
                            >
                                {/* Question Header */}
                                <View className="flex-row items-start gap-3 mb-4">
                                    <View className="items-center gap-1">
                                        <TouchableOpacity
                                            onPress={() => moveQuestion(index, "up")}
                                            disabled={index === 0}
                                            className={`w-8 h-8 items-center justify-center rounded-lg ${index === 0 ? "opacity-25" : "active:bg-purple-50"
                                                }`}
                                        >
                                            <ChevronUp
                                                size={18}
                                                color={index === 0 ? "#D1D5DB" : "#7C3AED"}
                                            />
                                        </TouchableOpacity>

                                        <View className="w-8 h-8 bg-purple-600 rounded-full items-center justify-center">
                                            <Text className="text-white font-bold text-sm">
                                                {index + 1}
                                            </Text>
                                        </View>

                                        <TouchableOpacity
                                            onPress={() => moveQuestion(index, "down")}
                                            disabled={index === questions.length - 1}
                                            className={`w-8 h-8 items-center justify-center rounded-lg ${index === questions.length - 1
                                                ? "opacity-25"
                                                : "active:bg-purple-50"
                                                }`}
                                        >
                                            <ChevronDown
                                                size={18}
                                                color={
                                                    index === questions.length - 1
                                                        ? "#D1D5DB"
                                                        : "#7C3AED"
                                                }
                                            />
                                        </TouchableOpacity>
                                    </View>

                                    <TextInput
                                        value={q.question}
                                        onChangeText={(val) =>
                                            updateQuestion(q.id, "question", val)
                                        }
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
                                        <View
                                            key={optIndex}
                                            className="flex-row items-center gap-2"
                                        >
                                            <TouchableOpacity
                                                onPress={() =>
                                                    updateQuestion(q.id, "correct", optIndex)
                                                }
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
                                                onChangeText={(val) =>
                                                    updateOption(q.id, optIndex, val)
                                                }
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
                            </Animated.View>
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

const s = StyleSheet.create({
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 120,
        gap: 16,
    },
});