import { useRouter } from "expo-router";
import { BookOpen, Clock, Edit, Play, Trash2 } from "lucide-react-native";
import { Alert, Text, TouchableOpacity, View } from "react-native";

export interface Quiz {
    id: number;
    title: string;
    questions: number;
    date: string;
    score: number;
    category: string;
}

interface QuizCardProps {
    quiz: Quiz;
}

export const QuizCard = ({ quiz }: QuizCardProps) => {
    const router = useRouter();

    const handleDelete = () => {
        Alert.alert("Eliminar cuestionario", "¿Eliminar este cuestionario?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Eliminar",
                style: "destructive",
                onPress: () => Alert.alert("Cuestionario eliminado"),
            },
        ]);
    };

    return (
        <View className="bg-white border border-gray-200 rounded-xl p-4">
            {/* Card Top */}
            <View className="flex-row items-start justify-between mb-3">
                <View className="flex-1 mr-3">
                    <View className="flex-row items-center flex-wrap gap-2 mb-1">
                        <Text className="font-semibold text-gray-900">
                            {quiz.title}
                        </Text>
                        <View className="px-2 py-0.5 bg-purple-100 rounded-full">
                            <Text className="text-xs font-medium text-purple-700">
                                {quiz.category}
                            </Text>
                        </View>
                    </View>
                    <View className="flex-row items-center gap-3">
                        <View className="flex-row items-center gap-1">
                            <BookOpen size={14} color="#6B7280" />
                            <Text className="text-sm text-gray-600">
                                {quiz.questions} preguntas
                            </Text>
                        </View>
                        <View className="flex-row items-center gap-1">
                            <Clock size={14} color="#6B7280" />
                            <Text className="text-sm text-gray-600">{quiz.date}</Text>
                        </View>
                    </View>
                </View>
                <View className="bg-purple-100 px-3 py-1 rounded-full">
                    <Text className="text-sm font-semibold text-purple-700">
                        {quiz.score}%
                    </Text>
                </View>
            </View>

            {/* Actions */}
            <View className="flex-row gap-2">
                <TouchableOpacity
                    onPress={() => router.push({
                        pathname: "/quiz/[id]/game",
                        params: { id: quiz.id },
                    })}
                    className="flex-1 flex-row items-center justify-center gap-2 bg-purple-600 rounded-xl py-2.5"
                >
                    <Play size={16} color="#fff" />
                    <Text className="text-white font-semibold text-sm">Jugar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => router.push({
                        pathname: "/quiz/[id]/edit",
                        params: { id: quiz.id },
                    })}
                    className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl items-center justify-center"
                >
                    <Edit size={16} color="#374151" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleDelete}
                    className="px-4 py-2.5 bg-red-50 border border-red-200 rounded-xl items-center justify-center"
                >
                    <Trash2 size={16} color="#DC2626" />
                </TouchableOpacity>
            </View>
        </View>
    );
};
