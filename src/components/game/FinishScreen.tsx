import { Trophy } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

interface FinishScreenProps {
    score: number;
    totalQuestions: number;
    onRestart: () => void;
    onGoHome: () => void;
}

export const FinishScreen = ({
    score,
    totalQuestions,
    onRestart,
    onGoHome,
}: FinishScreenProps) => {
    const percentage = Math.round((score / totalQuestions) * 100);

    return (
        <View className="flex-1 bg-gray-50 items-center justify-center px-6">
            <View className="w-full bg-white border border-gray-200 rounded-2xl p-8 items-center">
                {/* Trophy Icon */}
                <View className="w-24 h-24 bg-purple-600 rounded-full items-center justify-center mb-6">
                    <Trophy color="white" size={48} />
                </View>

                <Text className="text-3xl font-bold text-gray-900 mb-2">
                    ¡Felicitaciones!
                </Text>
                <Text className="text-gray-600 mb-8">
                    Has completado el cuestionario
                </Text>

                {/* Score Card */}
                <View className="w-full bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8 items-center">
                    <Text className="text-6xl font-bold text-purple-600 mb-2">
                        {percentage}%
                    </Text>
                    <Text className="text-gray-600">
                        {score} de {totalQuestions} respuestas correctas
                    </Text>
                </View>

                {/* Buttons */}
                <View className="w-full gap-3">
                    <TouchableOpacity
                        onPress={onGoHome}
                        className="w-full bg-purple-600 py-3 rounded-xl items-center"
                        activeOpacity={0.85}
                    >
                        <Text className="text-white font-semibold text-base">
                            Volver al Inicio
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={onRestart}
                        className="w-full bg-white border border-gray-300 py-3 rounded-xl items-center"
                        activeOpacity={0.85}
                    >
                        <Text className="text-gray-700 font-semibold text-base">
                            Jugar de Nuevo
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
