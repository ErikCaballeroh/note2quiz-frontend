import { Save } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

import type { EditQuizSaveBarProps } from "./types";

export function EditQuizSaveBar({ onSave }: EditQuizSaveBarProps) {
    return (
        <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
            <TouchableOpacity
                onPress={onSave}
                className="w-full bg-purple-600 py-3 rounded-xl items-center justify-center flex-row gap-2 active:bg-purple-700"
            >
                <Save size={20} color="#ffffff" />
                <Text className="text-white font-semibold text-base">
                    Guardar Cambios
                </Text>
            </TouchableOpacity>
        </View>
    );
}
