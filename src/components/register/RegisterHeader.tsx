import { BookOpen } from "lucide-react-native";
import { Text, View } from "react-native";

export const RegisterHeader = () => {
    return (
        <View className="mb-8 items-center">
            <View className="mb-4 h-16 w-16 items-center justify-center rounded-2xl bg-purple-600">
                <BookOpen size={32} color="white" />
            </View>
            <Text className="mb-2 text-3xl font-bold text-gray-900">Note2Quiz</Text>
            <Text className="text-gray-600">Crea tu cuenta</Text>
        </View>
    );
};
