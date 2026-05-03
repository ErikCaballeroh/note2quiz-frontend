import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
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

import { useQuiz } from "@/src/hooks/quizzes/useQuiz";
import { useUpdateQuiz } from "@/src/hooks/quizzes/useUpdateQuiz";

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

    // evitar sobreescribir ediciones locales
    const initialLoaded = useRef(false);

    // Hook para cargar quiz desde backend
    const { data: quizData, isLoading } = useQuiz(Number(id));
    const updateMutation = useUpdateQuiz(Number(id));

    useEffect(() => {
        if (!quizData || initialLoaded.current) return;

        setTitle(quizData.title || "");

        const mapped: EditQuestion[] = (quizData.questions || []).map((q, idx) => ({
            id: Date.now() + idx,
            question: q.question,
            options: q.options.map((o) => o.text),
            correct: q.options.findIndex((o) => o.isCorrect) >= 0 ? q.options.findIndex((o) => o.isCorrect) : 0,
        }));

        setQuestions(mapped);
        initialLoaded.current = true;
    }, [quizData]);

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