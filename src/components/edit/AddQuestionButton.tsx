import { Plus } from "lucide-react-native";
import { Text, TouchableOpacity } from "react-native";

import type { AddQuestionButtonProps } from "./types";

export function AddQuestionButton({ onPress }: AddQuestionButtonProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="w-full border-2 border-dashed border-gray-300 rounded-xl p-6 items-center justify-center flex-row gap-2 active:border-purple-600 active:bg-purple-50"
        >
            <Plus size={24} color="#6B7280" />
            <Text className="font-semibold text-gray-500">
                Agregar Pregunta
            </Text>
        </TouchableOpacity>
    );
}
