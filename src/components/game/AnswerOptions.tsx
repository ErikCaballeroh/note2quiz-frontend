import { OptionDto } from "@/src/types/dto/quizzes/quiz.dto";
import { Text, TouchableOpacity, View } from "react-native";

const OPTION_COLORS = [
    "bg-red-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-green-500",
];

interface AnswerOptionsProps {
    options: OptionDto[];
    selectedAnswer: number | null;
    showResult: boolean;
    onSelectAnswer: (index: number) => void;
}

export const AnswerOptions = ({
    options,
    selectedAnswer,
    showResult,
    onSelectAnswer,
}: AnswerOptionsProps) => {
    const correctIndex = options.findIndex((opt) => opt.isCorrect);

    return (
        <View className="flex-1 px-6 pb-6 pt-4 flex-row flex-wrap gap-4 content-start">
            {options.map((option, index) => {
                const isCorrect = index === correctIndex;
                const isSelected = selectedAnswer === index;

                let extraStyle: object = {};
                if (showResult) {
                    if (isCorrect) {
                        extraStyle = { borderWidth: 3, borderColor: "#7c3aed" };
                    } else if (isSelected) {
                        extraStyle = { opacity: 0.5 };
                    } else {
                        extraStyle = { opacity: 0.75 };
                    }
                }

                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => !showResult && onSelectAnswer(index)}
                        disabled={showResult}
                        activeOpacity={0.85}
                        className={`${OPTION_COLORS[index]} rounded-2xl p-6 items-center justify-center`}
                        style={[{ width: "47%", minHeight: 100 }, extraStyle]}
                    >
                        <Text className="text-white font-bold text-lg text-center">
                            {option.text}
                        </Text>

                        {/* Correct indicator */}
                        {showResult && isCorrect && (
                            <View className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full items-center justify-center">
                                <Text className="text-lg">✓</Text>
                            </View>
                        )}

                        {/* Wrong indicator */}
                        {showResult && isSelected && !isCorrect && (
                            <View className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full items-center justify-center">
                                <Text className="text-lg">✗</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};
