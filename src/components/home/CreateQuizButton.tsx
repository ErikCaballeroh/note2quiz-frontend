import { Camera, Plus } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { CreateQuizButtonProps } from "./types";

const CreateQuizButton: React.FC<CreateQuizButtonProps> = ({ onPress }) => {
    return (
        <TouchableOpacity
            className="w-full bg-purple-600 rounded-xl p-6 mb-6 flex-row items-center justify-between"
            onPress={onPress}
            activeOpacity={0.85}
        >
            <View className="flex-row items-center gap-4">
                <View className="w-12 h-12 bg-white rounded-xl items-center justify-center">
                    <Camera color="#9333ea" size={24} />
                </View>
                <View>
                    <Text className="font-bold text-white text-lg">Crear Cuestionario</Text>
                    <Text className="text-purple-100 text-sm mt-0.5">Captura tus apuntes</Text>
                </View>
            </View>
            <Plus color="#ffffff" size={24} />
        </TouchableOpacity>
    );
};

export default CreateQuizButton;
