import { ArrowLeft } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

import type { EditQuizHeaderProps } from "./types";

export function EditQuizHeader({ onBack }: EditQuizHeaderProps) {
    return (
        <View className="bg-white border-b border-gray-200 px-6 pt-14 pb-3">
            <View className="flex-row items-center gap-4">
                <TouchableOpacity
                    onPress={onBack}
                    className="w-10 h-10 items-center justify-center rounded-xl bg-gray-100 active:bg-gray-200"
                >
                    <ArrowLeft size={24} color="#374151" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-900">
                    Editar Cuestionario
                </Text>
            </View>
        </View>
    );
}
