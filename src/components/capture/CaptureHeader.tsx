import { ArrowLeft } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

interface CaptureHeaderProps {
    imageCount: number;
    onBack: () => void;
}

export const CaptureHeader = ({ imageCount, onBack }: CaptureHeaderProps) => {
    return (
        <View className="bg-white border-b border-gray-200 px-6 py-4">
            <View className="flex-row items-center justify-between">
                <TouchableOpacity
                    onPress={onBack}
                    className="w-10 h-10 items-center justify-center rounded-xl active:bg-gray-100"
                >
                    <ArrowLeft size={24} color="#374151" />
                </TouchableOpacity>

                <Text className="text-xl font-bold text-gray-900">
                    Capturar Apuntes
                </Text>

                {imageCount > 0 ? (
                    <View className="w-10 h-10 items-center justify-center bg-purple-100 rounded-xl">
                        <Text className="text-purple-700 font-bold text-sm">
                            {imageCount}
                        </Text>
                    </View>
                ) : (
                    <View className="w-10" />
                )}
            </View>
        </View>
    );
}