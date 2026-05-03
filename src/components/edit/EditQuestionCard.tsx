import { ChevronDown, ChevronUp, Trash2 } from "lucide-react-native";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeOut, LinearTransition } from "react-native-reanimated";

import type { EditQuestionCardProps } from "./types";

const LAYOUT_TRANSITION = LinearTransition.springify()
    .damping(18)
    .stiffness(200)
    .mass(0.6);

export function EditQuestionCard({
    question,
    index,
    total,
    onMoveUp,
    onMoveDown,
    onDelete,
    onQuestionChange,
    onOptionChange,
    onCorrectChange,
    onLayout,
}: EditQuestionCardProps) {
    const isFirst = index === 0;
    const isLast = index === total - 1;

    return (
        <View onLayout={onLayout}>
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
                            onPress={onMoveUp}
                            disabled={isFirst}
                            className={`w-8 h-8 items-center justify-center rounded-lg ${isFirst ? "opacity-25" : "active:bg-purple-50"}`}
                        >
                            <ChevronUp
                                size={18}
                                color={isFirst ? "#D1D5DB" : "#7C3AED"}
                            />
                        </TouchableOpacity>

                        <View className="w-8 h-8 bg-purple-600 rounded-full items-center justify-center">
                            <Text className="text-white font-bold text-sm">
                                {index + 1}
                            </Text>
                        </View>

                        <TouchableOpacity
                            onPress={onMoveDown}
                            disabled={isLast}
                            className={`w-8 h-8 items-center justify-center rounded-lg ${isLast ? "opacity-25" : "active:bg-purple-50"}`}
                        >
                            <ChevronDown
                                size={18}
                                color={isLast ? "#D1D5DB" : "#7C3AED"}
                            />
                        </TouchableOpacity>
                    </View>

                    <TextInput
                        value={question.question}
                        onChangeText={onQuestionChange}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg font-semibold text-gray-900 focus:border-purple-600"
                        placeholder="Escribe la pregunta"
                        placeholderTextColor="#9CA3AF"
                        multiline
                        numberOfLines={2}
                        textAlignVertical="top"
                    />

                    <TouchableOpacity
                        onPress={onDelete}
                        className="w-10 h-10 items-center justify-center rounded-xl active:bg-red-50"
                    >
                        <Trash2 size={20} color="#EF4444" />
                    </TouchableOpacity>
                </View>

                {/* Options */}
                <View className="ml-11 gap-2">
                    {question.options.map((option, optIndex) => (
                        <View
                            key={optIndex}
                            className="flex-row items-center gap-2"
                        >
                            <TouchableOpacity
                                onPress={() => onCorrectChange(optIndex)}
                                className={`w-6 h-6 rounded-full border-2 items-center justify-center ${optIndex === question.correct
                                    ? "bg-purple-600 border-purple-600"
                                    : "border-gray-300"}`}
                            >
                                {optIndex === question.correct && (
                                    <View className="w-2 h-2 bg-white rounded-full" />
                                )}
                            </TouchableOpacity>

                            <TextInput
                                value={option}
                                onChangeText={(val) => onOptionChange(optIndex, val)}
                                className={`flex-1 px-3 py-2 border rounded-lg text-gray-900 focus:border-purple-600 ${optIndex === question.correct
                                    ? "bg-purple-50 border-purple-600"
                                    : "border-gray-300"}`}
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
    );
}
