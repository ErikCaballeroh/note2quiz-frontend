import { useLocalSearchParams, useRouter } from "expo-router";
import { Check, ChevronDown, X } from "lucide-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import type { EditQuestion } from "@/src/components/edit";
import {
    AddQuestionButton,
    EditQuestionCard,
    EditQuizHeader,
    EditQuizSaveBar,
    EditQuizTitleInput,
} from "@/src/components/edit";

import { useCategories } from "@/src/hooks/categories/useCategories";
import { useQuiz } from "@/src/hooks/quizzes/useQuiz";
import { useUpdateQuiz } from "@/src/hooks/quizzes/useUpdateQuiz";
import type { CategoryDto } from "@/src/types/dto/categories/category.dto";

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
    const questionsRef = useRef<EditQuestion[]>([]);

    const viewportH = useRef(0);
    const scrollOffset = useRef(0);
    const moveRafRef = useRef<number | null>(null);
    const pendingScrollToEnd = useRef(false);

    const [title, setTitle] = useState("");
    const [questions, setQuestions] = useState<EditQuestion[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [isCategorySelectorVisible, setIsCategorySelectorVisible] = useState(false);

    // evitar sobreescribir ediciones locales
    const initialLoaded = useRef(false);

    // Hook para cargar quiz desde backend
    const { data: quizData, isLoading } = useQuiz(Number(id));
    const { data: categories = [] } = useCategories();
    const updateMutation = useUpdateQuiz(Number(id));

    useEffect(() => {
        if (!quizData || initialLoaded.current) return;

        setTitle(quizData.title || "");
        setSelectedCategoryId(quizData.categoryId ?? null);

        const mapped: EditQuestion[] = (quizData.questions || []).map((q, idx) => ({
            id: Date.now() + idx,
            question: q.question,
            options: q.options.map((o) => o.text),
            correct: q.options.findIndex((o) => o.isCorrect) >= 0 ? q.options.findIndex((o) => o.isCorrect) : 0,
        }));

        setQuestions(mapped);
        initialLoaded.current = true;
    }, [quizData]);

    const currentCategoryLabel =
        categories.find((category) => category.id === selectedCategoryId)?.name ??
        quizData?.category?.name ??
        "Sin categoría";

    // Mantener questionsRef sincronizado
    questionsRef.current = questions;

    // Altura del título (primer elemento del scroll)
    const titleHeight = useRef(0);

    /**
     * Calcula la posición Y de un card dentro del scroll content
     * sumando: paddingTop + titleHeight + gap + alturas de cards anteriores + gaps
     */
    const getCardYForList = useCallback((list: EditQuestion[], questionId: number): { y: number; h: number } | null => {
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

    const scrollToCard = useCallback((questionId: number, direction: "up" | "down", listOverride?: EditQuestion[]) => {
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
        const payload = {
            title,
            categoryId: selectedCategoryId ?? undefined,
            questions: questions.map((q) => ({
                question: q.question,
                options: q.options.map((text, i) => ({ text, isCorrect: i === q.correct })),
            })),
        };

        updateMutation.mutate(payload, {
            onSuccess: () => {
                Alert.alert("Éxito", "Cuestionario guardado");
                router.back();
            },
            onError: (err: any) => {
                Alert.alert("Error", err?.message || "Error al guardar");
            },
        });
    };

    const addQuestion = () => {
        const newQuestion: EditQuestion = {
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
            <EditQuizHeader onBack={() => router.back()} />

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
                    <EditQuizTitleInput
                        value={title}
                        onChange={setTitle}
                        onLayout={(e) => {
                            titleHeight.current = e.nativeEvent.layout.height;
                        }}
                    />

                    <View>
                        <Text className="mb-2 text-sm font-semibold text-gray-700">
                            Categoría
                        </Text>
                        <TouchableOpacity
                            onPress={() => setIsCategorySelectorVisible(true)}
                            className="flex-row items-center justify-between rounded-xl border border-gray-300 bg-white px-4 py-3"
                        >
                            <View>
                                <Text className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                    Categoría actual
                                </Text>
                                <Text className="mt-1 text-base font-semibold text-gray-900">
                                    {currentCategoryLabel}
                                </Text>
                            </View>
                            <ChevronDown size={20} color="#6B7280" />
                        </TouchableOpacity>
                    </View>

                    {/* Questions */}
                    {questions.map((q, index) => (
                        <EditQuestionCard
                            key={q.id}
                            question={q}
                            index={index}
                            total={questions.length}
                            onLayout={(e) => {
                                cardHeights.current[q.id] = e.nativeEvent.layout.height;
                            }}
                            onMoveUp={() => moveQuestion(index, "up")}
                            onMoveDown={() => moveQuestion(index, "down")}
                            onDelete={() => deleteQuestion(q.id)}
                            onQuestionChange={(val) =>
                                updateQuestion(q.id, "question", val)
                            }
                            onOptionChange={(optIndex, val) =>
                                updateOption(q.id, optIndex, val)
                            }
                            onCorrectChange={(optIndex) =>
                                updateQuestion(q.id, "correct", optIndex)
                            }
                        />
                    ))}

                    {/* Add Question Button */}
                    <AddQuestionButton onPress={addQuestion} />
                </View>
            </ScrollView>

            <EditQuizSaveBar onSave={handleSave} />

            <Modal
                visible={isCategorySelectorVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setIsCategorySelectorVisible(false)}
            >
                <Pressable
                    className="flex-1 justify-center bg-black/40 px-5"
                    onPress={() => setIsCategorySelectorVisible(false)}
                >
                    <View
                        className="rounded-2xl bg-white p-5"
                        onStartShouldSetResponder={() => true}
                    >
                        <View className="mb-4 flex-row items-center justify-between">
                            <Text className="text-lg font-bold text-gray-900">
                                Cambiar categoría
                            </Text>
                            <TouchableOpacity
                                onPress={() => setIsCategorySelectorVisible(false)}
                                className="h-9 w-9 items-center justify-center rounded-full bg-gray-100"
                            >
                                <X size={18} color="#374151" />
                            </TouchableOpacity>
                        </View>

                        <View className="gap-2">
                            {categories.map((category: CategoryDto) => {
                                const isSelected = category.id === selectedCategoryId;

                                return (
                                    <TouchableOpacity
                                        key={category.id}
                                        onPress={() => {
                                            setSelectedCategoryId(category.id);
                                            setIsCategorySelectorVisible(false);
                                        }}
                                        className={`flex-row items-center justify-between rounded-xl border px-4 py-3 ${isSelected
                                                ? "border-purple-600 bg-purple-50"
                                                : "border-gray-200 bg-gray-50"
                                            }`}
                                    >
                                        <Text
                                            className={`text-base font-semibold ${isSelected ? "text-purple-700" : "text-gray-800"
                                                }`}
                                        >
                                            {category.name}
                                        </Text>
                                        {isSelected ? (
                                            <Check size={18} color="#7C3AED" />
                                        ) : null}
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        {categories.length === 0 ? (
                            <Text className="mt-4 text-sm text-gray-500">
                                No hay categorías disponibles.
                            </Text>
                        ) : null}
                    </View>
                </Pressable>
            </Modal>
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