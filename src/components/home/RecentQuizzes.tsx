import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import QuizCard from "./QuizCard";
import { RecentQuizzesProps } from "./types";

const RecentQuizzes: React.FC<RecentQuizzesProps> = ({
    quizzes,
    onQuizPress,
    onViewAllPress,
}) => {
    return (
        <View className="mb-6">
            <View className="flex-row items-center justify-between mb-4">
                <Text className="text-xl font-bold text-gray-900">Recientes</Text>
                <TouchableOpacity onPress={onViewAllPress}>
                    <Text className="text-purple-600 font-semibold text-sm">Ver todos</Text>
                </TouchableOpacity>
            </View>

            <View className="gap-3">
                {quizzes.map((quiz) => (
                    <QuizCard
                        key={quiz.id}
                        quiz={quiz}
                        onPress={() => onQuizPress(quiz.id)}
                    />
                ))}
            </View>
        </View>
    );
};

export default RecentQuizzes;
