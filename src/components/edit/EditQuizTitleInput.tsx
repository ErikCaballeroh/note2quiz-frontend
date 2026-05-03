import { TextInput, View } from "react-native";

import type { EditQuizTitleInputProps } from "./types";

export function EditQuizTitleInput({
    value,
    onChange,
    onLayout,
}: EditQuizTitleInputProps) {
    return (
        <View onLayout={onLayout}>
            <TextInput
                value={value}
                onChangeText={onChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-lg font-semibold text-gray-900 bg-white focus:border-purple-600"
                placeholder="Título del cuestionario"
                placeholderTextColor="#9CA3AF"
            />
        </View>
    );
}
