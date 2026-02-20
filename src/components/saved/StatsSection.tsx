import { BookOpen, Clock, Trophy } from "lucide-react-native";
import { Text, View } from "react-native";

interface StatsSectionProps {
    totalQuizzes: number;
    averageScore: string;
    timeThisWeek: string;
}

export const StatsSection = ({
    totalQuizzes,
    averageScore,
    timeThisWeek,
}: StatsSectionProps) => {
    return (
        <View className="flex-row gap-3 px-4 mb-5">
            <View className="flex-1 bg-white border border-gray-200 rounded-xl p-4 items-center">
                <BookOpen size={24} color="#7C3AED" />
                <Text className="text-2xl font-bold text-gray-900 mt-1">
                    {totalQuizzes}
                </Text>
                <Text className="text-xs text-gray-600">Total</Text>
            </View>
            <View className="flex-1 bg-white border border-gray-200 rounded-xl p-4 items-center">
                <Trophy size={24} color="#7C3AED" />
                <Text className="text-2xl font-bold text-gray-900 mt-1">
                    {averageScore}
                </Text>
                <Text className="text-xs text-gray-600">Promedio</Text>
            </View>
            <View className="flex-1 bg-white border border-gray-200 rounded-xl p-4 items-center">
                <Clock size={24} color="#7C3AED" />
                <Text className="text-2xl font-bold text-gray-900 mt-1">
                    {timeThisWeek}
                </Text>
                <Text className="text-xs text-gray-600">Esta semana</Text>
            </View>
        </View>
    );
};
