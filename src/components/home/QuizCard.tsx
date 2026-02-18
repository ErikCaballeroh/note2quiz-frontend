import { BookOpen, Clock } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { QuizCardProps } from "./types";

const QuizCard: React.FC<QuizCardProps> = ({ quiz, onPress }) => {
    return (
        <TouchableOpacity
            className="bg-white rounded-xl p-4 border border-gray-200"
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View className="flex-row items-start justify-between">
                <View className="flex-1 mr-3">
                    <Text className="font-semibold text-gray-900 mb-1">{quiz.title}</Text>
                    <View className="flex-row items-center gap-4">
                        <View className="flex-row items-center gap-1">
                            <BookOpen color="#6b7280" size={14} />
                            <Text className="text-sm text-gray-600">{quiz.questions} preguntas</Text>
                        </View>
                        <View className="flex-row items-center gap-1">
                            <Clock color="#6b7280" size={14} />
                            <Text className="text-sm text-gray-600">{quiz.date}</Text>
                        </View>
                    </View>
                </View>
                <View className="bg-purple-100 px-3 py-1 rounded-full">
                    <Text className="text-purple-700 text-sm font-semibold">{quiz.score}%</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default QuizCard;
