import { Timer, X } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

interface GameHeaderProps {
    timeLeft: number;
    currentQuestion: number;
    totalQuestions: number;
    onClose: () => void;
}

export const GameHeader = ({
    timeLeft,
    currentQuestion,
    totalQuestions,
    onClose,
}: GameHeaderProps) => {
    return (
        <View className="px-6 py-4 flex-row items-center justify-between border-b border-gray-200">
            <TouchableOpacity
                onPress={onClose}
                className="w-10 h-10 border border-gray-300 rounded-xl items-center justify-center"
                activeOpacity={0.7}
            >
                <X color="#374151" size={24} />
            </TouchableOpacity>

            <View className="flex-row items-center gap-2 border border-gray-300 rounded-xl px-4 py-2">
                <Timer color="#374151" size={20} />
                <Text className="text-gray-900 font-bold">{timeLeft}s</Text>
            </View>

            <View className="border border-gray-300 rounded-xl px-4 py-2">
                <Text className="text-gray-900 font-bold">
                    {currentQuestion}/{totalQuestions}
                </Text>
            </View>
        </View>
    );
};
